import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import DataTable from "@/components/DataTable"

import { useEffect, useState, useMemo } from "react"

import { Edit, Trash2 } from "lucide-react"

import axios from "axios"

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast"

import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

const API_PERSONNEL = "http://localhost:5000/api/personnels"
const API_SERVICE = "http://localhost:5000/api/services"

const ITEMS_PER_PAGE = 5

interface ServiceType {
    id: number
    nomService: string
    sigleService: string
}

interface PersonnelType {
    id: number
    matricule: string
    prenom_personnel: string
    nom_personnel: string
    adresse_personnel: string
    contact_personnel: string
    image_personnel?: string
    service_id: number
    service?: ServiceType
}

const Personnel = () => {

    const [personnels, setPersonnels] = useState<PersonnelType[]>([])
    const [services, setServices] = useState<ServiceType[]>([])

    const [search, setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(1)

    const [editingId, setEditingId] = useState<number | null>(null)

    const [openDialog, setOpenDialog] = useState(false)

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const [preview, setPreview] = useState("")

    const [formData, setFormData] = useState({

        matricule: "",
        prenom_personnel: "",
        nom_personnel: "",
        adresse_personnel: "",
        contact_personnel: "",
        image_personnel: "",
        service_id: ""

    })

    const navigate = useNavigate()

    // ================= API =================

    const fetchPersonnels = async () => {

        try {

            const res = await axios.get(API_PERSONNEL)

            setPersonnels(res.data)

        } catch {

            notifyError("Impossible de charger les personnels")

        }

    }

    const fetchServices = async () => {

        const res = await axios.get(API_SERVICE)

        setServices(res.data)

    }

    useEffect(() => {

        fetchPersonnels()
        fetchServices()

    }, [])


    // ================= SEARCH =================

    const filtered = useMemo(() => {

        return personnels.filter((p) =>

            p.matricule.toLowerCase().includes(search.toLowerCase()) ||
            p.nom_personnel.toLowerCase().includes(search.toLowerCase())

        )

    }, [personnels, search])


    // ================= PAGINATION =================

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

    const paginated = useMemo(() => {

        const start = (currentPage - 1) * ITEMS_PER_PAGE

        return filtered.slice(start, start + ITEMS_PER_PAGE)

    }, [filtered, currentPage])


    // ================= TABLE COLUMNS =================

    const columns = [

        {
            header: "Photo",
            cell: ({ row }: any) => (

                <img
                    src={row.original.image_personnel || "/avatar.png"}
                    className="w-10 h-10 rounded-full object-cover"
                />

            )
        },

        {
            accessorKey: "matricule",
            header: "Matricule"
        },

        {
            header: "Nom complet",
            cell: ({ row }: any) => (
                `${row.original.prenom_personnel} ${row.original.nom_personnel}`
            )
        },

        {
            header: "Service",
            cell: ({ row }: any) => {

                const service = row.original.service

                return (

                    <div className="flex gap-2">

                        <Badge variant="outline">
                            {service?.sigleService}
                        </Badge>

                        <span className="text-sm">
                            {service?.nomService}
                        </span>

                    </div>

                )

            }
        },

        {
            header: "Actions",
            cell: ({ row }: any) => {

                const personnel = row.original

                return (

                <div className="flex gap-2 justify-center">

                    {/* VOIR PROFIL */}

                    <button
                    onClick={() => navigate(`/personnel/${personnel.id}`)}
                    className="p-1 hover:bg-muted rounded text-blue-600"
                    >
                    <Eye size={16} />
                    </button>

                    {/* EDIT */}

                    <button
                    onClick={() => handleEdit(personnel)}
                    className="p-1 hover:bg-muted rounded text-yellow-600"
                    >
                    <Edit size={16} />
                    </button>

                    {/* DELETE */}

                    <button
                    onClick={() => confirmDelete(personnel.id)}
                    className="p-1 hover:bg-muted rounded text-red-600"
                    >
                    <Trash2 size={16} />
                    </button>

                </div>

                )
            }
            }

        // {
        //     header: "Actions",
        //     cell: ({ row }: any) => {
        //         const personnel = row.original
        //         return (
        //             <div className="flex gap-2 justify-center">
        //                 <button
        //                     onClick={() => handleEdit(personnel)}
        //                     className="p-1 hover:bg-muted rounded text-yellow-600"
        //                 >
        //                     <Edit size={16} />
        //                 </button>

        //                 <button
        //                     onClick={() => confirmDelete(personnel.id)}
        //                     className="p-1 hover:bg-muted rounded text-red-600"
        //                 >
        //                     <Trash2 size={16} />
        //                 </button>

        //             </div>

        //         )
        //     }
        // }

    ]


    // ================= IMAGE =================

    const handleImage = (e: any) => {

        const file = e.target.files[0]

        if (!file) return

        const url = URL.createObjectURL(file)

        setPreview(url)

        setFormData({ ...formData, image_personnel: url })

    }


    // ================= SUBMIT =================

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!formData.matricule || !formData.service_id) {

            notifyWarning("Matricule et service obligatoires")

            return

        }

        try {

            const payload = {

                ...formData,

                service_id: Number(formData.service_id)

            }

            if (editingId) {

                await axios.put(`${API_PERSONNEL}/${editingId}`, payload)

                notifySuccess("Personnel modifié")

            } else {

                await axios.post(API_PERSONNEL, payload)

                notifySuccess("Personnel ajouté")

            }

            setFormData({

                matricule: "",
                prenom_personnel: "",
                nom_personnel: "",
                adresse_personnel: "",
                contact_personnel: "",
                image_personnel: "",
                service_id: ""

            })

            setPreview("")

            setEditingId(null)

            fetchPersonnels()

        } catch {

            notifyError("Erreur enregistrement")

        }

    }


    // ================= EDIT =================

    const handleEdit = (p: PersonnelType) => {

        setFormData({

            matricule: p.matricule,
            prenom_personnel: p.prenom_personnel,
            nom_personnel: p.nom_personnel,
            adresse_personnel: p.adresse_personnel,
            contact_personnel: p.contact_personnel,
            image_personnel: p.image_personnel || "",
            service_id: String(p.service_id)

        })

        setPreview(p.image_personnel || "")

        setEditingId(p.id)

        window.scrollTo({ top: 0, behavior: "smooth" })

    }


    // ================= DELETE =================

    const confirmDelete = (id: number) => {

        setSelectedId(id)

        setOpenDialog(true)

    }

    const handleDelete = async () => {

        if (!selectedId) return

        await axios.delete(`${API_PERSONNEL}/${selectedId}`)

        notifySuccess("Personnel supprimé")

        fetchPersonnels()

        setOpenDialog(false)

    }


    // ================= UI =================

    return (

        <div className="min-h-screen flex flex-col">

            <Header />

            <main className="flex-1 pt-20">

                <section className="py-16">

                    <div className="container mx-auto max-w-6xl space-y-10">

                        {/* FORM */}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="card-elevated p-6">

                                <h3 className="text-lg font-semibold mb-4">

                                    Informations personnel

                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">

                                    <Input
                                        placeholder="Matricule"
                                        value={formData.matricule}
                                        onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                                    />

                                    <Input
                                        placeholder="Prenom"
                                        value={formData.prenom_personnel}
                                        onChange={(e) => setFormData({ ...formData, prenom_personnel: e.target.value })}
                                    />

                                    <Input
                                        placeholder="Nom"
                                        value={formData.nom_personnel}
                                        onChange={(e) => setFormData({ ...formData, nom_personnel: e.target.value })}
                                    />

                                    <Input
                                        placeholder="Contact"
                                        value={formData.contact_personnel}
                                        onChange={(e) => setFormData({ ...formData, contact_personnel: e.target.value })}
                                    />

                                </div>

                                <Input
                                    placeholder="Adresse"
                                    className="mt-3"
                                    value={formData.adresse_personnel}
                                    onChange={(e) => setFormData({ ...formData, adresse_personnel: e.target.value })}
                                />

                            </div>


                            {/* SERVICE */}

                            <div className="card-elevated p-6">

                                <h3 className="text-lg font-semibold mb-4">

                                    Service

                                </h3>

                                <Select
                                    value={formData.service_id}
                                    onValueChange={(v) => setFormData({ ...formData, service_id: v })}
                                >

                                    <SelectTrigger>

                                        <SelectValue placeholder="Choisir service" />

                                    </SelectTrigger>

                                    <SelectContent>

                                        {services.map((s) => (

                                            <SelectItem key={s.id} value={String(s.id)}>

                                                {s.sigleService} - {s.nomService}

                                            </SelectItem>

                                        ))}

                                    </SelectContent>

                                </Select>

                            </div>


                            {/* IMAGE */}

                            <div className="card-elevated p-6">

                                <h3 className="text-lg font-semibold mb-4">

                                    Photo

                                </h3>

                                <Input type="file" onChange={handleImage} />

                                {preview && (

                                    <img
                                        src={preview}
                                        className="mt-3 w-20 h-20 rounded-full"
                                    />

                                )}

                            </div>


                            <Button type="submit">

                                {editingId ? "Mettre à jour" : "Ajouter"}

                            </Button>

                        </form>


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

                            <Input
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="mb-6"
                            />

                            <DataTable
                                columns={columns}
                                data={paginated}
                            />

                            <div className="flex justify-center mt-6 gap-3">

                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >

                                    Précédent

                                </Button>

                                <span>

                                    Page {currentPage} / {totalPages || 1}

                                </span>

                                <Button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >

                                    Suivant

                                </Button>

                            </div>

                        </div>


                        {/* DELETE */}

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
                                        onClick={() => setOpenDialog(false)}
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

            <Footer />

        </div>

    )

}

export default Personnel