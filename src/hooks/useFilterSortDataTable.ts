import { ColumnDef, Table, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export function useFilterSortDataTable<TData>({data, columns}:DataTableProps<TData>): Table<TData>{
    const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});
    return table;
}