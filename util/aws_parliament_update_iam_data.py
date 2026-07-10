#!/usr/bin/env python3

from os import listdir
from os.path import isfile, join
import re
import json
import requests
from pathlib import Path

from bs4 import BeautifulSoup

# Code for get_links_from_base_actions_resources_conditions_page and update_html_docs_directory borrowed from https://github.com/salesforce/policy_sentry/blob/1126f174f49050b95bddf7549aedaf11fa51a50b/policy_sentry/scraping/awsdocs.py#L31
BASE_DOCUMENTATION_URL = "https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html"

DEFAULT_REQUESTS_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
}

def get_links_from_base_actions_resources_conditions_page():
    """Gets the links from the actions, resources, and conditions keys page, and returns their filenames."""
    html = requests.get(BASE_DOCUMENTATION_URL, headers=DEFAULT_REQUESTS_HEADERS)
    soup = BeautifulSoup(html.content, "html.parser")
    html_filenames = []
    try:
        for i in soup.find("div", {"class": "highlights"}).findAll("a"):
            html_filenames.append(i["href"])
    except:
        raise Exception("Failed to parse base ARC page")
    return html_filenames


def update_html_docs_directory(html_docs_destination):
    """
    Updates the HTML docs from remote location to either (1) local directory
    (i.e., this repository, or (2) the config directory
    :return:
    """
    link_url_prefix = (
        "https://docs.aws.amazon.com/service-authorization/latest/reference/"
    )
    initial_html_filenames_list = (
        get_links_from_base_actions_resources_conditions_page()
    )
    # Remove the relative path so we can download it
    html_filenames = [sub.replace("./", "") for sub in initial_html_filenames_list]

    for page in html_filenames:
        response = requests.get(link_url_prefix + page, allow_redirects=False, headers=DEFAULT_REQUESTS_HEADERS)
        # Replace the CSS stuff. Basically this:
        """
        <link href='href="https://docs.aws.amazon.com/images/favicon.ico"' rel="icon" type="image/ico"/>
        <link href='href="https://docs.aws.amazon.com/images/favicon.ico"' rel="shortcut icon" type="image/ico"/>
        <link href='href="https://docs.aws.amazon.com/font/css/font-awesome.min.css"' rel="stylesheet" type="text/css"/>
        <link href='href="https://docs.aws.amazon.com/css/code/light.css"' id="code-style" rel="stylesheet" type="text/css"/>
        <link href='href="https://docs.aws.amazon.com/css/awsdocs.css?v=20181221"' rel="stylesheet" type="text/css"/>
        <link href='href="https://docs.aws.amazon.com/assets/marketing/css/marketing-target.css"' rel="stylesheet" type="text/css"/>
        list_amazonkendra.html downloaded
        """
        soup = BeautifulSoup(response.content, "html.parser")
        for link in soup.find_all("link"):
            if link.get("href").startswith("/"):
                temp = link.attrs["href"]
                link.attrs["href"] = link.attrs["href"].replace(
                    temp, f"https://docs.aws.amazon.com{temp}"
                )

        for script in soup.find_all("script"):
            try:
                if "src" in script.attrs:
                    if script.get("src").startswith("/"):
                        temp = script.attrs["src"]
                        script.attrs["src"] = script.attrs["src"].replace(
                            temp, f"https://docs.aws.amazon.com{temp}"
                        )
            except TypeError as t_e:
                print(t_e)
                print(script)
            except AttributeError as a_e:
                print(a_e)
                print(script)

        with open(html_docs_destination + page, "w") as file:
            # file.write(str(soup.html))
            file.write(str(soup.prettify()))
            file.close()
        # print(f"{page} downloaded")


def chomp(string):
    """This chomp cleans up all white-space, not just at the ends"""
    string = str(string)
    response = string.replace("\n", " ")  # Convert line ends to spaces
    response = re.sub(
        " [ ]*", " ", response
    )  # Truncate multiple spaces to single space
    response = re.sub("^[ ]*", "", response)  # Clean start
    return re.sub("[ ]*$", "", response)  # Clean end


def no_white_space(string):
    string = str(string)
    response = string.replace("\n", "")  # Convert line ends to spaces
    response = re.sub("[ ]*", "", response)
    return response


def header_matches(string, table):
    headers = [chomp(str(x)).lower() for x in table.find_all("th")]
    match_found = False
    for header in headers:
        if string in header:
            match_found = True
    if not match_found:
        return False
    return True


def column_index(substring, table):
    """Return the index of the first header column whose text contains substring
    (case-insensitive), or None if no header matches. Used to map the actions
    table columns by name, since AWS reorders/adds/removes columns over time."""
    headers = [chomp(x.text).lower() for x in table.find_all("th")]
    for idx, header in enumerate(headers):
        if substring in header:
            return idx
    return None


