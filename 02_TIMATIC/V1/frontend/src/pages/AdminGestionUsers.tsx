import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import { <PasswordWarningBanner></PasswordWarningBanner> } from "@/components/auth/PasswordWarningBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usersApi, rolesApi, servicesApi } from "@/services/api";
import { Users, Pencil, Trash2, ShieldCheck, ShieldOff, KeyRound, Search } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import PasswordWarningBanner from "@/components/auth/PasswordWarningBanner";
import { DialogDescription } from "@radix-ui/react-dialog";

const ITEMS_PER_PAGE = 5;

const AdminGestionUsers = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [editUser, setEditUser] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  //const [pwdUser, setPwdUser] = useState<any | null>(null);
  //const [newPassword, setNewPassword] = useState("");
  const [deleteUser, setDeleteUser] = useState<any | null>(null);

  const [confirmToggleUser, setConfirmToggleUser] = useState<any | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<any | null>(null);
  const [confirmDeleteMultiple, setConfirmDeleteMultiple] = useState(false);
  
  const [pwdUser, setPwdUser] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      toast.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  console.log("Fetching users...");
  fetchData();
}, []);

  useEffect(() => { fetchData(); }, []);

  // 🔎 FILTRAGE + RECHERCHE
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.prenom.toLowerCase().includes(search.toLowerCase()) ||
        u.nom.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter && roleFilter !== "ALL"
          ? String(u.roleId) === roleFilter
          : true;

      const matchService =
        serviceFilter && serviceFilter !== "ALL"
          ? String(u.serviceId) === serviceFilter
          : true;

      return matchSearch && matchRole && matchService;
    });
  }, [users, search, roleFilter, serviceFilter]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleActive = async (u: any) => {
    try {
      await usersApi.update(u.id, { active: !u.active });
      toast.success(u.active ? "Compte désactivé" : "Compte activé");
      fetchData();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  const handleDeleteMultiple = async () => {
      try {
        await usersApi.deleteMultiple(selectedIds);

        toast.success("Utilisateurs supprimés avec succès");

        setSelectedIds([]);
        fetchData();

      } catch (err: any) {
        toast.error(err.message || "Erreur lors de la suppression");
      }
    };

    // Fonction Edit
    const openEdit = (u: any) => {
      setEditForm({
        prenom: u.prenom,
        nom: u.nom,
        contact: u.contact || "",
        username: u.username,
        roleId: String(u.roleId),
        serviceId: String(u.serviceId),
        active: u.active,
      });
      setEditUser(u);
    };

  const getRoleName = (id: number) =>
    roles.find((r) => r.id === id)?.nomRole || "-";

  const getServiceName = (id: number) =>
    services.find((s) => s.id === id)?.nomService || "-";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PasswordWarningBanner />
      <main className="flex-1 pt-16 lg:pt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-8">

          <Card className="card-elevated">
            <CardHeader className="flex flex-col gap-4">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                </div>

                <Badge variant="outline">
                  {filteredUsers.length} utilisateur(s)
                </Badge>
              </div>

              {/* 🔍 Recherche + Filtres */}
              <div className="grid md:grid-cols-4 gap-4">

                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Recherche..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9"
                  />
                </div>

                <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Filtrer par rôle" /></SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="">Tous les rôles</SelectItem> */}
                    <SelectItem value="ALL">Tous les rôles</SelectItem>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>
                        {r.nomRole}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={serviceFilter} onValueChange={(v) => { setServiceFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Filtrer par service" /></SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="">Tous les services</SelectItem> */}
                    <SelectItem value="ALL">Tous les services</SelectItem>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.nomService}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedIds.length > 0 && (
                  // <Button variant="destructive" onClick={handleDeleteMultiple}>
                  //   Supprimer OK ({selectedIds.length})
                  // </Button>

                  <Button
                    variant="destructive"
                    onClick={() => setConfirmDeleteMultiple(true)}
                  >
                    Supprimer ({selectedIds.length})
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <p className="text-center py-10">Chargement...</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Prénom</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {paginatedUsers.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(u.id)}
                                  disabled={u.id === currentUser?.id}
                                  onChange={(e) => {
                                    if (u.id === currentUser?.id) return;

                                    if (e.target.checked) {
                                      setSelectedIds([...selectedIds, u.id]);
                                    } else {
                                      setSelectedIds(selectedIds.filter((id) => id !== u.id));
                                    }
                                  }}

                              />
                            </TableCell>

                            <TableCell>{u.prenom}</TableCell>
                            <TableCell>{u.nom}</TableCell>
                            <TableCell>{u.username}</TableCell>

                            <TableCell>
                              <Badge variant="secondary">
                                {getRoleName(u.roleId)}
                              </Badge>
                            </TableCell>

                            <TableCell>{getServiceName(u.serviceId)}</TableCell>

                            <TableCell>
                              <Badge variant={u.active ? "default" : "destructive"}>
                                {u.active ? "Actif" : "Inactif"}
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => openEdit(u)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => {
                                    setPwdUser(u);
                                    setNewPassword("");
                                    setConfirmPassword("");
                                  }}
                                >
                                  <KeyRound className="w-4 h-4 text-primary" />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setConfirmToggleUser(u)}
                                  >
                                  {u.active ? <ShieldOff className="w-4 h-4 text-destructive" /> :
                                    <ShieldCheck className="w-4 h-4 text-primary" />}
                                </Button>
                                {u.id !== currentUser?.id && (
                                  <Button size="icon" variant="ghost" onClick={() => setConfirmDeleteUser(u)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* DIALOG CONFIRM */}
                    {/* Confirm Activate / Deactivate */}
                    <Dialog open={!!confirmToggleUser} onOpenChange={() => setConfirmToggleUser(null)}>
                      <DialogContent>
                        <DialogHeader>
                        <DialogTitle>
                          {confirmToggleUser?.active
                            ? "Confirmer la désactivation"
                            : "Confirmer l'activation"}
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-muted-foreground">
                        {confirmToggleUser?.active
                          ? "Désactiver ce compte utilisateur ?"
                          : "Activer ce compte utilisateur ?"}
                      </p>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmToggleUser(null)}>
                          Annuler
                        </Button>

                        <Button
                          variant={confirmToggleUser?.active ? "destructive" : "default"}
                          onClick={async () => {
                            try {
                              await usersApi.update(confirmToggleUser.id, {
                                active: !confirmToggleUser.active,
                              });

                              toast.success(
                                confirmToggleUser.active
                                  ? "Compte désactivé avec succès"
                                  : "Compte activé avec succès"
                              );

                              setConfirmToggleUser(null);
                              fetchData();
                            } catch {
                              toast.error("Erreur lors de l'opération");
                            }
                          }}
                        >
                          Confirmer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Confirm Delete */}
                  <Dialog open={!!confirmDeleteUser} onOpenChange={() => setConfirmDeleteUser(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                      </DialogHeader>

                      <p className="text-muted-foreground">
                        Supprimer l'utilisateur{" "}
                        <span className="font-semibold text-foreground">
                          {confirmDeleteUser?.prenom} {confirmDeleteUser?.nom}
                        </span>{" "}
                        ? Cette action est irréversible.
                      </p>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmDeleteUser(null)}>
                          Annuler
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={async () => {
                            try {
                              await usersApi.delete(confirmDeleteUser.id);

                              toast.success("Utilisateur supprimé avec succès");

                              setConfirmDeleteUser(null);
                              fetchData();
                            } catch {
                              toast.error("Erreur lors de la suppression");
                            }
                          }}
                        >
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/*  */}
                  {/* Confirm Delete Multiple */}
                  <Dialog
                    open={confirmDeleteMultiple}
                    onOpenChange={setConfirmDeleteMultiple}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                          Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>

                      <p className="text-muted-foreground">
                        Voulez-vous vraiment supprimer{" "}
                        <span className="font-semibold text-foreground">
                          {selectedIds.length}
                        </span>{" "}
                        utilisateur(s) ?
                      </p>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setConfirmDeleteMultiple(false)}
                        >
                          Annuler
                        </Button>

                        <Button
                          variant="destructive"
                          disabled={confirmDeleteUser?.id === currentUser?.id}
                          onClick={async () => {
                            if (confirmDeleteUser?.id === currentUser?.id) {
                              toast.error("Vous ne pouvez pas supprimer votre propre compte.");
                              return;
                            }
                            try {
                              await usersApi.delete(confirmDeleteUser.id);
                              toast.success("Utilisateur supprimé avec succès");
                              setConfirmDeleteUser(null);
                              fetchData();
                            } catch (err: any) {
                              toast.error(err.message || "Erreur lors de la suppression");
                            }
                          }}
                        >
                          Supprimer
                        </Button>

                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Dialog Edit */}
                  <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier l'utilisateur</DialogTitle>
                        <DialogDescription>
                          Modifier les informations de l'utilisateur.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-2">

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Prénom</Label>
                            <Input
                              value={editForm.prenom || ""}
                              onChange={(e) =>
                                setEditForm({ ...editForm, prenom: e.target.value })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Nom</Label>
                            <Input
                              value={editForm.nom || ""}
                              onChange={(e) =>
                                setEditForm({ ...editForm, nom: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Username</Label>
                          <Input
                            value={editForm.username || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, username: e.target.value })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Contact</Label>
                          <Input
                            value={editForm.contact || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, contact: e.target.value })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                          <div className="space-y-2">
                            <Label>Rôle</Label>
                            <Select
                              value={editForm.roleId}
                              onValueChange={(v) =>
                                setEditForm({ ...editForm, roleId: v })
                              }
                            >
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {roles.map((r) => (
                                  <SelectItem key={r.id} value={String(r.id)}>
                                    {r.nomRole}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Service</Label>
                            <Select
                              value={editForm.serviceId}
                              onValueChange={(v) =>
                                setEditForm({ ...editForm, serviceId: v })
                              }
                            >
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {services.map((s) => (
                                  <SelectItem key={s.id} value={String(s.id)}>
                                    {s.nomService}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editForm.active}
                            onChange={(e) =>
                              setEditForm({ ...editForm, active: e.target.checked })
                            }
                          />
                          <Label>Compte actif</Label>
                        </div>

                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditUser(null)}>
                          Annuler
                        </Button>

                        <Button
                          onClick={async () => {
                            try {
                              await usersApi.update(editUser.id, {
                                prenom: editForm.prenom,
                                nom: editForm.nom,
                                contact: editForm.contact,
                                username: editForm.username,
                                roleId: Number(editForm.roleId),
                                serviceId: Number(editForm.serviceId),
                                active: editForm.active,
                              });

                              toast.success("Utilisateur modifié avec succès");

                              setEditUser(null);
                              fetchData();

                            } catch (err: any) {
                              toast.error(err.message || "Erreur lors de la modification");
                            }
                          }}
                        >
                          Enregistrer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Dialog Modal ADMIN change Password */}
                  <Dialog open={!!pwdUser} onOpenChange={() => setPwdUser(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
                        <DialogDescription>
                          Modifier le mot de passe de l'utilisateur.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-2">

                        <div className="space-y-2">
                          <Label>Username</Label>
                          <Input value={pwdUser?.username || ""} readOnly />
                        </div>

                        <div className="space-y-2">
                          <Label>Nouveau mot de passe</Label>
                          <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Confirmer mot de passe</Label>
                          <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setPwdUser(null)}>
                          Annuler
                        </Button>

                        <Button
                          onClick={async () => {

                            if (newPassword.length < 6) {
                              toast.error("Le mot de passe doit contenir au moins 6 caractères.");
                              return;
                            }

                            if (newPassword !== confirmPassword) {
                              toast.error("Les mots de passe ne correspondent pas.");
                              return;
                            }

                            try {
                              await usersApi.resetPassword(pwdUser.id, newPassword);

                              toast.success("Mot de passe réinitialisé avec succès");

                              setPwdUser(null);
                              setNewPassword("");
                              setConfirmPassword("");

                            } catch (err: any) {
                              toast.error(err.message || "Erreur lors de la réinitialisation");
                            }
                          }}
                        >
                          Réinitialiser
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/*  */}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-6">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Précédent
                    </Button>

                    <span className="px-3 py-2 text-sm">
                      Page {currentPage} / {totalPages || 1}
                    </span>

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Suivant
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminGestionUsers;