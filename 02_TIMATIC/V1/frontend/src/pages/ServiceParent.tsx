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

import DataTable from "@/components/DataTable";

import { useState, useEffect, useMemo } from "react";

import { Edit, Trash2 } from "lucide-react";

import axios from "axios";

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const ITEMS_PER_PAGE = 5;

const API_URL = "http://localhost:5000/api/service-parents";

interface ServiceParentType {
  id: number

  nomServiceParent: string
  sigleServiceParent: string
  descServiceParent: string

  contactServiceParent?: string
  adresseServiceParent?: string

  statutChefServiceParent: string
  nomChefServiceParent: string
  gradeChefServiceParent: string
  fonctionChefServiceParent: string
  contactChefServiceParent: string
}

const ServiceParent = () => {

  const [serviceParents, setServiceParents] = useState<ServiceParentType[]>([])

  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)

  const [editingId, setEditingId] = useState<number | null>(null)

  const [openDialog, setOpenDialog] = useState(false)

  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [formData, setFormData] = useState({

    nomServiceParent: "",
    sigleServiceParent: "",
    descServiceParent: "",

    contactServiceParent: "",
    adresseServiceParent: "",

    statutChefServiceParent: "",
    nomChefServiceParent: "",
    gradeChefServiceParent: "",
    fonctionChefServiceParent: "",
    contactChefServiceParent: ""

  })


  // ================= API =================

  const fetchServiceParents = async () => {

    try {

      const res = await axios.get(API_URL)

      setServiceParents(res.data)

    } catch {

      notifyError("Impossible de charger les services parents")

    }

  }

  useEffect(() => {

    fetchServiceParents()

  }, [])


  // ================= SEARCH =================

  const filteredData = useMemo(() => {

    return serviceParents.filter((sp) =>
      sp.nomServiceParent.toLowerCase().includes(search.toLowerCase()) ||
      sp.sigleServiceParent.toLowerCase().includes(search.toLowerCase())
    )

  }, [serviceParents, search])


  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const paginatedData = useMemo(() => {

    const start = (currentPage - 1) * ITEMS_PER_PAGE

    return filteredData.slice(start, start + ITEMS_PER_PAGE)

  }, [filteredData, currentPage])


  // ================= TABLE COLUMNS =================

  const columns = [

    {
      accessorKey: "nomServiceParent",
      header: "Service Parent"
    },

    {
      accessorKey: "sigleServiceParent",
      header: "Sigle"
    },

    {
      accessorKey: "nomChefServiceParent",
      header: "Chef"
    },

    {
      header: "Actions",
      cell: ({ row }: any) => {

        const serviceParent = row.original

        return (

          <div className="flex gap-2 justify-center">

            <button
              onClick={() => handleEdit(serviceParent)}
              className="p-1 hover:bg-muted rounded text-yellow-600"
            >
              <Edit size={16} />
            </button>

            <button
              onClick={() => confirmDelete(serviceParent.id)}
              className="p-1 hover:bg-muted rounded text-red-600"
            >
              <Trash2 size={16} />
            </button>

          </div>

        )

      }
    }

  ]


  // ================= SUBMIT =================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!formData.nomServiceParent) {

      notifyWarning("Nom du service parent obligatoire")

      return

    }

    try {

      if (editingId) {

        await axios.put(`${API_URL}/${editingId}`, formData)

        notifySuccess("Service parent modifié")

      } else {

        await axios.post(API_URL, formData)

        notifySuccess("Service parent ajouté")

      }

      setFormData({

        nomServiceParent: "",
        sigleServiceParent: "",
        descServiceParent: "",

        contactServiceParent: "",
        adresseServiceParent: "",

        statutChefServiceParent: "",
        nomChefServiceParent: "",
        gradeChefServiceParent: "",
        fonctionChefServiceParent: "",
        contactChefServiceParent: ""

      })

      setEditingId(null)

      fetchServiceParents()

    } catch {

      notifyError("Erreur lors de l'enregistrement")

    }

  }


  // ================= EDIT =================

  const handleEdit = (serviceParent: ServiceParentType) => {

    setFormData({

      nomServiceParent: serviceParent.nomServiceParent,
      sigleServiceParent: serviceParent.sigleServiceParent,
      descServiceParent: serviceParent.descServiceParent,

      contactServiceParent: serviceParent.contactServiceParent || "",
      adresseServiceParent: serviceParent.adresseServiceParent || "",

      statutChefServiceParent: serviceParent.statutChefServiceParent,
      nomChefServiceParent: serviceParent.nomChefServiceParent,
      gradeChefServiceParent: serviceParent.gradeChefServiceParent,
      fonctionChefServiceParent: serviceParent.fonctionChefServiceParent,
      contactChefServiceParent: serviceParent.contactChefServiceParent

    })

    setEditingId(serviceParent.id)

    window.scrollTo({ top: 0, behavior: "smooth" })

  }


  // ================= DELETE =================

  const confirmDelete = (id: number) => {

    setSelectedId(id)

    setOpenDialog(true)

  }

  const handleDelete = async () => {

    if (!selectedId) return

    try {

      await axios.delete(`${API_URL}/${selectedId}`)

      notifySuccess("Service parent supprimé")

      fetchServiceParents()

    } catch {

      notifyError("Impossible de supprimer")

    }

    setOpenDialog(false)

  }


  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 pt-20">

        <section className="py-16">

          <div className="container mx-auto max-w-6xl space-y-10">


            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit} className="space-y-6">


              {/* SECTION 1 */}

              <div className="card-elevated p-6">

                <h3 className="text-lg font-semibold mb-4">

                  Informations service parent

                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <Input
                    placeholder="Nom service parent"
                    value={formData.nomServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, nomServiceParent: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Sigle"
                    value={formData.sigleServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, sigleServiceParent: e.target.value })
                    }
                  />

                </div>

                <Textarea
                  placeholder="Description"
                  className="mt-3"
                  value={formData.descServiceParent}
                  onChange={(e) =>
                    setFormData({ ...formData, descServiceParent: e.target.value })
                  }
                />

              </div>


              {/* SECTION 2 */}

              <div className="card-elevated p-6">

                <h3 className="text-lg font-semibold mb-4">

                  Contact

                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <Input
                    placeholder="Contact"
                    value={formData.contactServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, contactServiceParent: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Adresse"
                    value={formData.adresseServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, adresseServiceParent: e.target.value })
                    }
                  />

                </div>

              </div>


              {/* SECTION 3 */}

              <div className="card-elevated p-6">

                <h3 className="text-lg font-semibold mb-4">

                  Chef du service parent

                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <Input
                    placeholder="Statut"
                    value={formData.statutChefServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, statutChefServiceParent: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Nom chef"
                    value={formData.nomChefServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, nomChefServiceParent: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Grade"
                    value={formData.gradeChefServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, gradeChefServiceParent: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Fonction"
                    value={formData.fonctionChefServiceParent}
                    onChange={(e) =>
                      setFormData({ ...formData, fonctionChefServiceParent: e.target.value })
                    }
                  />

                </div>

                <Input
                  placeholder="Contact chef"
                  className="mt-3"
                  value={formData.contactChefServiceParent}
                  onChange={(e) =>
                    setFormData({ ...formData, contactChefServiceParent: e.target.value })
                  }
                />

              </div>


              <Button type="submit">

                {editingId ? "Mettre à jour" : "Ajouter"}

              </Button>

            </form>


            {/* ================= TABLE ================= */}

            <div className="card-elevated p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">

                  Liste des services parents

                </h2>

                <Badge>

                  {filteredData.length}

                </Badge>

              </div>

              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="mb-6"
              />

              <DataTable
                columns={columns}
                data={paginatedData}
              />


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


            {/* DELETE DIALOG */}

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

export default ServiceParent