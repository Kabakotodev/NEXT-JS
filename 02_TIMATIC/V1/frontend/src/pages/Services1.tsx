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
  DialogFooter,
} from "@/components/ui/dialog";

import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const API_URL = "http://localhost:5000/api/services";
const SERVICE_PARENT_API = "http://localhost:5000/api/service-parents";

const ITEMS_PER_PAGE = 5;

interface ServiceParentType {
  id: number;
  nomServiceParent: string;
}

interface ServiceType {
  id: number;
  nomService: string;
  sigleService: string;
  descService: string;

  contactService: string;
  adresseService: string;

  statutChefService: string;
  nomChefService: string;
  gradeChefService: string;
  fonctionChefService: string;
  contactChefService: string;

  serviceParentId: number;
  serviceParent?: ServiceParentType;
}

const Service = () => {

  const [services, setServices] = useState<ServiceType[]>([]);
  const [serviceParents, setServiceParents] = useState<ServiceParentType[]>([]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({

    nomService: "",
    sigleService: "",
    descService: "",

    contactService: "",
    adresseService: "",

    statutChefService: "",
    nomChefService: "",
    gradeChefService: "",
    fonctionChefService: "",
    contactChefService: "",

    serviceParentId: ""
  });

  // ================= LOAD SERVICES =================

  const fetchServices = async () => {

    try {

      const res = await axios.get(API_URL);

      setServices(res.data);

    } catch {

      notifyError("Impossible de charger les services");

    }
  };

  // ================= LOAD SERVICE PARENTS =================

  const fetchServiceParents = async () => {

    try {

      const res = await axios.get(SERVICE_PARENT_API);

      setServiceParents(res.data);

    } catch {

      notifyError("Impossible de charger les services parents");

    }
  };

  useEffect(() => {

    fetchServices();
    fetchServiceParents();

  }, []);

  // ================= SEARCH =================

  const filteredData = useMemo(() => {

    return services.filter((s) =>
      s.nomService.toLowerCase().includes(search.toLowerCase()) ||
      s.sigleService.toLowerCase().includes(search.toLowerCase())
    );

  }, [services, search]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {

    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredData.slice(start, start + ITEMS_PER_PAGE);

  }, [filteredData, currentPage]);

  // ================= SUBMIT =================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!formData.nomService || !formData.serviceParentId) {
      notifyWarning("Nom service et Service parent obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {

      const payload = {
        ...formData,
        serviceParentId: Number(formData.serviceParentId)
      };

      if (editingId) {

        await axios.put(`${API_URL}/${editingId}`, payload);

        notifySuccess("Service modifié");

      } else {

        await axios.post(API_URL, payload);

        notifySuccess("Service ajouté");

      }

      setFormData({
        nomService: "",
        sigleService: "",
        descService: "",
        contactService: "",
        adresseService: "",
        statutChefService: "",
        nomChefService: "",
        gradeChefService: "",
        fonctionChefService: "",
        contactChefService: "",
        serviceParentId: ""
      });

      setEditingId(null);

      fetchServices();

    } catch {

      notifyError("Erreur lors de l'enregistrement");

    } finally {

      setIsSubmitting(false);

    }
  };

  // ================= EDIT =================

  const handleEdit = (service: ServiceType) => {

    setFormData({

      ...service,
      serviceParentId: String(service.serviceParentId)

    });

    setEditingId(service.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================

  const confirmDelete = (id: number) => {

    setSelectedId(id);
    setOpenDialog(true);

  };

  const handleDelete = async () => {

    if (!selectedId) return;

    try {

      await axios.delete(`${API_URL}/${selectedId}`);

      notifySuccess("Service supprimé");

      fetchServices();

    } catch {

      notifyError("Impossible de supprimer");

    } finally {

      setOpenDialog(false);
      setSelectedId(null);

    }
  };

  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 pt-20">

        <section className="py-16 bg-background">

          <div className="container mx-auto px-4 max-w-6xl">

            {/* FORM */}

            <div className="card-elevated p-8 mb-10">

              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Modifier service" : "Ajouter service"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <Input
                    placeholder="Nom service"
                    value={formData.nomService}
                    onChange={(e) =>
                      setFormData({ ...formData, nomService: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Sigle"
                    value={formData.sigleService}
                    onChange={(e) =>
                      setFormData({ ...formData, sigleService: e.target.value })
                    }
                  />

                </div>

                <Textarea
                  placeholder="Description"
                  rows={4}
                  value={formData.descService}
                  onChange={(e) =>
                    setFormData({ ...formData, descService: e.target.value })
                  }
                />

                {/* SELECT SERVICE PARENT */}

                <select
                  className="w-full border rounded-lg p-3"
                  value={formData.serviceParentId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceParentId: e.target.value })
                  }
                >

                  <option value="">Choisir service parent</option>

                  {serviceParents.map((sp) => (

                    <option key={sp.id} value={sp.id}>
                      {sp.nomServiceParent}
                    </option>

                  ))}

                </select>

                <Button type="submit">
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>

              </form>

            </div>

            {/* TABLE */}

            <div className="card-elevated p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">
                  Liste des services
                </h2>

                <Badge variant="secondary">
                  {filteredData.length} élément(s)
                </Badge>

              </div>

              <Input
                placeholder="Rechercher..."
                className="mb-6"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <table className="w-full text-sm border-collapse text-center">

                <thead>

                  <tr className="border-b">

                    <th className="p-3">NOM</th>
                    <th className="p-3">SIGLE</th>
                    <th className="p-3">SERVICE PARENT</th>
                    <th className="p-3">ACTIONS</th>

                  </tr>

                </thead>

                <tbody>

                  {paginatedData.map((service) => (

                    <tr key={service.id} className="border-b hover:bg-muted/40">

                      <td className="p-3">{service.nomService}</td>

                      <td className="p-3">{service.sigleService}</td>

                      <td className="p-3">
                        {service.serviceParent?.nomServiceParent}
                      </td>

                      <td className="p-3 space-x-2">

                        <button
                          onClick={() => handleEdit(service)}
                          className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => confirmDelete(service.id)}
                          className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* DELETE DIALOG */}

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

              <DialogContent>

                <DialogHeader>

                  <DialogTitle>Confirmer suppression</DialogTitle>

                  <DialogDescription>
                    Cette action est irréversible
                  </DialogDescription>

                </DialogHeader>

                <DialogFooter className="mt-4">

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
  );
};

export default Service;