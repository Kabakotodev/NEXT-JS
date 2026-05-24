import { useState, useEffect } from "react";
import { usersApi, rolesApi, servicesApi } from "@/services/api";
import { User, Role, Service } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PasswordWarningBanner from "@/components/auth/PasswordWarningBanner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import {
  Plus, Pencil, Trash2,
  KeyRound, UserCheck,
  UserX, Loader2
} from "lucide-react";

const AdminGestionUsers = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    contact: "",
    username: "",
    password: "",
    roleId: "",
    serviceId: "",
    active: true,
  });

  // 🔐 Protection ADMIN supplémentaire
  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      toast.error("Accès refusé");
      window.location.href = "/";
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [u, r, s] = await Promise.all([
        usersApi.getAll(),
        rolesApi.getAll(),
        servicesApi.getAll()
      ]);

      setUsers(u);
      setRoles(r);
      setServices(s);
    } catch {
      toast.error("Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setFormData({
      prenom: "",
      nom: "",
      contact: "",
      username: "",
      password: "",
      roleId: "",
      serviceId: "",
      active: true,
    });
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      prenom: user.prenom,
      nom: user.nom,
      contact: user.contact,
      username: user.username,
      password: "",
      roleId: String(user.roleId),
      serviceId: String(user.serviceId),
      active: user.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.prenom || !formData.nom || !formData.username || !formData.roleId || !formData.serviceId) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const payload: any = {
      prenom: formData.prenom,
      nom: formData.nom,
      contact: formData.contact,
      username: formData.username,
      roleId: Number(formData.roleId),
      serviceId: Number(formData.serviceId),
      active: formData.active,
    };

    if (formData.password) {
      if (formData.password.length < 6) {
        toast.error("Mot de passe trop court");
        return;
      }
      payload.password = formData.password;
    }

    try {
      if (editingUser) {
        await usersApi.update(editingUser.id, payload);
        toast.success("Utilisateur modifié avec succès");
      } else {
        if (!formData.password) {
          toast.error("Le mot de passe est requis");
          return;
        }
        await usersApi.create(payload);
        toast.success("Utilisateur créé avec succès");
      }

      setDialogOpen(false);
      fetchData();

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleToggleActive = async (u: User) => {
    try {
      await usersApi.update(u.id, { active: !u.active });
      toast.success(u.active ? "Compte désactivé" : "Compte activé");
      fetchData();
    } catch {
      toast.error("Erreur lors de la modification");
    }
  };

  const handleChangePassword = async () => {
    if (!selectedUserId || newPassword.length < 6) {
      toast.error("Mot de passe invalide");
      return;
    }

    try {
      await usersApi.changePassword(selectedUserId, newPassword);
      toast.success("Mot de passe modifié");
      setPasswordDialogOpen(false);
      setNewPassword("");
    } catch {
      toast.error("Erreur lors du changement");
    }
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      await usersApi.delete(selectedUserId);
      toast.success("Utilisateur supprimé");
      setDeleteDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const getDaysUntilExpiry = (date: string) => {
    const last = new Date(date);
    const expiry = new Date(last);
    expiry.setDate(expiry.getDate() + 90);
    return Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PasswordWarningBanner />

      <main className="flex-1 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-10">

          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-display">Gestion des utilisateurs</h1>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" /> Nouveau
            </Button>
          </div>

          <Card className="card-institutional">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin w-6 h-6 text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Mot de passe</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => {
                      const daysLeft = u.passwordLastChanged
                        ? getDaysUntilExpiry(u.passwordLastChanged)
                        : null;

                      return (
                        <TableRow key={u.id}>
                          <TableCell>{u.prenom} {u.nom}</TableCell>
                          <TableCell>{u.username}</TableCell>
                          <TableCell>{u.role?.nomRole}</TableCell>
                          <TableCell>{u.service?.nomService}</TableCell>
                          <TableCell>
                            <Badge variant={u.active ? "default" : "destructive"}>
                              {u.active ? "Actif" : "Inactif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {u.forcePasswordChange ? (
                              <Badge variant="destructive">Expiré</Badge>
                            ) : daysLeft !== null && daysLeft <= 15 ? (
                              <Badge variant="outline">
                                Expire dans {daysLeft}j
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">OK</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="icon" onClick={() => handleToggleActive(u)}>
                                {u.active ? <UserX /> : <UserCheck />}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => {
                                setSelectedUserId(u.id);
                                setPasswordDialogOpen(true);
                              }}>
                                <KeyRound />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(u)}>
                                <Pencil />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => {
                                setSelectedUserId(u.id);
                                setDeleteDialogOpen(true);
                              }}>
                                <Trash2 className="text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Les Dialogs restent identiques (create/edit, password, delete) */}
    </div>
  );
};

export default AdminGestionUsers;