import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
 DialogFooter
} from "@/components/ui/dialog";

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from "@/components/ui/select";

import DataTable from "@/components/DataTable";

import { useState, useEffect, useMemo } from "react";

import { Edit, Trash2 } from "lucide-react";

import axios from "axios";

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const API_URL = "http://localhost:5000/api/services";
const SERVICE_PARENT_API = "http://localhost:5000/api/service-parents";

const ITEMS_PER_PAGE = 5;

interface ServiceParentType {
 id:number
 nomServiceParent:string
 sigleServiceParent:string
}

interface ServiceType {
 id:number
 nomService:string
 sigleService:string
 descService:string
 contactService?:string
 adresseService?:string
 statutChefService:string
 nomChefService:string
 gradeChefService:string
 fonctionChefService:string
 contactChefService:string
 serviceParentId:number
 serviceParent?:ServiceParentType
}

const emptyForm = {
 nomService:"",
 sigleService:"",
 descService:"",
 contactService:"",
 adresseService:"",
 statutChefService:"",
 nomChefService:"",
 gradeChefService:"",
 fonctionChefService:"",
 contactChefService:"",
 serviceParentId:""
}

const Service = () => {

const [services,setServices] = useState<ServiceType[]>([])
const [serviceParents,setServiceParents] = useState<ServiceParentType[]>([])

const [search,setSearch] = useState("")
const [currentPage,setCurrentPage] = useState(1)

const [editingId,setEditingId] = useState<number|null>(null)
const [openDialog,setOpenDialog] = useState(false)
const [selectedId,setSelectedId] = useState<number|null>(null)

const [formData,setFormData] = useState(emptyForm)



// ================= LOAD =================

const fetchServices = async()=>{

 try{

  const res = await axios.get(API_URL)

  setServices(res.data)

 }catch{

  notifyError("Erreur chargement services")

 }

}

const fetchServiceParents = async()=>{

 try{

  const res = await axios.get(SERVICE_PARENT_API)

  setServiceParents(res.data)

 }catch{

  notifyError("Erreur chargement directions")

 }

}

useEffect(()=>{

 fetchServices()
 fetchServiceParents()

},[])



// ================= SEARCH =================

const filteredServices = useMemo(()=>{

 return services.filter((s)=>

  s.nomService.toLowerCase().includes(search.toLowerCase()) ||
  s.sigleService.toLowerCase().includes(search.toLowerCase())

 )

},[services,search])



// ================= PAGINATION =================

const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE)

const paginatedData = useMemo(()=>{

 const start = (currentPage - 1) * ITEMS_PER_PAGE

 return filteredServices.slice(start,start + ITEMS_PER_PAGE)

},[filteredServices,currentPage])



// ================= SUBMIT =================

const handleSubmit = async(e:React.FormEvent)=>{

 e.preventDefault()

 if(!formData.nomService || !formData.serviceParentId){

  notifyWarning("Nom service et direction obligatoires")

  return

 }

 try{

  const payload = {
   ...formData,
   serviceParentId:Number(formData.serviceParentId)
  }

  if(editingId){

   await axios.put(`${API_URL}/${editingId}`,payload)

   notifySuccess("Service modifié")

  }else{

   await axios.post(API_URL,payload)

   notifySuccess("Service ajouté")

  }

  setFormData(emptyForm)

  setEditingId(null)

  fetchServices()

 }catch{

  notifyError("Erreur enregistrement")

 }

}



// ================= EDIT =================

const handleEdit = (s:ServiceType)=>{

 setFormData({

  nomService:s.nomService,
  sigleService:s.sigleService,
  descService:s.descService,
  contactService:s.contactService || "",
  adresseService:s.adresseService || "",
  statutChefService:s.statutChefService,
  nomChefService:s.nomChefService,
  gradeChefService:s.gradeChefService,
  fonctionChefService:s.fonctionChefService,
  contactChefService:s.contactChefService,
  serviceParentId:String(s.serviceParentId)

 })

 setEditingId(s.id)

 window.scrollTo({top:0,behavior:"smooth"})

}



// ================= DELETE =================

const confirmDelete = (id:number)=>{

 setSelectedId(id)

 setOpenDialog(true)

}

