import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import DataTable from "@/components/DataTable"

import { useEffect, useState, useMemo, useRef } from "react"

import axios from "axios"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const API_URL = "http://localhost:5000/api/services"

interface ServiceParentType {
  id: number
  nomServiceParent: string
  sigleServiceParent: string
}

interface ServiceType {
  id: number
  nomService: string
  sigleService: string
  serviceParentId: number
  serviceParent?: ServiceParentType
}

const COLORS = ["#2563eb","#16a34a","#dc2626","#ea580c","#7c3aed","#0891b2"]

const ServiceParServiceParent2 = () => {

  const [services,setServices] = useState<ServiceType[]>([])
  const [search,setSearch] = useState("")

  const exportRef = useRef<HTMLDivElement>(null)

  // ================= API =================

  const fetchServices = async () => {

    const res = await axios.get(API_URL)

    setServices(res.data)

  }

  useEffect(()=>{

    fetchServices()

  },[])

  // ================= SEARCH =================

  const filteredServices = useMemo(()=>{

    return services.filter((s)=>

      s.nomService.toLowerCase().includes(search.toLowerCase()) ||

      s.sigleService.toLowerCase().includes(search.toLowerCase())

    )

  },[services,search])

  // ================= GROUP =================

  const grouped = useMemo(()=>{

    const groups:Record<string,ServiceType[]> = {}

    filteredServices.forEach(service=>{

      const parent = service.serviceParent?.nomServiceParent || "Non défini"

      if(!groups[parent]) groups[parent] = []

      groups[parent].push(service)

    })

    return groups

  },[filteredServices])

  // ================= STATS =================

  const stats = useMemo(()=>{

    return Object.entries(grouped).map(([parent,services])=>({

      serviceParent: parent,

      total: services.length

    }))

  },[grouped])

  // ================= TABLE COLUMNS =================

  const columns = [

    {
      accessorKey:"nomService",
      header:"Service"
    },

    {
      header:"Sigle",
      cell:({row}:any)=>(
        <Badge variant="outline">
          {row.original.sigleService}
        </Badge>
      )
    }

  ]

  // ================= EXPORT EXCEL =================

  const exportExcel = ()=>{

    const worksheet = XLSX.utils.json_to_sheet(stats)

    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook,worksheet,"Services")

    XLSX.writeFile(workbook,"services_par_serviceParent.xlsx")

  }

  // ================= EXPORT PDF =================

  const exportPDF = async ()=>{

    if(!exportRef.current) return

    const canvas = await html2canvas(exportRef.current)

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF()

    pdf.addImage(imgData,"PNG",10,10,190,0)

    pdf.save("services_par_serviceParent.pdf")

  }

  // ================= PRINT =================

  const handlePrint = ()=>{

    window.print()

  }

  // ================= UI =================

  return (

    <div className="min-h-screen flex flex-col">

      <Header/>

      <main className="flex-1 pt-20">

        <section className="py-16">

          <div className="container mx-auto max-w-6xl space-y-12" ref={exportRef}>

            <h1 className="text-2xl font-bold text-center">

              Statistiques des Services par Service Parent

            </h1>

            {/* ACTIONS */}

            <div className="flex gap-3 justify-center">

              <Button onClick={exportExcel}>Export Excel</Button>

              <Button onClick={exportPDF}>Export PDF</Button>

              <Button onClick={handlePrint}>Imprimer</Button>

            </div>

            {/* SEARCH */}

            <Input
              placeholder="Rechercher service..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="max-w-md mx-auto"
            />

            {/* GRAPH BAR */}

            <div className="card-elevated p-6">

              <h2 className="text-lg font-semibold mb-4">

                Nombre de services par service parent

              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <BarChart data={stats}>

                  <XAxis dataKey="serviceParent"/>

                  <YAxis/>

                  <Tooltip/>

                  <Bar dataKey="total" fill="#2563eb"/>

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* GRAPH PIE */}

            <div className="card-elevated p-6">

              <h2 className="text-lg font-semibold mb-4">

                Répartition des services

              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                  <Pie
                    data={stats}
                    dataKey="total"
                    nameKey="serviceParent"
                    outerRadius={120}
                    label
                  >

                    {stats.map((_,index)=>(

                      <Cell key={index} fill={COLORS[index % COLORS.length]}/>

                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* TABLE PAR SERVICE PARENT */}

            {Object.entries(grouped).map(([parentName,services])=>(

              <div key={parentName} className="card-elevated p-8">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-semibold">

                    {parentName}

                  </h2>

                  <Badge>

                    {services.length}

                  </Badge>

                </div>

                <DataTable

                  columns={columns}

                  data={services}

                />

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer/>

    </div>

  )

}

export default ServiceParServiceParent2