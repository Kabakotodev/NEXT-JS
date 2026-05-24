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
import { Edit, Pencil, Trash, Trash2 } from "lucide-react";
import axios from "axios";

// ✅ Toast personnalisé
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const API_URL = "http://localhost:5000/api/categories";
const ITEMS_PER_PAGE = 5;

interface CategorieType {
  id: number;
  nomCategorie: string;
  descCategorie: string;
}

const Categorie = () => {
  const [categories, setCategories] = useState<CategorieType[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    nomCategorie: "",
    descCategorie: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ================= LOAD DATA =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch {
      notifyError("Impossible de charger les catégories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= SEARCH =================
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.nomCategorie.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCategories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCategories, currentPage]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomCategorie || !formData.descCategorie) {
      notifyWarning("Tous les champs sont obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        notifySuccess("Catégorie modifiée avec succès");
      } else {
        await axios.post(API_URL, formData);
        notifySuccess("Catégorie ajoutée avec succès");
      }

      setFormData({ nomCategorie: "", descCategorie: "" });
      setEditingId(null);
      fetchCategories();
    } catch {
      notifyError("Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (cat: CategorieType) => {
    setFormData({
      nomCategorie: cat.nomCategorie,
      descCategorie: cat.descCategorie,
    });
    setEditingId(cat.id);
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
      notifySuccess("Catégorie supprimée avec succès");
      fetchCategories();
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

            {/* ================= FORM ================= */}
            <div className="card-elevated p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Modifier catégorie" : "Ajouter catégorie"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <Input
                  placeholder="Nom catégorie"
                  required
                  value={formData.nomCategorie}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomCategorie: e.target.value,
                    })
                  }
                />

                <Textarea
                  placeholder="Description"
                  required
                  rows={4}
                  value={formData.descCategorie}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descCategorie: e.target.value,
                    })
                  }
                />

                <Button type="submit" disabled={isSubmitting}>
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
              </form>
            </div>

            {/* ================= TABLE ================= */}
            <div className="card-elevated p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Liste des catégories
                </h2>

                <Badge variant="secondary">
                  {filteredCategories.length} élément(s)
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
                    <th className="text-center p-3">CATEGORIE</th>
                    <th className="text-center p-3">DESCRIPTION</th>
                    <th className="text-center p-3">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((cat) => (
                    <tr key={cat.id} className="border-b hover:bg-muted/40">
                      <td className="p-3">{cat.nomCategorie}</td>
                      <td className="p-3">{cat.descCategorie}</td>
                      <td className="p-3 text-center space-x-2">
                        {/* <Button size="sm" onClick={() => handleEdit(cat)}>
                          <Pencil size={16} />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => confirmDelete(cat.id)}
                        >
                          <Trash size={16} />
                        </Button> */}

                        <button onClick={() => handleEdit(cat)}
                        className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                          onClick={() => confirmDelete(cat.id)}
                        className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      </td>
                    </tr>
                  ))}

                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center p-6 text-muted-foreground">
                        Aucune catégorie trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
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

            {/* ================= DIALOG ================= */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer la suppression</DialogTitle>
                  <DialogDescription>
                    Cette action est irréversible. Voulez-vous continuer ?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                  <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                    Annuler
                  </Button>

                  <Button variant="destructive" onClick={handleDelete}>
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

export default Categorie;