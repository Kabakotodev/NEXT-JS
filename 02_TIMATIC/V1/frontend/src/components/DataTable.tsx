import {
 useReactTable,
 getCoreRowModel,
 getPaginationRowModel,
 flexRender,
} from "@tanstack/react-table";

export default function DataTable({ columns, data }) {

 const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
 });

 return (

<div>

<table className="w-full">

<thead>
{table.getHeaderGroups().map((headerGroup)=>(
<tr key={headerGroup.id}>
{headerGroup.headers.map((header)=>(
<th key={header.id}>
{flexRender(header.column.columnDef.header, header.getContext())}
</th>
))}
</tr>
))}
</thead>

<tbody>

{table.getRowModel().rows.map((row)=>(
<tr key={row.id}>
{row.getVisibleCells().map((cell)=>(
<td key={cell.id}>
{flexRender(cell.column.columnDef.cell, cell.getContext())}
</td>
))}
</tr>
))}

</tbody>

</table>

</div>

 );
}