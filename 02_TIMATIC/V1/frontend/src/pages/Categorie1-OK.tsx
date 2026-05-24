import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Pencil, Trash } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

interface CategorieType {
  id: number;
  nomCategorie: string;
  descCategorie: string;
}

const Categorie = () => {
  const { toast } = useToast();

  const [categories, setCategories] = useState<CategorieType[]>([]);
  const [formData, setFormData] = useState({
    nomCategorie: "",
    descCategorie: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // LOAD DATA
  // ===============================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // SUBMIT (ADD OR UPDATE)
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        toast({
          title: "Succès",
          description: "Catégorie modifiée avec succès",
        });
      } else {
        await axios.post(API_URL, formData);
        toast({
          title: "Succès",
          description: "Catégorie ajoutée avec succès",
        });
      }

      setFormData({ nomCategorie: "", descCategorie: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error.response?.data?.message ||
          "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================
  // EDIT
  // ===============================
  const handleEdit = (cat: CategorieType) => {
    setFormData({
      nomCategorie: cat.nomCategorie,
      descCategorie: cat.descCategorie,
    });
    setEditingId(cat.id);
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast({
        title: "Supprimé",
        description: "Catégorie supprimée avec succès",
      });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">

            {/* ================= FORM ================= */}
            <div className="card-elevated p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">
                {editingId
                  ? "Modifier la catégorie"
                  : "Ajouter une nouvelle catégorie"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="text-sm font-medium">
                    Nom catégorie *
                  </label>
                  <Input
                    required
                    value={formData.nomCategorie}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nomCategorie: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
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
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Traitement..."
                    : editingId
                    ? "Mettre à jour"
                    : "Ajouter"}
                </Button>
              </form>
            </div>

            {/* ================= TABLE ================= */}
            <div className="card-elevated p-8">
              <h2 className="text-xl font-bold mb-6">
                Liste des catégories
              </h2>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Nom</th>
                    <th className="text-left p-3">Description</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id} className="border-b hover:bg-muted/40">
                      <td className="p-3">{cat.nomCategorie}</td>
                      <td className="p-3">{cat.descCategorie}</td>
                      <td className="p-3 text-center space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(cat)}
                        >
                          <Pencil size={16} />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(cat.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {categories.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center p-6 text-muted-foreground"
                      >
                        Aucune catégorie trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categorie;