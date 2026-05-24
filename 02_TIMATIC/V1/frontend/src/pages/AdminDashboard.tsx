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

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API = "http://localhost:5000/api/admin";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminDashboard = () => {
  const { data: overview } = useQuery({
    queryKey: ["overview"],
    queryFn: () => fetcher(`${API}/stats/overview`),
  });

  const { data: topCountries = [] } = useQuery({
    queryKey: ["topCountries"],
    queryFn: () => fetcher(`${API}/stats/top-nationalities`),
  });

  const { data: topDocuments = [] } = useQuery({
    queryKey: ["topDocuments"],
    queryFn: () => fetcher(`${API}/stats/top-documents`),
  });

  const { data: success } = useQuery({
    queryKey: ["success"],
    queryFn: () => fetcher(`${API}/stats/success-rate`),
  });

  const { data: trend } = useQuery({
    queryKey: ["trend"],
    queryFn: () => fetcher(`${API}/stats/trend-30-days`),
  });

  const { data: logs = [] } = useQuery({
    queryKey: ["logs"],
    queryFn: () => fetcher(`${API}/logs`),
  });

  // Analyses d'anomalies (ex: pics de trafic, erreurs fréquentes)
  const { data: anomalies } = useQuery({
    queryKey: ["anomalies"],
    queryFn: () => fetcher(`${API}/stats/anomalies`)
  });
  //
  const { data: highFailure } = useQuery({
    queryKey: ["highFailure"],
    queryFn: () => fetcher(`${API}/stats/anomalies/high-failure`)
  });

  const { data: countryScan } = useQuery({
    queryKey: ["countryScan"],
    queryFn: () => fetcher(`${API}/stats/anomalies/country-scan`)
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4">

        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

        {/* KPI */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card title="Total" value={overview?.total} />
          <Card title="Aujourd’hui" value={overview?.today} />
          <Card title="Ce mois" value={overview?.month} />
          <Card title="Cette année" value={overview?.year} />
        </div>

        {/*  */}
        {highFailure?.suspiciousCount > 0 && (
          <AlertCard title="IP avec taux d'échec élevé" data={highFailure.suspicious} />
        )}

        {countryScan?.suspiciousCount > 0 && (
          <AlertCard title="Scan massif de pays détecté" data={countryScan.suspicious} />
        )}

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
                <LineChart
                  data={Object.entries(trend).map(([date, value]) => ({
                    date,
                    value,
                  }))}
                >
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

        {/* Anomalies */}
          {anomalies?.suspiciousCount > 0 && (
            <div className="card-elevated p-6 mt-12 border-l-4 border-l-red-600">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                ⚠️ Alertes Anomalies Détectées
              </h2>

              {anomalies.suspicious.map((ip: any) => (
                <div key={ip.ip} className="mb-3">
                  <p>
                    <strong>IP :</strong> {ip.ip}
                  </p>
                  <p>
                    <strong>Requêtes :</strong> {ip.totalRequests} en {ip.periodHours}h
                  </p>
                </div>
              ))}
            </div>
          )}

        {/* Logs Table */}
        <LogsTable data={logs} />

      </main>
      <Footer />
    </div>
  );
};

/* ========================
   TABLE INTERACTIVE
======================== */

const LogsTable = ({ data }: any) => {

  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      cell: (info: any) =>
        new Date(info.getValue()).toLocaleString(),
    },
    { header: "IP", accessorKey: "ip" },
    { header: "Pays IP", accessorKey: "countryName" },
    { header: "Ville", accessorKey: "city" },
    { header: "Pays recherché", accessorKey: "country" },
    { header: "Document", accessorKey: "document" },
    {
      header: "Résultat",
      accessorKey: "result",
      cell: (info: any) => (
        <span
          className={
            info.getValue() === "Trouvé"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {info.getValue()}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="card-elevated p-6 mt-12">
      <h2 className="text-xl font-bold mb-6">Journal des recherches</h2>

      <table className="w-full text-sm border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer border p-2 bg-muted"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

/* ========================
   UI COMPONENTS
======================== */

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

const AlertCard = ({
  title,
  data,
}: {
  title: string;
  // data: any[];
  data: {
    ip?: string;
    totalRequests?: number;
    periodHours?: number;
    failureRate?: string;
    countriesTested?: number;
  }[]
}) => {
  return (
    <div className="card-elevated p-6 mb-6 border-l-4 border-l-red-600 bg-red-50">
      <h3 className="text-lg font-bold text-red-700 mb-4">
        ⚠ {title}
      </h3>

      {data.map((item, index) => (
        <div
          key={index}
          className="mb-3 p-3 bg-white rounded border"
        >
          {item.ip && (
            <p>
              <strong>IP :</strong> {item.ip}
            </p>
          )}

          {item.totalRequests && (
            <p>
              <strong>Requêtes :</strong> {item.totalRequests}
            </p>
          )}

          {item.periodHours && (
            <p>
              <strong>Période :</strong> {item.periodHours}h
            </p>
          )}

          {item.failureRate && (
            <p>
              <strong>Taux d’échec :</strong> {item.failureRate}%
            </p>
          )}

          {item.countriesTested && (
            <p>
              <strong>Pays testés :</strong> {item.countriesTested}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;