export interface CrudField {

 name:string
 label:string
 type:"text" | "textarea" | "select"

 options?:{
  label:string
  value:string | number
 }[]

}

export interface CrudColumn {

 accessorKey?:string
 header:string
 cell?:(row:any)=>React.ReactNode

}