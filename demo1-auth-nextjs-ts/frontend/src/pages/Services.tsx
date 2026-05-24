// Services.jsx
import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";
//
import { api } from "../services/api";
//
const API_URL = "http://localhost:4000/api/admin/services";

interface Service {
  id: number;
  nomService: string;
  sigleService: string;
  descService?: string;
  contactService?: string;
  nomChefService?: string;
  gradeChefService?: string;
  fonctionChefService?: string;
  statutChefService?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<Service>({
    id: 0,
    nomService: "",
    sigleService: "",
    descService: "",
    contactService: "",
    nomChefService: "",
    gradeChefService: "",
    fonctionChefService: "",
    statutChefService: "NR",
  });

  const loadServices = async () => {
  try {
    const res = await api("/api/admin/services");

    if (!res) return;

    const data = await res.json();

    const formatted = data.map((s: any) => ({
      id: s.id,
      nomService: s.nom_service,
      sigleService: s.sigle_service,
      descService: s.desc_service,
      contactService: s.contact_service,
      nomChefService: s.nom_chef_service,
      gradeChefService: s.grade_chef_service,
      fonctionChefService: s.fonction_chef_service,
      statutChefService: s.statut_chef_service,
    }));

    setServices(formatted);
    setFilteredServices(formatted);
  } catch (err) {
    console.error("Erreur chargement services", err);
  }
};
//
  const createService = async () => {
    try {
      if (!formData.sigleService || !formData.descService) {
        notifyWarning("⚠️ Sigle et description obligatoires");
        return;
      }

      await api("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_service: formData.nomService,
          sigle_service: formData.sigleService,
          desc_service: formData.descService,
          contact_service: formData.contactService,
          nom_chef_service: formData.nomChefService,
          statut_chef_service: formData.statutChefService,
          grade_chef_service: formData.gradeChefService,
          fonction_chef_service: formData.fonctionChefService,
        }),
      });

      notifySuccess("✅ Service créé");
      loadServices();
    } catch {
      notifyError("❌ Erreur création");
    }
  };

  const deleteService = async (id: number) => {
    await api("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    notifySuccess("🗑️ Supprimé");
    loadServices();
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredServices(
        services.filter(s =>
          Object.values(s)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredServices(services);
    }
    setCurrentPage(1);
  }, [searchTerm, services]);

  /* ================= PAGINATION ================= */

  const paginatedData = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === paginatedData.length
        ? []
        : paginatedData.map(s => s.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("Supprimer les services sélectionnés ?")) return;
    await Promise.all(selectedItems.map(id => deleteService(id)));
    setSelectedItems([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createService();
    setShowModal(false);
  };

  /* JSX IDENTIQUE AU VÔTRE */
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Services</h1>
          <span className="badge badge-primary">
            {filteredServices.length} service(s)
          </span>
        </div>

        <div className="flex gap-3">
          {selectedItems.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="btn-danger flex gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedItems.length})
            </button>
          )}
          <button
            className="btn-primary flex gap-2"
            onClick={() => {
              setEditingService(null);
              setFormData({
                id: 0,
                nomService: "",
                sigleService: "",
                descService: "",
                contactService: "",
                nomChefService: "",
                gradeChefService: "",
                fonctionChefService: "",
                statutChefService: "NR",
              });
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={toggleSelectAll} />
              </th>
              <th>ID</th>
              <th>Nom</th>
              <th>Sigle</th>
              <th>Contact</th>
              <th>Chef</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(service => (
              <tr key={service.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(service.id)}
                    onChange={() =>
                      setSelectedItems(p =>
                        p.includes(service.id)
                          ? p.filter(i => i !== service.id)
                          : [...p, service.id]
                      )
                    }
                  />
                </td>
                <td>{service.id}</td>
                <td>{service.nomService}</td>
                <td>
                  <span className="badge badge-primary">
                    {service.sigleService}
                  </span>
                </td>
                <td>{service.contactService || "-"}</td>
                <td>
                  {service.statutChefService}{" "}
                  {service.nomChefService || "-"}
                </td>
                <td>{service.gradeChefService || "-"}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setFormData(service);
                      setShowModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button onClick={() => deleteService(service.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION – identique au fichier de référence */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white rounded-b-xl">
          <div className="flex items-center gap-2">
            <span>Afficher</span>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Précédent
            </button>
            <span>
              {currentPage} / {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <h2 className="text-xl mb-4">
              {editingService ? "Modifier Service" : "Nouveau Service"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                className="form-input"
                placeholder="Nom du service"
                value={formData.nomService}
                onChange={e =>
                  setFormData({ ...formData, nomService: e.target.value })
                }
              />
              <input
                className="form-input"
                placeholder="Sigle"
                value={formData.sigleService}
                onChange={e =>
                  setFormData({ ...formData, sigleService: e.target.value })
                }
                required
              />
              <textarea
                className="form-input col-span-2"
                placeholder="Description"
                value={formData.descService}
                onChange={e =>
                  setFormData({ ...formData, descService: e.target.value })
                }
                required
              />
              <input
                className="form-input"
                placeholder="Contact"
                value={formData.contactService}
                onChange={e =>
                  setFormData({ ...formData, contactService: e.target.value })
                }
              />
              <select
                className="form-select"
                value={formData.statutChefService}
                onChange={e =>
                  setFormData({
                    ...formData,
                    statutChefService: e.target.value,
                  })
                }
              >
                <option value="NR">NR</option>
                <option value="Mr">Mr</option>
                <option value="Mme">Mme</option>
                <option value="Mlle">Mlle</option>
              </select>
              <input
                className="form-input"
                placeholder="Nom chef de service"
                value={formData.nomChefService}
                onChange={e =>
                  setFormData({
                    ...formData,
                    nomChefService: e.target.value,
                  })
                }
              />
              <input
                className="form-input"
                placeholder="Grade chef"
                value={formData.gradeChefService}
                onChange={e =>
                  setFormData({
                    ...formData,
                    gradeChefService: e.target.value,
                  })
                }
              />
              <input
                className="form-input"
                placeholder="Fonction chef"
                value={formData.fonctionChefService}
                onChange={e =>
                  setFormData({
                    ...formData,
                    fonctionChefService: e.target.value,
                  })
                }
              />

              <div className="col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingService ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
