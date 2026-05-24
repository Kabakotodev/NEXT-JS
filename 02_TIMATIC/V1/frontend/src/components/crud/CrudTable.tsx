import DataTable from "@/components/DataTable"

export default function CrudTable({columns,data}:any){

 return(

 <DataTable
 columns={columns}
 data={data}
 />

 )

}