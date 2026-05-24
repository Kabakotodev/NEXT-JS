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
import axios from "axios";
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

const API_REGIME = "http://localhost:5000/api/regimes";
const API_DOCUMENT = "http://localhost:5000/api/documents";
const API_CATEGORIE = "http://localhost:5000/api/categories";
const API_NATIONALITE = "http://localhost:5000/api/nationalites";

interface RegimeType {
  id: number;
  nomRegime: string;
  nationalites: any[];
}

const Regime = () => {

  const [regimes, setRegimes] = useState<RegimeType[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [nationalites, setNationalites] = useState<any[]>([]);

  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedNationalites, setSelectedNationalites] = useState<number[]>([]);

  const [nationaliteSearch, setNationaliteSearch] = useState("");

  const [selectedRegimes, setSelectedRegimes] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    nomRegime: "",
    descRegime: "",
    objetRegime: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // ================= LOAD =================
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [r, d, c, n] = await Promise.all([
        axios.get(API_REGIME),
        axios.get(API_DOCUMENT),
        axios.get(API_CATEGORIE),
        axios.get(API_NATIONALITE),
      ]);

      setRegimes(r.data);
      setDocuments(d.data);
      setCategories(c.data);
      setNationalites(n.data);
    } catch {
      notifyError("Erreur chargement données");
    }
  };

  // ================= NATIONALITE FILTER =================
  const filteredNationalites = useMemo(() => {
    return nationalites.filter((n) =>
      n.nomPays.toLowerCase().includes(nationaliteSearch.toLowerCase())
    );
  }, [nationalites, nationaliteSearch]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.nomRegime) {
      notifyWarning("Nom régime obligatoire");
      return;
    }

    try {
      const payload = {
        ...formData,
        documentIds: selectedDocuments,
        categorieIds: selectedCategories,
        nationaliteIds: selectedNationalites,
      };

      if (editingId) {
        await axios.put(`${API_REGIME}/${editingId}`, payload);
        notifySuccess("Régime modifié");
      } else {
        await axios.post(API_REGIME, payload);
        notifySuccess("Régime ajouté");
      }

      resetForm();
      fetchAll();
    } catch {
      notifyError("Erreur enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({
      nomRegime: "",
      descRegime: "",
      objetRegime: "",
    });
    setSelectedDocuments([]);
    setSelectedCategories([]);
    setSelectedNationalites([]);
    setEditingId(null);
  };

  // ================= DELETE MULTIPLE =================
  const deleteMultiple = async () => {
    if (selectedRegimes.length === 0) {
      notifyWarning("Aucun régime sélectionné");
      return;
    }

    try {
      await axios.post(`${API_REGIME}/bulk-delete`, {
        ids: selectedRegimes,
      });

      notifySuccess("Suppression effectuée");
      setSelectedRegimes([]);
      setOpenDialog(false);
      fetchAll();
    } catch {
      notifyError("Erreur suppression");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">

            {/* ================= FORM ================= */}
            <div className="card-elevated p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Modifier Régime" : "Ajouter Régime"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <Input
                  placeholder="Nom Régime"
                  value={formData.nomRegime}
                  onChange={(e) =>
                    setFormData({ ...formData, nomRegime: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Description"
                  value={formData.descRegime}
                  onChange={(e) =>
                    setFormData({ ...formData, descRegime: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Objet du régime"
                  value={formData.objetRegime}
                  onChange={(e) =>
                    setFormData({ ...formData, objetRegime: e.target.value })
                  }
                />

                {/* ================= DOCUMENTS ================= */}
                <div>
                  <p className="font-semibold mb-2">Documents</p>
                  {documents.map((doc) => (
                    <label key={doc.id} className="block text-sm">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedDocuments([...selectedDocuments, doc.id])
                            : setSelectedDocuments(
                                selectedDocuments.filter((id) => id !== doc.id)
                              )
                        }
                      />{" "}
                      {doc.nomDocument}
                    </label>
                  ))}
                </div>

                {/* ================= CATEGORIES ================= */}
                {/* <div>
                  <p className="font-semibold mb-2">Catégories XX</p>
                  {categories.map((cat) => (
                    <label key={cat.id} className="block text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedCategories([...selectedCategories, cat.id])
                            : setSelectedCategories(
                                selectedCategories.filter((id) => id !== cat.id)
                              )
                        }
                      />{" "}
                      {cat.nomCategorie}
                    </label>
                  ))}
                </div> */}

                {/* ================= NATIONALITES MULTI SELECT ================= */}
                <div>
                  <p className="font-semibold mb-2">Nationalités</p>

                  <Input
                    placeholder="Rechercher nationalité..."
                    value={nationaliteSearch}
                    onChange={(e) => setNationaliteSearch(e.target.value)}
                  />

                  <div className="max-h-40 overflow-y-auto border rounded p-2 mt-2 space-y-1">
                    {filteredNationalites.map((n) => (
                      <label key={n.id} className="block text-sm">
                        <input
                          type="checkbox"
                          checked={selectedNationalites.includes(n.id)}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedNationalites([...selectedNationalites, n.id])
                              : setSelectedNationalites(
                                  selectedNationalites.filter((id) => id !== n.id)
                                )
                          }
                        />{" "}
                        {n.nomPays}
                      </label>
                    ))}
                  </div>

                  {/* Badges sélectionnés */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedNationalites.map((id) => {
                      const nat = nationalites.find((n) => n.id === id);
                      return (
                        <span
                          key={id}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm cursor-pointer"
                          onClick={() =>
                            setSelectedNationalites(
                              selectedNationalites.filter((nId) => nId !== id)
                            )
                          }
                        >
                          {nat?.nomPays} ✕
                        </span>
                      );
                    })}
                  </div>
                </div>

                <Button type="submit">
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
              </form>
            </div>

            {/* ================= TABLE ================= */}
            <div className="card-elevated p-8">
              <div className="flex justify-between mb-4">
                <Badge>{regimes.length} régime(s)</Badge>

                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(true)}
                >
                  Supprimer sélection
                </Button>
              </div>

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th></th>
                    <th>Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {regimes.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b odd:bg-muted/20 hover:bg-muted/50"
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRegimes.includes(r.id)}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedRegimes([...selectedRegimes, r.id])
                              : setSelectedRegimes(
                                  selectedRegimes.filter((id) => id !== r.id)
                                )
                          }
                        />
                      </td>
                      <td>{r.nomRegime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer suppression multiple</DialogTitle>
                  <DialogDescription>
                    Voulez-vous supprimer les régimes sélectionnés ?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                  <Button variant="destructive" onClick={deleteMultiple}>
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

export default Regime;