const handleDelete = async()=>{

 if(!selectedId) return

 try{

  await axios.delete(`${API_URL}/${selectedId}`)

  notifySuccess("Service supprimé")

  fetchServices()

 }catch{

  notifyError("Erreur suppression")

 }

 setOpenDialog(false)

}



// ================= TABLE COLUMNS =================

const columns = [

{
 accessorKey:"nomService",
 header:"Service"
},

{
 accessorKey:"sigleService",
 header:"Sigle"
},

{
 header:"Direction",
 cell:({row}:any)=>{

  const sp = row.original.serviceParent

  return(
   <Badge variant="secondary">
   {sp?.id}
   {/* {sp?.service.sigleServiceParent} */}
   </Badge>
  )

//   {serviceParents.map((sp)=>(
// <SelectItem key={sp.id} value={String(sp.id)}>
// {sp.nomServiceParent}
// </SelectItem>
// ))}

 }
},

{
 header:"Actions",
 cell:({row}:any)=>{

  const s = row.original

  return(

   <div className="flex gap-2 justify-center">

    <button
    onClick={()=>handleEdit(s)}
    className="text-yellow-600"
    >
    <Edit size={16}/>
    </button>

    <button
    onClick={()=>confirmDelete(s.id)}
    className="text-red-600"
    >
    <Trash2 size={16}/>
    </button>

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

<div className="container mx-auto max-w-6xl space-y-10">


{/* FORM */}

<form onSubmit={handleSubmit} className="space-y-6">

<div className="card-elevated p-6">

<h3 className="font-semibold mb-4">
Informations service
</h3>

<div className="grid md:grid-cols-2 gap-4">

<Input
placeholder="Nom service"
value={formData.nomService}
onChange={(e)=>setFormData({...formData,nomService:e.target.value})}
/>

<Input
placeholder="Sigle service"
value={formData.sigleService}
onChange={(e)=>setFormData({...formData,sigleService:e.target.value})}
/>

</div>

<Textarea
placeholder="Description"
value={formData.descService}
onChange={(e)=>setFormData({...formData,descService:e.target.value})}
/>

</div>


<div className="card-elevated p-6">

<h3 className="font-semibold mb-4">
Direction
</h3>

<Select
value={formData.serviceParentId}
onValueChange={(v)=>setFormData({...formData,serviceParentId:v})}
>

<SelectTrigger>
<SelectValue placeholder="Choisir direction"/>
</SelectTrigger>

<SelectContent>

{serviceParents.map((sp)=>(

<SelectItem key={sp.id} value={String(sp.id)}>
{sp.nomServiceParent}
</SelectItem>

))}

</SelectContent>

</Select>

</div>

<Button type="submit">
{editingId ? "Mettre à jour" : "Ajouter"}
</Button>

</form>



{/* TABLE */}

<div className="card-elevated p-8">

<div className="flex justify-between mb-6">

<h2 className="font-bold">
Liste des services
</h2>

<Badge variant="secondary">
{filteredServices.length}
</Badge>

</div>

<Input
placeholder="Rechercher..."
value={search}
onChange={(e)=>{

 setSearch(e.target.value)
 setCurrentPage(1)

}}
className="mb-6"
/>

<DataTable
columns={columns}
data={paginatedData}
/>


{/* PAGINATION */}

<div className="flex justify-center mt-6 gap-2">

<Button
disabled={currentPage===1}
onClick={()=>setCurrentPage(p=>p-1)}
>
Précédent
</Button>

<span className="px-3 py-2 text-sm">
Page {currentPage} / {totalPages || 1}
</span>

<Button
disabled={currentPage===totalPages || totalPages===0}
onClick={()=>setCurrentPage(p=>p+1)}
>
Suivant
</Button>

</div>

</div>



{/* DELETE DIALOG */}

<Dialog open={openDialog} onOpenChange={setOpenDialog}>

<DialogContent>

<DialogHeader>

<DialogTitle>
Confirmer suppression
</DialogTitle>

<DialogDescription>
Cette action est irréversible
</DialogDescription>

</DialogHeader>

<DialogFooter>

<Button
variant="secondary"
onClick={()=>setOpenDialog(false)}
>
Annuler
</Button>

<Button
variant="destructive"
onClick={handleDelete}
>
Supprimer
</Button>

</DialogFooter>

</DialogContent>

</Dialog>


</div>

</section>

</main>

<Footer/>

</div>

)

}

export default Service