import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useEffect,useState } from "react"

import axios from "axios"

import { useParams } from "react-router-dom"

import { QRCodeCanvas } from "qrcode.react"

const API="http://localhost:5000/api/personnels"

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
contact_personnel:string
adresse_personnel:string
image_personnel?:string
service?:ServiceType
}

const PersonnelProfil=()=>{

const {id}=useParams()

const [personnel,setPersonnel]=useState<PersonnelType|null>(null)

const fetchPersonnel=async()=>{

const res=await axios.get(`${API}/${id}`)

setPersonnel(res.data)

}

useEffect(()=>{

fetchPersonnel()

},[])

if(!personnel) return null

// données dans le QR CODE
const qrData=JSON.stringify({

matricule:personnel.matricule,
prenom:personnel.prenom_personnel,
nom:personnel.nom_personnel,
contact:personnel.contact_personnel,
service:personnel.service?.nomService

})

return(

<div className="min-h-screen flex flex-col">

<Header/>

<main className="flex-1 pt-20">

<section className="py-16">

<div className="container mx-auto max-w-4xl">

<div className="card-elevated p-10">

<div className="grid md:grid-cols-2 gap-10 items-center">

{/* PHOTO + INFOS */}

<div className="text-center">

<img
src={personnel.image_personnel || "/avatar.png"}
className="w-40 h-40 mx-auto rounded-full object-cover"
/>

<div className="mt-6 space-y-2">

<h2 className="text-xl font-bold">

{personnel.prenom_personnel} {personnel.nom_personnel}

</h2>

<p>

Matricule : <Badge>{personnel.matricule}</Badge>

</p>

<p>

Contact : {personnel.contact_personnel}

</p>

<p>

Service :

<Badge variant="outline" className="ml-2">

{personnel.service?.sigleService}

</Badge>

</p>

</div>

</div>


{/* QR CODE */}

<div className="text-center">

<h3 className="font-semibold mb-4">

QR Code Personnel

</h3>

<QRCodeCanvas
value={qrData}
size={200}
/>

<p className="text-sm mt-4 text-muted-foreground">

Scanner pour voir les informations

</p>

</div>

</div>

</div>

</div>

</section>

</main>

<Footer/>

</div>

)

}

export default PersonnelProfil