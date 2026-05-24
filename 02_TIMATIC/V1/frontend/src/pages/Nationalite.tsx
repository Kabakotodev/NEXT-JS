import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const API_URL = "http://localhost:5000/api/nationalites";
const ITEMS_PER_PAGE = 10;

interface NationaliteType {
  id: number;
  nomPays: string;
  codePays: string;
  nationaliteFr: string;
  nationaliteEn: string;
}

const Nationalite = () => {
  const [nationalites, setNationalites] = useState<NationaliteType[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    nomPays: "",
    codePays: "",
    nationaliteFr: "",
    nationaliteEn: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ================= LOAD =================
  const fetchNationalites = async () => {
    try {
      const res = await axios.get(API_URL);
      setNationalites(res.data);
    } catch {
      notifyError("Impossible de charger les nationalités");
    }
  };

  useEffect(() => {
    fetchNationalites();
  }, []);

  // ================= SEARCH =================
  const filteredNationalites = useMemo(() => {
    return nationalites.filter((n) =>
      n.nomPays.toLowerCase().includes(search.toLowerCase()) ||
      n.codePays.toLowerCase().includes(search.toLowerCase())
    );
  }, [nationalites, search]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredNationalites.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNationalites.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNationalites, currentPage]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomPays || !formData.codePays) {
      notifyWarning("Nom pays et Code pays sont obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        notifySuccess("Nationalité modifiée avec succès");
      } else {
        await axios.post(API_URL, formData);
        notifySuccess("Nationalité ajoutée avec succès");
      }

      setFormData({
        nomPays: "",
        codePays: "",
        nationaliteFr: "",
        nationaliteEn: "",
      });

      setEditingId(null);
      fetchNationalites();
    } catch {
      notifyError("Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (n: NationaliteType) => {
    setFormData(n);
    setEditingId(n.id);
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
      notifySuccess("Nationalité supprimée avec succès");
      fetchNationalites();
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
          <div className="container mx-auto px-4 max-w-7xl">

            {/* ================= FORM ================= */}
            <div className="card-elevated p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Modifier nationalité" : "Ajouter nationalité"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nom Pays + Code Pays sur la même ligne */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Nom du pays"
                    required
                    value={formData.nomPays}
                    onChange={(e) =>
                      setFormData({ ...formData, nomPays: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Code pays (OACI)"
                    required
                    value={formData.codePays}
                    onChange={(e) =>
                      setFormData({ ...formData, codePays: e.target.value })
                    }
                  />
                </div>

                {/* Nationalité FR / EN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Nationalité (Français)"
                    value={formData.nationaliteFr}
                    onChange={(e) =>
                      setFormData({ ...formData, nationaliteFr: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Nationality (English)"
                    value={formData.nationaliteEn}
                    onChange={(e) =>
                      setFormData({ ...formData, nationaliteEn: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
              </form>
            </div>

            {/* ================= TABLE ================= */}
            <div className="card-elevated p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Liste des nationalités
                </h2>

                <Badge variant="secondary">
                  {filteredNationalites.length} élément(s)
                </Badge>
              </div>

              <Input
                placeholder="Rechercher par pays ou code..."
                className="mb-6"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-semibold">PAYS</th>
                    <th className="text-left p-3 font-semibold">CODE</th>
                    <th className="text-left p-3 font-semibold">NATIONALITÉ (FR)</th>
                    <th className="text-left p-3 font-semibold">NATIONALITY (EN)</th>
                    <th className="text-center p-3 font-semibold">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((n) => (
                    <tr
                      key={n.id}
                      className="border-b odd:bg-muted/20 hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-2">{n.nomPays}</td>
                      <td className="p-2">{n.codePays}</td>
                      <td className="p-2">{n.nationaliteFr}</td>
                      <td className="p-2">{n.nationaliteEn}</td>
                      <td className="p-2 text-center space-x-2">
                        {/* <Button size="sm" onClick={() => handleEdit(n)}>
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => confirmDelete(n.id)}
                        >
                          <Trash size={16} />
                        </Button> */}

                        <button onClick={() => handleEdit(n)}
                                                className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                                              >
                                                <Edit className="w-4 h-4" />
                                              </button>
                                              <button
                                                  onClick={() => confirmDelete(n.id)}
                                                className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>

                      </td>
                    </tr>
                  ))}

                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-muted-foreground">
                        Aucune nationalité trouvée
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

export default Nationalite;