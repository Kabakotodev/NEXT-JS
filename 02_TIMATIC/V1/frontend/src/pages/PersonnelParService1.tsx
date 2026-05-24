import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select"

import DataTable from "@/components/DataTable"

import { useState,useEffect,useMemo } from "react"

import axios from "axios"

import { notifyError } from "../utils/toast"

const API_PERSONNEL="http://localhost:5000/api/personnels"
const API_SERVICE="http://localhost:5000/api/services"

interface ServiceType{
id:number
nomService:string
sigleService:string
}

interface PersonnelType{
id:number
matricule:string
prenom_personnel:string
nom_personnel:string
adresse_personnel:string
contact_personnel:string
image_personnel?:string
service_id:number
service?:ServiceType
}

const PersonnelParService=()=>{

const [personnels,setPersonnels]=useState<PersonnelType[]>([])
const [services,setServices]=useState<ServiceType[]>([])

const [search,setSearch]=useState("")
const [serviceFilter,setServiceFilter]=useState("all")


// ================= API =================

const fetchPersonnels=async()=>{

try{

const res=await axios.get(API_PERSONNEL)

setPersonnels(res.data)

}catch{

notifyError("Impossible de charger les personnels")

}

}

const fetchServices=async()=>{

const res=await axios.get(API_SERVICE)

setServices(res.data)

}

useEffect(()=>{

fetchPersonnels()
fetchServices()

},[])


// ================= SEARCH + FILTER =================

const filtered=useMemo(()=>{

return personnels.filter((p)=>{

const searchMatch=

p.nom_personnel.toLowerCase().includes(search.toLowerCase()) ||

p.prenom_personnel.toLowerCase().includes(search.toLowerCase()) ||

p.matricule.toLowerCase().includes(search.toLowerCase())

const serviceMatch=

serviceFilter==="all" ||
String(p.service_id)===serviceFilter

return searchMatch && serviceMatch

})

},[personnels,search,serviceFilter])


// ================= GROUP BY SERVICE =================

const grouped=useMemo(()=>{

const groups:Record<string,PersonnelType[]>={}

filtered.forEach((p)=>{

const serviceName=p.service?.nomService || "Non défini"

if(!groups[serviceName]) groups[serviceName]=[]

groups[serviceName].push(p)

})

return groups

},[filtered])


// ================= TABLE COLUMNS =================

const columns=[

{
accessorKey:"matricule",
header:"Matricule"
},

{
header:"Nom complet",
cell:({row}:any)=>{

const p=row.original

return `${p.prenom_personnel} ${p.nom_personnel}`

}
},

{
accessorKey:"contact_personnel",
header:"Contact"
}

]


// ================= UI =================

return(

<div className="min-h-screen flex flex-col">

<Header/>

<main className="flex-1 pt-20">

<section className="py-16">

<div className="container mx-auto max-w-6xl space-y-12">

<h1 className="text-2xl font-bold text-center">

Personnels par Service

</h1>


{/* FILTRES */}

<div className="flex gap-4 justify-center">

<Input
placeholder="Rechercher personnel..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="max-w-xs"
/>

<Select
value={serviceFilter}
onValueChange={setServiceFilter}
>

<SelectTrigger className="w-[250px]">

<SelectValue placeholder="Filtrer par service"/>

</SelectTrigger>

<SelectContent>

<SelectItem value="all">

Tous les services

</SelectItem>

{services.map((s)=>(

<SelectItem key={s.id} value={String(s.id)}>

{s.sigleService} - {s.nomService}

</SelectItem>

))}

</SelectContent>

</Select>

</div>


{/* GROUP TABLES */}

{Object.entries(grouped).map(([serviceName,personnels])=>(

<div key={serviceName} className="card-elevated p-8">

<div className="flex justify-between items-center mb-6">

<h2 className="text-xl font-semibold">

{serviceName}

</h2>

<Badge>

{personnels.length}

</Badge>

</div>

<DataTable
columns={columns}
data={personnels}
/>

</div>

))}

</div>

</section>

</main>

<Footer/>

</div>

)

}

export default PersonnelParService