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

const API_URL = "http://localhost:5000/api/roles";

const ITEMS_PER_PAGE = 5;

interface RoleType {
  id: number;
  nomRole: string;
  descRole: string;
}

const Role = () => {

  const [roles, setRoles] = useState<RoleType[]>([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    nomRole: "",
    descRole: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);


  // ================= LOAD =================

  const fetchRoles = async () => {
    try {
      const res = await axios.get(API_URL);
      setRoles(res.data);
    } catch {
      notifyError("Impossible de charger les rôles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);


  // ================= SEARCH =================

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.nomRole.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);


  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {

    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredRoles.slice(start, start + ITEMS_PER_PAGE);

  }, [filteredRoles, currentPage]);


  // ================= SUBMIT =================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!formData.nomRole) {
      notifyWarning("Nom du rôle obligatoire");
      return;
    }

    setIsSubmitting(true);

    try {

      if (editingId) {

        await axios.put(`${API_URL}/${editingId}`, formData);

        notifySuccess("Rôle modifié avec succès");

      } else {

        await axios.post(API_URL, formData);

        notifySuccess("Rôle ajouté avec succès");

      }

      setFormData({
        nomRole: "",
        descRole: "",
      });

      setEditingId(null);

      fetchRoles();

    } catch {

      notifyError("Erreur lors de l'enregistrement");

    } finally {

      setIsSubmitting(false);

    }
  };


  // ================= EDIT =================

  const handleEdit = (role: RoleType) => {

    setFormData({
      nomRole: role.nomRole,
      descRole: role.descRole,
    });

    setEditingId(role.id);

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

      notifySuccess("Rôle supprimé avec succès");

      fetchRoles();

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

                {editingId ? "Modifier rôle" : "Ajouter rôle"}

              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">


                <Input
                  placeholder="Nom du rôle"
                  required
                  value={formData.nomRole}
                  onChange={(e) =>
                    setFormData({ ...formData, nomRole: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Description du rôle"
                  rows={4}
                  value={formData.descRole}
                  onChange={(e) =>
                    setFormData({ ...formData, descRole: e.target.value })
                  }
                />

                <Button type="submit" disabled={isSubmitting}>
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>

              </form>

            </div>


            {/* TABLE */}

            <div className="card-elevated p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">
                  Liste des rôles
                </h2>

                <Badge variant="secondary">
                  {filteredRoles.length} élément(s)
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

                    <th className="p-3 font-semibold">ROLE</th>

                    <th className="p-3 font-semibold">DESCRIPTION</th>

                    <th className="p-3 font-semibold">ACTIONS</th>

                  </tr>

                </thead>

                <tbody>

                  {paginatedData.map((role) => (

                    <tr key={role.id} className="border-b hover:bg-muted/40">

                      <td className="p-3">{role.nomRole}</td>

                      <td className="p-3">{role.descRole}</td>

                      <td className="p-3 text-center space-x-2">

                        <button
                          onClick={() => handleEdit(role)}
                          className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => confirmDelete(role.id)}
                          className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>


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


            {/* DIALOG DELETE */}

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

export default Role;