def is_operations_table(table):
    """The "API operations defined by <service>" table maps each API operation to
    the IAM actions it authorizes (columns: Operation | IAM action | Condition key
    | Possible value(s) | Access level)."""
    return (
        column_index("operation", table) is not None
        and column_index("iam action", table) is not None
    )


def parse_dependent_actions(table, prefix):
    """Reconstruct per-privilege dependent actions from the "API operations
    defined by" table.

    AWS used to publish a "Dependent actions" column in the actions table; that
    column is gone. The operations table now lists, for each API operation, every
    IAM action it authorizes. The operation's primary action is ``prefix:Operation``
    and the remaining actions in its group are treated as that action's dependent
    actions. Returns ``{privilege_name: [dependent action strings]}``.
    """
    operation_col = column_index("operation", table)
    iam_action_col = column_index("iam action", table)
    if operation_col is None or iam_action_col is None:
        return {}

    num_columns = len(table.find_all("th"))
    # Every column except the Operation column repeats on continuation rows.
    per_row_columns = sorted(col for col in range(num_columns) if col != operation_col)

    # operation name -> ordered list of IAM action strings it authorizes
    operations = {}
    rows = table.find_all("tr")
    row_number = 0
    while row_number < len(rows):
        cells = rows[row_number].find_all("td")
        if len(cells) == 0:
            # Skip the header row, which has th, not td cells
            row_number += 1
            continue
        if len(cells) != num_columns:
            break

        rowspan = 1
        if "rowspan" in cells[operation_col].attrs:
            rowspan = int(cells[operation_col].attrs["rowspan"])
        operation_name = chomp(cells[operation_col].text)
        actions = operations.setdefault(operation_name, [])

        is_operation_row = True
        while rowspan > 0:
            if is_operation_row:
                action_cell = cells[iam_action_col]
            else:
                action_cell = dict(zip(per_row_columns, cells)).get(iam_action_col)

            if action_cell is not None:
                action = chomp(action_cell.text)
                if action and action not in actions:
                    actions.append(action)

            rowspan -= 1
            if rowspan > 0:
                row_number += 1
                cells = rows[row_number].find_all("td")
                is_operation_row = False
        row_number += 1

    dependent_actions_by_privilege = {}
    for operation_name, actions in operations.items():
        primary_action = "{}:{}".format(prefix, operation_name)
        if primary_action not in actions:
            # Can't confidently identify the operation's primary action, so we
            # don't attribute its dependents to any privilege.
            continue
        dependents = [action for action in actions if action != primary_action]
        if dependents:
            dependent_actions_by_privilege[operation_name] = dependents
    return dependent_actions_by_privilege


# Create the docs directory
Path("docs").mkdir(parents=True, exist_ok=True)

update_html_docs_directory("docs/")

mypath = "./docs/"
schema = []

