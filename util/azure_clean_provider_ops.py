import json

provider_ops = []
with open("azure/provider-operations.json", "r") as f:
    provider_ops = json.loads(f.read())


def append_distinct_value(current_value, new_value, separator):
    values = current_value.split(separator) if current_value else []
    if new_value and new_value not in values:
        values.append(new_value)
    return separator.join(values)


def aggregate_operation(existing_operation, duplicate_operation):
    """Merge Azure's alternate metadata for the same permission."""
    existing_operation['displayName'] = append_distinct_value(
        existing_operation.get('displayName'), duplicate_operation.get('displayName'), ' / '
    )
    existing_operation['description'] = append_distinct_value(
        existing_operation.get('description'), duplicate_operation.get('description'), '\n'
    )
    origins = []
    for origin in (
        (existing_operation.get('origin') or '').split(',')
        + (duplicate_operation.get('origin') or '').split(',')
    ):
        if origin and origin not in origins:
            origins.append(origin)
    existing_operation['origin'] = ','.join(origins)


def deduplicate_operations(operations, seen_operations):
    """Aggregate entries sharing an Azure permission name.

    Azure can report the same permission in a provider's top-level operations and
    in one or more resource types.  Deduplicating each list independently leaves
    those duplicates in the published dataset, so the seen set is shared across
    all lists returned by Azure. A permission's fully-qualified name includes
    its provider, so it is also safe to use as the dataset-wide key. Metadata
    from duplicate entries is merged instead of being discarded.
    """
    cleaned_operations = []
    for operation in operations:
        operation_name = operation['name'].lower()
        existing_operation = seen_operations.get(operation_name)
        if existing_operation is None:
            seen_operations[operation_name] = operation
            cleaned_operations.append(operation)
        else:
            aggregate_operation(existing_operation, operation)
    return cleaned_operations

seen_operations = {}
for providerop in provider_ops:
    providerop['operations'] = deduplicate_operations(
        providerop.get('operations', []), seen_operations
    )
    for resourcetype in providerop.get('resourceTypes', []):
        resourcetype['operations'] = deduplicate_operations(
            resourcetype.get('operations', []), seen_operations
        )

with open("azure/provider-operations.json", "w") as f:
    f.write(json.dumps(provider_ops, indent=2, sort_keys=True))
