import type { Invoice } from '@/entities/Invoice';
import { useState } from 'react';
import { DataTable } from '../DataTable';
import { DataTableColumnsVisibilityDropdown } from '../DataTable/DataTableColumnsVisibilityDropdown';
import { DataTableContent } from '../DataTable/DataTableContent';
import { DataTableFacetedFilter } from '../DataTable/DataTableFacetedFilter';
import { DataTablePagination } from '../DataTable/DataTablePagination';
import { DataTableTextFilter } from '../DataTable/DataTableTextFilter';
import { columns } from './columns';
import { invoices } from './data';

export function InvoicesTable() {
	const [, setSelectedRows] = useState<Invoice[]>([]);

	return (
		<DataTable
			data={invoices}
			columns={columns}
			onSelectRow={(selectedRows) => {
				setSelectedRows(selectedRows);
			}}
			pagination={{
				pageIndex: 0,
				pageSize: 10
			}}
		>
			<div className='mb-4 flex items-center gap-4 mt-4'>
				<DataTableTextFilter placeholder='Search...' column='paymentStatus' />

				<DataTableFacetedFilter column='paymentStatus' />

				<DataTableColumnsVisibilityDropdown />
			</div>

			<DataTableContent />

			<div className='flex justify-end items-center mt-4'>
				<DataTablePagination />
			</div>
		</DataTable>
	);
}
