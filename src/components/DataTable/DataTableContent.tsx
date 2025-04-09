import { useMemo } from 'react';
import { Table } from '../ui/table';
import { DataTableBody, MemoizedDataTableBody } from './DataTableBody';
import { useDataTable } from './DataTableContext';
import { DataTableHeader } from './DataTableHeader';

export function DataTableContent() {
	const { table } = useDataTable();

	const { columnSizingInfo, columnSizing } = table.getState();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const colSizeVariables = useMemo(
		() =>
			table.getFlatHeaders().reduce<Record<string, number>>(
				(acc, header) => ({
					...acc,
					[`--header-${header.id}-size`]: header.getSize(),
					[`--col-${header.column.id}-size`]: header.column.getSize()
				}),
				{}
			),
		[columnSizingInfo, columnSizing, table.getFlatHeaders]
	);

	return (
		<Table style={colSizeVariables}>
			<DataTableHeader />

			{columnSizingInfo.isResizingColumn && <MemoizedDataTableBody />}
			{!columnSizingInfo.isResizingColumn && <DataTableBody />}
		</Table>
	);
}
