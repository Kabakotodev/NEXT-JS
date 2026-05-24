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
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/documents";
const ITEMS_PER_PAGE = 5;

interface DocumentType {
  id: number;
  nomDocument: string;
  sigleDocument: string;
  descDocument: string;
}

const Document = () => {
  const { toast } = useToast();

  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    nomDocument: "",
    sigleDocument: "",
    descDocument: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ================= LOAD =================
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(API_URL);
      setDocuments(res.data);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // ================= SEARCH =================
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.nomDocument.toLowerCase().includes(search.toLowerCase()) ||
      doc.sigleDocument.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDocuments, currentPage]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        toast({ title: "Succès", description: "Document modifié avec succès" });
      } else {
        await axios.post(API_URL, formData);
        toast({ title: "Succès", description: "Document ajouté avec succès" });
      }

      setFormData({
        nomDocument: "",
        sigleDocument: "",
        descDocument: "",
      });

      setEditingId(null);
      fetchDocuments();
    } catch {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (doc: DocumentType) => {
    setFormData({
      nomDocument: doc.nomDocument,
      sigleDocument: doc.sigleDocument,
      descDocument: doc.descDocument,
    });
    setEditingId(doc.id);
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
      toast({ title: "Supprimé", description: "Document supprimé avec succès" });
      fetchDocuments();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer",
        variant: "destructive",
      });
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
                {editingId ? "Modifier document" : "Ajouter document"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <Input
                  placeholder="Nom document"
                  required
                  value={formData.nomDocument}
                  onChange={(e) =>
                    setFormData({ ...formData, nomDocument: e.target.value })
                  }
                />

                <Input
                  placeholder="Sigle document"
                  required
                  value={formData.sigleDocument}
                  onChange={(e) =>
                    setFormData({ ...formData, sigleDocument: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Description"
                  required
                  rows={4}
                  value={formData.descDocument}
                  onChange={(e) =>
                    setFormData({ ...formData, descDocument: e.target.value })
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
                  Liste des documents
                </h2>

                <Badge variant="secondary">
                  {filteredDocuments.length} élément(s)
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

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">NOM</th>
                    <th className="text-left p-3">SIGLE</th>
                    <th className="text-left p-3">DESCRIPTION</th>
                    <th className="text-center p-3">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-muted/40">
                      <td className="p-3">{doc.nomDocument}</td>
                      <td className="p-3">{doc.sigleDocument}</td>
                      <td className="p-3">{doc.descDocument}</td>
                      <td className="p-3 text-center space-x-2">
                        <Button size="sm" onClick={() => handleEdit(doc)}>
                          <Pencil size={16} />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => confirmDelete(doc.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center p-6 text-muted-foreground">
                        Aucun document trouvé
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

export default Document;