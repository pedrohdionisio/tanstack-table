import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { useDataTable } from './DataTableContext';

interface IDataTableFacetedFilterProps {
	column: string;
}

export function DataTableFacetedFilter({
	column
}: IDataTableFacetedFilterProps) {
	const { table } = useDataTable();

	const tableColumn = table.getColumn(column);
	const facet = tableColumn?.getFacetedUniqueValues();
	const keys = facet?.keys();
	const options = keys ? Array.from(keys) : [];

	return (
		<Select onValueChange={(value) => tableColumn?.setFilterValue(value)}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select...' />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option} ({facet?.get(option)})
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
