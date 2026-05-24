import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API = "http://localhost:5000/api/admin";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminDashboard = () => {

  const { data: overview } = useQuery({
    queryKey: ["overview"],
    queryFn: () => fetcher(`${API}/stats/overview`)
  });

  const { data: topCountries = [] } = useQuery({
    queryKey: ["topCountries"],
    queryFn: () => fetcher(`${API}/stats/top-nationalities`)
  });

  const { data: topDocuments = [] } = useQuery({
    queryKey: ["topDocuments"],
    queryFn: () => fetcher(`${API}/stats/top-documents`)
  });

  const { data: success } = useQuery({
    queryKey: ["success"],
    queryFn: () => fetcher(`${API}/stats/success-rate`)
  });

  const { data: trend } = useQuery({
    queryKey: ["trend"],
    queryFn: () => fetcher(`${API}/stats/trend-30-days`)
  });
  //
  const { data: logs = [] } = useQuery({
    queryKey: ["logs"],
    queryFn: () => fetcher(`${API}/logs`),
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4">

        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card title="Total" value={overview?.total} />
          <Card title="Aujourd’hui" value={overview?.today} />
          <Card title="Ce mois" value={overview?.month} />
          <Card title="Cette année" value={overview?.year} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-10">

          <ChartCard title="Top Pays recherchés">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCountries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Documents">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topDocuments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="document" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {success && (
            <ChartCard title="Taux de succès">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Succès", value: success.found },
                      { name: "Échec", value: success.notFound },
                    ]}
                    dataKey="value"
                    outerRadius={100}
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#dc2626" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {trend && (
            <ChartCard title="Tendance 30 jours">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={Object.entries(trend).map(([date, value]) => ({ date, value }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#7c3aed" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

        </div>

        <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Journal des recherches</h2>

            <div className="card-elevated p-4 overflow-auto">
                <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">IP</th>
                    <th className="text-left p-2">Pays</th>
                    <th className="text-left p-2">Document</th>
                    <th className="text-left p-2">Résultat</th>
                    <th className="text-left p-2">Route</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log: any) => (
                    <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                        {new Date(log.date).toLocaleString()}
                        </td>
                        <td className="p-2">{log.ip}</td>
                        <td className="p-2">{log.country}</td>
                        <td className="p-2">{log.document}</td>
                        <td className={`p-2 font-semibold ${
                        log.result === "Trouvé" ? "text-green-600" : "text-red-600"
                        }`}>
                        {log.result}
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">
                        {log.route}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>

      </main>
      <Footer />
    </div>
  );
};

const Card = ({ title, value }: any) => (
  <div className="card-elevated p-6">
    <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value ?? 0}</p>
  </div>
);

const ChartCard = ({ title, children }: any) => (
  <div className="card-elevated p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;