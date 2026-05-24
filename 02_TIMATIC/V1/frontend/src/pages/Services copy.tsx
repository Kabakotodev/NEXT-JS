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

const ITEMS_PER_PAGE = 5;

const API_URL = "http://localhost:5000/api/services";
const SERVICE_PARENT_API = "http://localhost:5000/api/service-parents";

interface ServiceParentType {
 id:number
 nomServiceParent:string
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

const Service = () => {

 const [services,setServices] = useState<ServiceType[]>([])
 const [serviceParents,setServiceParents] = useState<ServiceParentType[]>([])

 const [search,setSearch] = useState("")

 const [currentPage, setCurrentPage] = useState(1);

 const [editingId,setEditingId] = useState<number|null>(null)

 const [openDialog,setOpenDialog] = useState(false)

 const [selectedId,setSelectedId] = useState<number|null>(null)

 const [formData,setFormData] = useState({

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

 })


// ================= API =================

 const fetchServices = async()=>{

  try{

   const res = await axios.get(API_URL)

   setServices(res.data)

  }catch{

   notifyError("Impossible de charger les services")

  }

 }


 const fetchServiceParents = async()=>{

  try{

   const res = await axios.get(SERVICE_PARENT_API)

   setServiceParents(res.data)

  }catch{

   notifyError("Impossible de charger les services parents")

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

 //
 // ================= PAGINATION =================
const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
const paginatedData = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredServices.slice(start, start + ITEMS_PER_PAGE);

}, [filteredServices, currentPage]);


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
  accessorFn:(row:ServiceType)=>row.serviceParent?.nomServiceParent,
  header:"Service Parent"
 },

 {
  header:"Actions",
  cell:({row}:any)=>{

   const service = row.original

   return(

    <div className="flex gap-2 justify-center">

     <button
      onClick={()=>handleEdit(service)}
      className="p-1 hover:bg-muted rounded text-yellow-600"
     >
      <Edit size={16}/>
     </button>

     <button
      onClick={()=>confirmDelete(service.id)}
      className="p-1 hover:bg-muted rounded text-red-600"
     >
      <Trash2 size={16}/>
     </button>

    </div>

   )

  }
 }

 ]


// ================= SUBMIT =================

 const handleSubmit = async(e:React.FormEvent)=>{

  e.preventDefault()

  if(!formData.nomService || !formData.serviceParentId){

   notifyWarning("Nom service et service parent obligatoires")

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

   setFormData({

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

   })

   setEditingId(null)

   fetchServices()

  }catch{

   notifyError("Erreur lors de l'enregistrement")

  }

 }


// ================= EDIT =================

 const handleEdit = (service:ServiceType)=>{

  setFormData({

   nomService:service.nomService,
   sigleService:service.sigleService,
   descService:service.descService,

   contactService:service.contactService || "",
   adresseService:service.adresseService || "",

   statutChefService:service.statutChefService,
   nomChefService:service.nomChefService,
   gradeChefService:service.gradeChefService,
   fonctionChefService:service.fonctionChefService,
   contactChefService:service.contactChefService,

   serviceParentId:String(service.serviceParentId)

  })

  setEditingId(service.id)

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

   notifyError("Impossible de supprimer")

  }

  setOpenDialog(false)

 }


// ================= UI =================

 return(

 <div className="min-h-screen flex flex-col">

 <Header/>

 <main className="flex-1 pt-20">

 <section className="py-16">

 <div className="container mx-auto max-w-6xl space-y-10">


 {/* ================= FORM ================= */}

 <form onSubmit={handleSubmit} className="space-y-6">


 {/* SECTION 1 */}

 <div className="card-elevated p-6">

 <h3 className="text-lg font-semibold mb-4">

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
 placeholder="Description" className="mt-3"
 value={formData.descService}
 onChange={(e)=>setFormData({...formData,descService:e.target.value})}
 />

 </div>


 {/* SECTION 2 */}

 <div className="card-elevated p-6">

 <h3 className="text-lg font-semibold mb-4">

 Contact service

 </h3>

 <div className="grid md:grid-cols-2 gap-4">

 <Input
 placeholder="Contact service"
 value={formData.contactService}
 onChange={(e)=>setFormData({...formData,contactService:e.target.value})}
 />

 <Input
 placeholder="Adresse service"
 value={formData.adresseService}
 onChange={(e)=>setFormData({...formData,adresseService:e.target.value})}
 />

 </div>

 </div>


 {/* SECTION 3 */}

 <div className="card-elevated p-6">

 <h3 className="text-lg font-semibold mb-4">

 Chef du service

 </h3>

 <div className="grid md:grid-cols-2 gap-4">

 <Input
 placeholder="Statut chef"
 value={formData.statutChefService}
 onChange={(e)=>setFormData({...formData,statutChefService:e.target.value})}
 />

 <Input
 placeholder="Nom chef"
 value={formData.nomChefService}
 onChange={(e)=>setFormData({...formData,nomChefService:e.target.value})}
 />

 <Input
 placeholder="Grade chef"
 value={formData.gradeChefService}
 onChange={(e)=>setFormData({...formData,gradeChefService:e.target.value})}
 />

 <Input
 placeholder="Fonction chef"
 value={formData.fonctionChefService}
 onChange={(e)=>setFormData({...formData,fonctionChefService:e.target.value})}
 />

 </div>

 <Input
 placeholder="Contact chef" className="mt-3"
 value={formData.contactChefService}
 onChange={(e)=>setFormData({...formData,contactChefService:e.target.value})}
 />

 </div>


 {/* SECTION 4 */}

 <div className="card-elevated p-6">

 <h3 className="text-lg font-semibold mb-4">

 Service Parent

 </h3>

 <Select
 value={formData.serviceParentId}
 onValueChange={(value)=>setFormData({...formData,serviceParentId:value})}
 >

 <SelectTrigger>

 <SelectValue placeholder="Choisir service parent"/>

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


 {/* ================= TABLE ================= */}

 <div className="card-elevated p-8">

 <div className="flex justify-between items-center mb-6">

 <h2 className="text-xl font-bold">

 Liste des services

 </h2>

 <Badge>

 {filteredServices.length}

 </Badge>

 </div>

 {/* <Input
 placeholder="Rechercher..."
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 className="mb-6"
 /> */}

 <Input
 placeholder="Rechercher..."
 value={search}
 onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
 }}
 className="mb-6"
/>

 <DataTable
 columns={columns}
 data={paginatedData}
/>

{/* PAGINATION */}

<div className="flex justify-center mt-6 space-x-2">

<Button
 disabled={currentPage === 1}
 onClick={() => setCurrentPage((p) => p - 1)}
>
Précédent
</Button>

<span className="px-4 py-2 text-sm">

Page {currentPage} / {totalPages || 1}

</span>

<Button
 disabled={currentPage === totalPages || totalPages === 0}
 onClick={() => setCurrentPage((p) => p + 1)}
>
Suivant
</Button>

</div>


 </div>


 {/* ================= DELETE DIALOG ================= */}

 <Dialog open={openDialog} onOpenChange={setOpenDialog}>

 <DialogContent>

 <DialogHeader>

 <DialogTitle>

 Confirmer la suppression

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