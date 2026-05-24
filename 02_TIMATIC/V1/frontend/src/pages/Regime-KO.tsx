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

import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

/* ================= JQUERY + SUMMERNOTE SETUP ================= */

import jquery from "jquery";
const $ = jquery as any;

(window as any).$ = $;
(window as any).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";

/* ================= API ================= */

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
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [regimes, setRegimes] = useState<RegimeType[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [nationalites, setNationalites] = useState<any[]>([]);

  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedNationalites, setSelectedNationalites] = useState<number[]>([]);
  const [selectedRegimes, setSelectedRegimes] = useState<number[]>([]);

  const [nationaliteSearch, setNationaliteSearch] = useState("");

  const [formData, setFormData] = useState({
    nomRegime: "",
    descRegime: "",
    objetRegime: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  /* ================= LOAD DATA ================= */

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

  /* ================= SUMMERNOTE INIT ================= */

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = $(editorRef.current);

    editor.summernote({
      placeholder: "Objet du régime",
      height: 250,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "clear"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "picture"]],
        ["view", ["codeview"]],
      ],
      callbacks: {
        onChange: function (contents: string) {
          setFormData((prev) => ({
            ...prev,
            objetRegime: contents,
          }));
        },
      },
    });

    return () => {
      editor.summernote("destroy");
    };
  }, []);

  /* ================= SYNC CONTENT ================= */

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = $(editorRef.current);
    const current = editor.summernote("code");

    if (current !== formData.objetRegime) {
      editor.summernote("code", formData.objetRegime || "");
    }
  }, [formData.objetRegime]);

  /* ================= FILTER NATIONALITES ================= */

  const filteredNationalites = useMemo(() => {
    return nationalites.filter((n) =>
      n.nomPays.toLowerCase().includes(nationaliteSearch.toLowerCase())
    );
  }, [nationalites, nationaliteSearch]);

  /* ================= SUBMIT ================= */

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

  /* ================= RESET ================= */

  const resetForm = () => {
    setFormData({
      nomRegime: "",
      descRegime: "",
      objetRegime: "",
    });

    if (editorRef.current) {
      const editor = $(editorRef.current);
      editor.summernote("code", "");
    }

    setSelectedDocuments([]);
    setSelectedCategories([]);
    setSelectedNationalites([]);
    setEditingId(null);
  };

  /* ================= DELETE MULTIPLE ================= */

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

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">

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

                <div>
                  <p className="font-semibold mb-2">Objet du régime</p>
                  <textarea ref={editorRef} />
                </div>

                <Button type="submit">
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
              </form>
            </div>

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
                    <tr key={r.id} className="border-b odd:bg-muted/20">
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

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Regime;