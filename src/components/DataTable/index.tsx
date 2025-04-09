import {
	type ColumnDef,
	type PaginationState,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { DataTableContext } from './DataTableContext';

interface IDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	children: React.ReactNode;
	pagination?: PaginationState;
	onSelectRow?: (selectedRows: TData[]) => void;
}

export function DataTable<TData>({
	columns,
	data,
	children,
	pagination,
	onSelectRow
}: IDataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		columnResizeMode: 'onChange',
		defaultColumn: {
			size: 100,
			minSize: 80
		},
		globalFilterFn: 'includesString',
		initialState: {
			pagination
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const selectedRow = useMemo(
		() => table.getSelectedRowModel().flatRows.map((row) => row.original),
		[table.getSelectedRowModel().flatRows]
	);

	const memoOnSelectRow = useRef(onSelectRow);

	useLayoutEffect(() => {
		memoOnSelectRow.current = onSelectRow;
	}, [onSelectRow]);

	useEffect(() => {
		memoOnSelectRow.current?.(selectedRow);
	}, [selectedRow]);

	return (
		<DataTableContext.Provider value={{ table }}>
			{children}
		</DataTableContext.Provider>
	);
}
