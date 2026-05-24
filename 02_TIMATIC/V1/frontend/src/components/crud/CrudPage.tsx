import { useState,useEffect } from "react"
import axios from "axios"

import CrudForm from "./CrudForm"
import CrudTable from "./CrudTable"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CrudPage({

 title,
 api,
 columns,
 fields

}:any){

const [data,setData] = useState([])
const [formData,setFormData] = useState({})
const [search,setSearch] = useState("")

const fetchData = async()=>{

 const res = await axios.get(api)

 setData(res.data)

}

useEffect(()=>{

 fetchData()

},[])

const handleSubmit = async(e:any)=>{

 e.preventDefault()

 await axios.post(api,formData)

 setFormData({})

 fetchData()

}

const filtered = data.filter((item:any)=>

 JSON.stringify(item)
 .toLowerCase()
 .includes(search.toLowerCase())

)

return(

<div className="space-y-10">

<h2 className="text-xl font-bold">
{title}
</h2>

<form onSubmit={handleSubmit}>

<CrudForm
fields={fields}
formData={formData}
setFormData={setFormData}
/>

<Button type="submit" className="mt-4">
Ajouter
</Button>

</form>

<Input
placeholder="Rechercher"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<CrudTable
columns={columns}
data={filtered}
/>

</div>

)

}