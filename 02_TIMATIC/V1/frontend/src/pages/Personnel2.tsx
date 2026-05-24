import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select"

import DataTable from "@/components/DataTable"

import { useState,useEffect,useMemo,useRef } from "react"

import axios from "axios"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell
} from "recharts"

import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const API_PERSONNEL="http://localhost:5000/api/personnels"
const API_SERVICE="http://localhost:5000/api/services"

const COLORS=["#2563eb","#16a34a","#dc2626","#ea580c","#7c3aed"]

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

const Personnel2=()=>{

const [personnels,setPersonnels]=useState<PersonnelType[]>([])
const [services,setServices]=useState<ServiceType[]>([])
const [search,setSearch]=useState("")
const [serviceFilter,setServiceFilter]=useState("all")

const exportRef=useRef<HTMLDivElement>(null)


// ================= API =================

const fetchPersonnels=async()=>{

const res=await axios.get(API_PERSONNEL)

setPersonnels(res.data)

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


// ================= STATS =================

const stats=useMemo(()=>{

const groups:any={}

personnels.forEach(p=>{

const name=p.service?.nomService || "Non défini"

if(!groups[name]) groups[name]=0

groups[name]++

})

return Object.keys(groups).map((key)=>({

service:key,
total:groups[key]

}))

},[personnels])


// ================= EXPORT EXCEL =================

const exportExcel=()=>{

const ws=XLSX.utils.json_to_sheet(personnels)

const wb=XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Personnels")

XLSX.writeFile(wb,"personnels.xlsx")

}


// ================= EXPORT PDF =================

const exportPDF=async()=>{

if(!exportRef.current) return

const canvas=await html2canvas(exportRef.current)

const img=canvas.toDataURL("image/png")

const pdf=new jsPDF()

pdf.addImage(img,"PNG",10,10,190,0)

pdf.save("personnels.pdf")

}


// ================= AVATAR =================

const avatar=(p:PersonnelType)=>{

if(p.image_personnel){

return(

<img
src={p.image_personnel}
className="w-10 h-10 rounded-full object-cover"
/>

)

}

const initials=(p.prenom_personnel[0]+p.nom_personnel[0]).toUpperCase()

return(

<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

{initials}

</div>

)

}


// ================= TABLE =================

const columns=[

{
header:"Photo",
cell:({row}:any)=>avatar(row.original)
},

{
accessorKey:"matricule",
header:"Matricule"
},

{
header:"Nom",
cell:({row}:any)=>

`${row.original.prenom_personnel} ${row.original.nom_personnel}`
},

{
header:"Service",
cell:({row}:any)=>{

const s=row.original.service

return(

<div className="flex gap-2">

<Badge variant="outline">

{s?.sigleService}

</Badge>

<span>

{s?.nomService}

</span>

</div>

)

}

}

]


// ================= UI =================

return(

<div className="min-h-screen flex flex-col">

<Header/>

<main className="flex-1 pt-20">

<section className="py-16">

<div className="container mx-auto max-w-6xl space-y-10" ref={exportRef}>

<h1 className="text-2xl font-bold text-center">

Gestion des personnels

</h1>


{/* ACTIONS */}

<div className="flex gap-3 justify-center">

<Button onClick={exportExcel}>

Export Excel

</Button>

<Button onClick={exportPDF}>

Export PDF

</Button>

</div>


{/* FILTRES */}

<div className="flex gap-4 justify-center">

<Input
placeholder="Recherche personnel..."
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

{services.map(s=>(

<SelectItem key={s.id} value={String(s.id)}>

{s.sigleService} - {s.nomService}

</SelectItem>

))}

</SelectContent>

</Select>

</div>


{/* GRAPH BAR */}

<div className="card-elevated p-6">

<h2 className="font-semibold mb-4">

Nombre de personnels par service

</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={stats}>

<XAxis dataKey="service"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="total" fill="#2563eb"/>

</BarChart>

</ResponsiveContainer>

</div>


{/* GRAPH PIE */}

<div className="card-elevated p-6">

<h2 className="font-semibold mb-4">

Répartition des personnels

</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={stats}
dataKey="total"
nameKey="service"
outerRadius={120}
label
>

{stats.map((_,i)=>(

<Cell key={i} fill={COLORS[i % COLORS.length]}/>

))}

</Pie>

</PieChart>

</ResponsiveContainer>

</div>


{/* TABLE */}

<div className="card-elevated p-8">

<div className="flex justify-between mb-6">

<h2 className="text-xl font-bold">

Liste des personnels

</h2>

<Badge>

{filtered.length}

</Badge>

</div>

<DataTable

columns={columns}
data={filtered}

/>

</div>

</div>

</section>

</main>

<Footer/>

</div>

)

}

export default Personnel2