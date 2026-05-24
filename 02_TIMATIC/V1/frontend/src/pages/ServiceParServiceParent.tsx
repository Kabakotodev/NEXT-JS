import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

import DataTable from "@/components/DataTable"

import { useEffect, useState, useMemo } from "react"

import axios from "axios"

import { notifyError } from "../utils/toast"

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

const ServiceParServiceParent = () => {

  const [services, setServices] = useState<ServiceType[]>([])
  const [search, setSearch] = useState("")

  // ================= API =================

  const fetchServices = async () => {

    try {

      const res = await axios.get(API_URL)

      setServices(res.data)

    } catch {

      notifyError("Impossible de charger les services")

    }

  }

  useEffect(() => {

    fetchServices()

  }, [])

  // ================= SEARCH =================

  const filteredServices = useMemo(() => {

    return services.filter((s) =>
      s.nomService.toLowerCase().includes(search.toLowerCase()) ||
      s.sigleService.toLowerCase().includes(search.toLowerCase())
    )

  }, [services, search])

  // ================= GROUP BY SERVICE PARENT =================

  const groupedServices = useMemo(() => {

    const groups: Record<string, ServiceType[]> = {}

    filteredServices.forEach((service) => {

      const parent = service.serviceParent?.nomServiceParent || "Non défini"

      if (!groups[parent]) {

        groups[parent] = []

      }

      groups[parent].push(service)

    })

    return groups

  }, [filteredServices])

  // ================= TABLE COLUMNS =================

  const columns = [

    {
      accessorKey: "nomService",
      header: "Service"
    },

    {
      header: "Sigle",
      cell: ({ row }: any) => (

        <Badge variant="outline">
          {row.original.sigleService}
        </Badge>

      )
    }

  ]

  // ================= UI =================

  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 pt-20">

        <section className="py-16">

          <div className="container mx-auto max-w-6xl space-y-12">

            <h1 className="text-2xl font-bold text-center">

              Services par Service Parent

            </h1>

            <Input
              placeholder="Rechercher un service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md mx-auto"
            />

            {Object.entries(groupedServices).map(([parentName, services]) => (

              <div key={parentName} className="card-elevated p-8">

                {/* TITRE TABLEAU */}

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

      <Footer />

    </div>

  )

}

export default ServiceParServiceParent