# for filename in ['list_amazons3.html']:
for filename in [f for f in listdir(mypath) if isfile(join(mypath, f))]:
    if not filename.startswith("list_"):
        continue

    with open(mypath + filename, "r") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
        main_content = soup.find(id="main-content")
        if main_content is None:
            continue

        # Get service name
        title = main_content.find("h1", class_="topictitle").text
        title = re.sub(".*Actions, resources, and condition keys for *", "", str(title))
        title = title.replace("</h1>", "")
        service_name = chomp(title)

        prefix = ""
        for c in main_content.find("h1", class_="topictitle").parent.children:
            if "prefix" in str(c):
                prefix = str(c)
                prefix = prefix.split('<code class="code">')[1]
                prefix = chomp(prefix.split("</code>")[0])
                break

        service_schema = {
            "service_name": service_name,
            "prefix": prefix,
            "privileges": [],
            "resources": [],
            "conditions": [],
        }

        tables = main_content.find_all("div", class_="table-contents")

        # AWS removed the "Dependent actions" column from the actions table; the
        # equivalent data now lives in the "API operations defined by" table, which
        # we parse first so we can reattach dependent actions to each privilege.
        dependent_actions_by_privilege = {}
        for table in tables:
            if is_operations_table(table):
                dependent_actions_by_privilege = parse_dependent_actions(table, prefix)
                break

        for table in tables:
            # AWS now publishes actions across two tables that share the same
            # column layout: "Actions defined by <service>" and, where present,
            # "Permission-only actions for <service>". Both are matched here (and
            # neither the API operations, resource types, nor condition key tables
            # collide, since they lack an "actions"+"description" header pair).
            # Example: https://docs.aws.amazon.com/service-authorization/latest/reference/list_fis.html
            if not header_matches("actions", table) or not header_matches(
                "description", table
            ):
                continue

            # Map columns by header name rather than fixed positions. The current
            # layout is: Actions | Description | Resource types | Condition keys |
            # Access level (the older layout put Access level before Resource
            # types and had a trailing Dependent actions column, now removed).
            actions_col = column_index("actions", table)
            description_col = column_index("description", table)
            access_col = column_index("access level", table)
            resource_col = column_index("resource types", table)
            condition_col = column_index("condition keys", table)
            dependent_col = column_index("dependent actions", table)

            num_columns = len(table.find_all("th"))

            # The per-resource columns repeat on each continuation row (the
            # Actions/Description/Access level columns are spanned via rowspan).
            per_row_columns = sorted(
                col
                for col in (resource_col, condition_col, dependent_col)
                if col is not None
            )

            def cell_texts(element):
                """Split a table cell into its list of <p> values, ignoring empty cells."""
                values = []
                if element is not None and element.text.strip() != "":
                    for paragraph in element.find_all("p"):
                        values.append(chomp(paragraph.text))
                return values

            rows = table.find_all("tr")
            row_number = 0
            while row_number < len(rows):
                row = rows[row_number]

                cells = row.find_all("td")
                if len(cells) == 0:
                    # Skip the header row, which has th, not td cells
                    row_number += 1
                    continue

                if len(cells) != num_columns:
                    # Sometimes the privilege contains Scenarios, and I don't know how to handle this
                    break
                    # raise Exception("Unexpected format in {}: {}".format(prefix, row))

                # See if this cell spans multiple rows
                rowspan = 1
                if "rowspan" in cells[actions_col].attrs:
                    rowspan = int(cells[actions_col].attrs["rowspan"])

                priv = ""
                # Get the privilege
                for link in cells[actions_col].find_all("a"):
                    if "href" not in link.attrs:
                        # Skip the <a id='...'> tags
                        continue
                    priv = chomp(link.text)
                if priv == "":
                    priv = chomp(cells[actions_col].text)

                description = chomp(cells[description_col].text)
                access_level = chomp(cells[access_col].text)

                resource_types = []
                is_action_row = True

                while rowspan > 0:
                    if is_action_row:
                        # The action row holds every column, so index by header.
                        column_cell = lambda col: cells[col] if col is not None else None
                    else:
                        # Continuation rows only contain the per-resource columns,
                        # in their original left-to-right (header) order.
                        row_cells = dict(zip(per_row_columns, cells))
                        column_cell = lambda col: row_cells.get(col)

                    resource_type = ""
                    resource_cell = column_cell(resource_col)
                    if resource_cell is not None:
                        resource_type = chomp(resource_cell.text)

                    resource_types.append(
                        {
                            "resource_type": resource_type,
                            "condition_keys": cell_texts(column_cell(condition_col)),
                            "dependent_actions": cell_texts(column_cell(dependent_col)),
                        }
                    )

                    rowspan -= 1
                    if rowspan > 0:
                        row_number += 1
                        row = rows[row_number]
                        cells = row.find_all("td")
                        is_action_row = False

                if "[permission only]" in priv:
                    priv = priv.split(" ")[0]

                # Reattach dependent actions recovered from the operations table.
                # AWS no longer breaks these down per resource type, so we place
                # them on the first resource type entry; every known consumer reads
                # dependent actions unioned across all of a privilege's resource
                # types, so the exact placement does not matter.
                dependents = dependent_actions_by_privilege.get(priv, [])
                if dependents and resource_types:
                    resource_types[0]["dependent_actions"] = dependents

                privilege_schema = {
                    "privilege": priv,
                    "description": description,
                    "access_level": access_level,
                    "resource_types": resource_types,
                }

                service_schema["privileges"].append(privilege_schema)
                row_number += 1

        # Get resource table
        for table in tables:
            if not header_matches("resource types", table) or not header_matches(
                "arn", table
            ):
                continue

            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                if len(cells) == 0:
                    # Skip the header row, which has th, not td cells
                    continue

                if len(cells) != 3:
                    raise Exception(
                        "Unexpected number of resource cells {} in {}".format(
                            len(cells), filename
                        )
                    )

                resource = chomp(cells[0].text)

                arn = no_white_space(cells[1].text)
                conditions = []
                for condition in cells[2].find_all("p"):
                    conditions.append(chomp(condition.text))

                service_schema["resources"].append(
                    {"resource": resource, "arn": arn, "condition_keys": conditions}
                )

        # Get condition keys table
        for table in tables:
            if not (
                header_matches("<th> condition keys </th>", table)
                and header_matches("<th> type </th>", table)
            ):
                continue

            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all("td")

                if len(cells) == 0:
                    # Skip the header row, which has th, not td cells
                    continue

                if len(cells) != 3:
                    raise Exception(
                        "Unexpected number of condition cells {} in {}".format(
                            len(cells), filename
                        )
                    )

                condition = no_white_space(cells[0].text)
                description = chomp(cells[1].text)
                value_type = chomp(cells[2].text)

                service_schema["conditions"].append(
                    {
                        "condition": condition,
                        "description": description,
                        "type": value_type,
                    }
                )
        schema.append(service_schema)


schema.sort(key=lambda x: x["prefix"])
print(json.dumps(schema, indent=2, sort_keys=True))
