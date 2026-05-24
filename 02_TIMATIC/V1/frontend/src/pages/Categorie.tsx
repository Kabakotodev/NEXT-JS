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
  DialogFooter,
} from "@/components/ui/dialog";

import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

/* ================= TYPES ================= */

interface DocumentType {
  id: number;
  nomDocument: string;
  sigleDocument: string;
  descDocument: string;
}

interface NationaliteType {
  id: number;
  nomPays: string;
  codePays: string;
  nationaliteFr: string;
  nationaliteEn: string;
}

interface RelationType {
  id?: number;
  documentId: number;
  nationaliteId: number;
  document?: DocumentType;
  nationalite?: NationaliteType;
}

interface CategorieType {
  id: number;
  nomCategorie: string;
  descCategorie: string;
  objetCategorie: string;
  relations: RelationType[];
}

interface CategorieFormType {
  nomCategorie: string;
  descCategorie: string;
  objetCategorie: string;
}

/* ================= API ================= */

const API_CATEGORIE = "http://localhost:5000/api/categories";
const API_DOCUMENT = "http://localhost:5000/api/documents";
const API_NATIONALITE = "http://localhost:5000/api/nationalites";

/* ================= COMPONENT ================= */

const Categorie = () => {
  const summernoteRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<CategorieType[]>([]);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [nationalites, setNationalites] = useState<NationaliteType[]>([]);

  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedNationalites, setSelectedNationalites] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [formData, setFormData] = useState<CategorieFormType>({
    nomCategorie: "",
    descCategorie: "",
    objetCategorie: "",
  });

  const [searchNationalite, setSearchNationalite] = useState<string>("");

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [c, d, n] = await Promise.all([
        axios.get<CategorieType[]>(API_CATEGORIE),
        axios.get<DocumentType[]>(API_DOCUMENT),
        axios.get<NationaliteType[]>(API_NATIONALITE),
      ]);

      setCategories(c.data);
      setDocuments(d.data);
      setNationalites(n.data);
    } catch {
      notifyError("Erreur chargement données");
    }
  };

  /* ================= INIT SUMMERNOTE ================= */

  useEffect(() => {
    if (summernoteRef.current && (window as any).$) {
      (window as any).$(summernoteRef.current).summernote({
        height: 200,
        callbacks: {
          onChange: (contents: string) => {
            setFormData((prev) => ({
              ...prev,
              objetCategorie: contents,
            }));
          },
        },
      });
    }

    return () => {
      if (summernoteRef.current && (window as any).$) {
        (window as any).$(summernoteRef.current).summernote("destroy");
      }
    };
  }, []);

  /* ================= EDIT ================= */

  const handleEdit = (cat: CategorieType) => {
    setEditingId(cat.id);

    setFormData({
      nomCategorie: cat.nomCategorie,
      descCategorie: cat.descCategorie,
      objetCategorie: cat.objetCategorie,
    });

    const docIds = cat.relations.map((r) => r.documentId);
    const natIds = cat.relations.map((r) => r.nationaliteId);

    setSelectedDocuments([...new Set<number>(docIds)]);
    setSelectedNationalites([...new Set<number>(natIds)]);

    setTimeout(() => {
      if (summernoteRef.current && (window as any).$) {
        (window as any).$(summernoteRef.current).summernote(
          "code",
          cat.objetCategorie
        );
      }
    }, 200);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nomCategorie.trim()) {
      notifyWarning("Nom catégorie obligatoire");
      return;
    }

    if (selectedDocuments.length === 0 || selectedNationalites.length === 0) {
      notifyWarning("Sélectionnez au moins un document et une nationalité");
      return;
    }

    const relations: RelationType[] = [];

    selectedDocuments.forEach((docId) => {
      selectedNationalites.forEach((natId) => {
        relations.push({
          documentId: docId,
          nationaliteId: natId,
        });
      });
    });

    try {
      if (editingId) {
        await axios.put(`${API_CATEGORIE}/${editingId}`, {
          ...formData,
          relations,
        });
        notifySuccess("Catégorie modifiée");
      } else {
        await axios.post(API_CATEGORIE, {
          ...formData,
          relations,
        });
        notifySuccess("Catégorie ajoutée");
      }

      resetForm();
      fetchAll();
    } catch (error: any) {
      notifyError(error.response?.data?.message || "Erreur enregistrement");
    }
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setFormData({
      nomCategorie: "",
      descCategorie: "",
      objetCategorie: "",
    });
    setSelectedDocuments([]);
    setSelectedNationalites([]);
    setEditingId(null);

    if (summernoteRef.current && (window as any).$) {
      (window as any).$(summernoteRef.current).summernote("code", "");
    }
  };

  /* ================= DELETE MULTIPLE ================= */

  const handleDeleteMultiple = async () => {
    try {
      await axios.post(`${API_CATEGORIE}/bulk-delete`, {
        ids: selectedRows,
      });
      notifySuccess("Suppression effectuée");
      setSelectedRows([]);
      setOpenDialog(false);
      fetchAll();
    } catch {
      notifyError("Erreur suppression");
    }
  };

  /* ================= FILTER NATIONALITES ================= */

  const filteredNationalites = useMemo(() => {
    return nationalites.filter((n) =>
      n.nationaliteFr.toLowerCase().includes(searchNationalite.toLowerCase())
    );
  }, [nationalites, searchNationalite]);

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">

            {/* FORM */}
            <div className="card-elevated p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Modifier Catégorie" : "Ajouter Catégorie"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <Input
                  placeholder="Nom catégorie"
                  value={formData.nomCategorie}
                  onChange={(e) =>
                    setFormData({ ...formData, nomCategorie: e.target.value })
                  }
                />

                <Input
                  placeholder="Description"
                  value={formData.descCategorie}
                  onChange={(e) =>
                    setFormData({ ...formData, descCategorie: e.target.value })
                  }
                />

                <div ref={summernoteRef}></div>

                {/* DOCUMENTS */}
                <div>
                  <p className="font-semibold mb-2">Documents</p>
                  {documents.map((doc) => (
                    <label key={doc.id} className="block text-sm">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedDocuments((prev) => [...prev, doc.id])
                            : setSelectedDocuments((prev) =>
                                prev.filter((id) => id !== doc.id)
                              )
                        }
                      />{" "}
                      {doc.nomDocument}
                    </label>
                  ))}
                </div>

                {/* NATIONALITES */}
                <div>
                  {/* <p className="font-semibold mb-2">Nationalités</p> */}
                  <p className="font-semibold mb-2">Pays de délivrance</p>

                  <Input
                    placeholder="Rechercher..."
                    value={searchNationalite}
                    onChange={(e) => setSearchNationalite(e.target.value)}
                  />

                  <div className="max-h-40 overflow-y-auto border rounded p-2 mt-2">
                    {filteredNationalites.map((n) => (
                      <label key={n.id} className="block text-sm">
                        <input
                          type="checkbox"
                          checked={selectedNationalites.includes(n.id)}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedNationalites((prev) => [...prev, n.id])
                              : setSelectedNationalites((prev) =>
                                  prev.filter((id) => id !== n.id)
                                )
                          }
                        />{" "}
                        {/* {n.nationaliteFr} */}
                        {n.nomPays}
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit">
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
              </form>
            </div>

            {/* TABLE */}
            <div className="card-elevated p-8">
              <div className="flex justify-between mb-4">
                <Badge>{categories.length} élément(s)</Badge>
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(true)}
                >
                  Supprimer sélection
                </Button>
              </div>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th></th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="border-b odd:bg-muted/20 hover:bg-muted/50"
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(cat.id)}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedRows((prev) => [...prev, cat.id])
                              : setSelectedRows((prev) =>
                                  prev.filter((id) => id !== cat.id)
                                )
                          }
                        />
                      </td>
                      <td>{cat.nomCategorie}</td>
                      <td>{cat.descCategorie}</td>
                      <td>
                        <Button size="sm" onClick={() => handleEdit(cat)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DIALOG */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer suppression</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                  <Button variant="destructive" onClick={handleDeleteMultiple}>
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