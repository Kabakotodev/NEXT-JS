import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

import { notifyError } from "../utils/toast"

import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell,
ResponsiveContainer
} from "recharts"

import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const API_PERSONNEL="http://localhost:5000/api/personnels"
const API_SERVICE="http://localhost:5000/api/services"

const COLORS=[
"#2563eb",
"#16a34a",
"#dc2626",
"#ea580c",
"#7c3aed",
"#0891b2",
"#9333ea",
"#be185d"
]

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
createdAt?:string
}

const TOP10PersonnelParService2=()=>{

const [personnels,setPersonnels]=useState<PersonnelType[]>([])
const [services,setServices]=useState<ServiceType[]>([])

const [search,setSearch]=useState("")
const [serviceFilter,setServiceFilter]=useState("all")
const [yearFilter,setYearFilter]=useState("all")

const exportRef = useRef<HTMLDivElement>(null)

const navigate = useNavigate()

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


// ================= FILTRE =================

const filtered=useMemo(()=>{

return personnels.filter((p)=>{

const searchMatch=

p.nom_personnel?.toLowerCase().includes(search.toLowerCase()) ||
p.prenom_personnel?.toLowerCase().includes(search.toLowerCase()) ||
p.matricule?.toLowerCase().includes(search.toLowerCase())

const serviceMatch=
serviceFilter==="all" ||
String(p.service_id)===serviceFilter

const yearMatch =
yearFilter==="all" ||
new Date(p.createdAt || "").getFullYear().toString()===yearFilter

return searchMatch && serviceMatch && yearMatch

})

},[personnels,search,serviceFilter,yearFilter])


// ================= STATS =================

const stats=useMemo(()=>{

const groups:Record<string,number>={}

filtered.forEach((p)=>{

const s=p.service?.nomService || "Non défini"

if(!groups[s]) groups[s]=0

groups[s]++

})

return Object.keys(groups).map((key)=>({

service:key,
total:groups[key]

}))

},[filtered])


// ================= TOP SERVICES =================

const topServices = useMemo(()=>{

return [...stats]
.sort((a,b)=>b.total-a.total)
.slice(0,10)

},[stats])


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


const totalPersonnels = filtered.length


// ================= EXPORT EXCEL =================

const exportExcel=()=>{

const data=filtered.map(p=>({

Matricule:p.matricule,
Prenom:p.prenom_personnel,
Nom:p.nom_personnel,
Contact:p.contact_personnel,
Service:p.service?.nomService

}))

const worksheet=XLSX.utils.json_to_sheet(data)

const workbook=XLSX.utils.book_new()

XLSX.utils.book_append_sheet(workbook,worksheet,"Personnels")

XLSX.writeFile(workbook,"dashboard_personnels.xlsx")

}


// ================= EXPORT PDF =================

const exportPDF=async()=>{

if(!exportRef.current) return

const canvas=await html2canvas(exportRef.current)

const img=canvas.toDataURL("image/png")

const pdf=new jsPDF("p","mm","a4")

const width=pdf.internal.pageSize.getWidth()

const height=(canvas.height*width)/canvas.width

pdf.addImage(img,"PNG",0,10,width,height)

pdf.save("dashboard_personnels.pdf")

}


// ================= PRINT =================

const handlePrint=()=>{

window.print()

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

const initials=(p.prenom_personnel?.[0]||"")+(p.nom_personnel?.[0]||"")

return(

<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">

{initials.toUpperCase()}

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
header:"Nom complet",
cell:({row}:any)=>{

const p=row.original
return `${p.prenom_personnel} ${p.nom_personnel}`

}
},

{
header:"Service",
cell:({row}:any)=>{

const s=row.original.service

if(!s) return "-"

return(

<div className="flex gap-2">

<Badge variant="outline">
{s.sigleService}
</Badge>

<span>{s.nomService}</span>

</div>

)

}
},

{
accessorKey:"contact_personnel",
header:"Contact"
},

{
header:"Actions",
cell:({row}:any)=>{

const personnel=row.original

return(

<button
onClick={()=>navigate(`/personnel/${personnel.id}`)}
className="p-1 hover:bg-muted rounded text-blue-600"
>
<Eye size={18}/>
</button>

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

<div ref={exportRef} className="container mx-auto max-w-6xl space-y-12">

<h1 className="text-2xl font-bold text-center">

Dashboard RH - Personnels par Service

</h1>


{/* ACTIONS */}

<div className="flex justify-center gap-3">

<Button onClick={exportExcel}>
Export Excel
</Button>

<Button onClick={exportPDF}>
Export PDF
</Button>

<Button onClick={handlePrint}>
Imprimer
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

<Select value={serviceFilter} onValueChange={setServiceFilter}>

<SelectTrigger className="w-[220px]">
<SelectValue placeholder="Filtrer service"/>
</SelectTrigger>

<SelectContent>

<SelectItem value="all">Tous les services</SelectItem>

{services.map((s)=>(
<SelectItem key={s.id} value={String(s.id)}>
{s.sigleService} - {s.nomService}
</SelectItem>
))}

</SelectContent>

</Select>


<Select value={yearFilter} onValueChange={setYearFilter}>

<SelectTrigger className="w-[160px]">
<SelectValue placeholder="Année"/>
</SelectTrigger>

<SelectContent>

<SelectItem value="all">Toutes</SelectItem>

{[2022,2023,2024,2025,2026].map(y=>(
<SelectItem key={y} value={String(y)}>
{y}
</SelectItem>
))}

</SelectContent>

</Select>

</div>


{/* STAT CARDS */}

<div className="grid md:grid-cols-3 gap-6">

<div className="card-elevated p-6 text-center">

<h3 className="text-sm text-muted-foreground">
Total personnels
</h3>

<p className="text-3xl font-bold">
{totalPersonnels}
</p>

</div>


<div className="card-elevated p-6 text-center">

<h3 className="text-sm text-muted-foreground">
Nombre services
</h3>

<p className="text-3xl font-bold">
{services.length}
</p>

</div>


<div className="card-elevated p-6 text-center">

<h3 className="text-sm text-muted-foreground">
Top service
</h3>

<p className="text-lg font-bold">
{topServices[0]?.service || "-"}
</p>

</div>

</div>


{/* BAR CHART */}

<div className="card-elevated p-8">

<h2 className="font-semibold mb-4">

Personnels par service

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


{/* PIE CHART */}

<div className="card-elevated p-8">

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

{stats.map((_,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

</PieChart>

</ResponsiveContainer>

</div>


{/* TOP SERVICES */}

<div className="card-elevated p-8">

<h2 className="font-semibold mb-4">

Top 10 services

</h2>

<table className="w-full text-sm">

<thead>

<tr className="border-b">
<th className="p-2 text-left">Service</th>
<th className="p-2 text-left">Personnels</th>
</tr>

</thead>

<tbody>

{topServices.map((s,index)=>(

<tr key={index} className="border-b">

<td className="p-2">{s.service}</td>

<td className="p-2">
<Badge>{s.total}</Badge>
</td>

</tr>

))}

</tbody>

</table>

</div>


{/* TABLES PAR SERVICE */}

{Object.entries(grouped).map(([serviceName,personnels])=>(

<div key={serviceName} className="card-elevated p-8">

<div className="flex justify-between mb-6">

<h2 className="text-xl font-semibold">
{serviceName}
</h2>

<Badge>{personnels.length}</Badge>

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

export default TOP10PersonnelParService2