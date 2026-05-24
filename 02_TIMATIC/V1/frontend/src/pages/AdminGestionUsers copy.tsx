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
  const [pwdUser, setPwdUser] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [deleteUser, setDeleteUser] = useState<any | null>(null);

  const [confirmToggleUser, setConfirmToggleUser] = useState<any | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<any | null>(null);

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

      // const matchRole = roleFilter ? String(u.roleId) === roleFilter : true;
      // const matchService = serviceFilter ? String(u.serviceId) === serviceFilter : true;

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
    await Promise.all(selectedIds.map((id) => usersApi.delete(id)));
    toast.success("Utilisateurs supprimés");
    setSelectedIds([]);
    fetchData();
  } catch {
    toast.error("Erreur");
  }
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
                  <Button variant="destructive" onClick={handleDeleteMultiple}>
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
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedIds([...selectedIds, u.id]);
                                  } else {
                                    setSelectedIds(selectedIds.filter(id => id !== u.id));
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
                                {/* <Button size="icon" variant="ghost" onClick={() => handleToggleActive(u)}> */}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setConfirmToggleUser(u)}
                                  >
                                  {u.active ? <ShieldOff className="w-4 h-4 text-destructive" /> :
                                    <ShieldCheck className="w-4 h-4 text-primary" />}
                                </Button>

                                {u.id !== currentUser?.id && (
                                  // <Button size="icon" variant="ghost" onClick={() => setDeleteUser(u)}>
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