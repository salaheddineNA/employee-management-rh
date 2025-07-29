"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Building, TrendingUp, Edit } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState([])
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const name = localStorage.getItem("userName") || localStorage.getItem("userEmail") || "Utilisateur"
    setUserName(name)

    const savedEmployees = localStorage.getItem("employees")
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
    } else {
      // Ajouter des employés d'exemple si aucun n'existe
      const exampleEmployees = [
        {
          id: "1",
          name: "Marie Dubois",
          email: "marie.dubois@entreprise.com",
          phone: "01 23 45 67 89",
          position: "Développeuse Full Stack",
          department: "IT",
          salary: "4500",
          dateJoined: "2023-01-15T00:00:00.000Z",
        },
        {
          id: "2",
          name: "Pierre Martin",
          email: "pierre.martin@entreprise.com",
          phone: "01 23 45 67 90",
          position: "Chef de Projet",
          department: "IT",
          salary: "5200",
          dateJoined: "2022-06-10T00:00:00.000Z",
        },
        {
          id: "3",
          name: "Sophie Laurent",
          email: "sophie.laurent@entreprise.com",
          phone: "01 23 45 67 91",
          position: "Responsable RH",
          department: "RH",
          salary: "4800",
          dateJoined: "2021-03-20T00:00:00.000Z",
        },
        {
          id: "4",
          name: "Thomas Bernard",
          email: "thomas.bernard@entreprise.com",
          phone: "01 23 45 67 92",
          position: "Analyste Financier",
          department: "Finance",
          salary: "4200",
          dateJoined: "2023-02-28T00:00:00.000Z",
        },
        {
          id: "5",
          name: "Julie Moreau",
          email: "julie.moreau@entreprise.com",
          phone: "01 23 45 67 93",
          position: "Responsable Marketing",
          department: "Marketing",
          salary: "4600",
          dateJoined: "2022-09-12T00:00:00.000Z",
        },
        {
          id: "6",
          name: "Alexandre Petit",
          email: "alexandre.petit@entreprise.com",
          phone: "01 23 45 67 94",
          position: "Commercial Senior",
          department: "Ventes",
          salary: "4000",
          dateJoined: "2023-04-05T00:00:00.000Z",
        },
        {
          id: "7",
          name: "Camille Roux",
          email: "camille.roux@entreprise.com",
          phone: "01 23 45 67 95",
          position: "UX/UI Designer",
          department: "IT",
          salary: "3800",
          dateJoined: "2023-05-18T00:00:00.000Z",
        },
        {
          id: "8",
          name: "Nicolas Leroy",
          email: "nicolas.leroy@entreprise.com",
          phone: "01 23 45 67 96",
          position: "Comptable",
          department: "Finance",
          salary: "3600",
          dateJoined: "2022-11-30T00:00:00.000Z",
        },
        {
          id: "9",
          name: "Emma Fournier",
          email: "emma.fournier@entreprise.com",
          phone: "01 23 45 67 97",
          position: "Assistante RH",
          department: "RH",
          salary: "3200",
          dateJoined: "2023-06-22T00:00:00.000Z",
        },
        {
          id: "10",
          name: "Lucas Girard",
          email: "lucas.girard@entreprise.com",
          phone: "01 23 45 67 98",
          position: "Responsable Production",
          department: "Production",
          salary: "5000",
          dateJoined: "2021-08-14T00:00:00.000Z",
        },
        {
          id: "11",
          name: "Isabelle Moreau",
          email: "isabelle.moreau@entreprise.com",
          phone: "01 23 45 68 10",
          position: "Directrice Marketing",
          department: "Marketing",
          salary: "5800",
          dateJoined: "2020-11-08T00:00:00.000Z",
        },
        {
          id: "12",
          name: "Fabien Rousseau",
          email: "fabien.rousseau@entreprise.com",
          phone: "01 23 45 68 11",
          position: "Ingénieur DevOps",
          department: "IT",
          salary: "4900",
          dateJoined: "2022-04-15T00:00:00.000Z",
        },
        {
          id: "13",
          name: "Céline Blanc",
          email: "celine.blanc@entreprise.com",
          phone: "01 23 45 68 12",
          position: "Responsable Qualité",
          department: "Production",
          salary: "4300",
          dateJoined: "2023-07-20T00:00:00.000Z",
        },
        {
          id: "14",
          name: "Julien Mercier",
          email: "julien.mercier@entreprise.com",
          phone: "01 23 45 68 13",
          position: "Chef Comptable",
          department: "Finance",
          salary: "5100",
          dateJoined: "2021-12-03T00:00:00.000Z",
        },
        {
          id: "15",
          name: "Amélie Vincent",
          email: "amelie.vincent@entreprise.com",
          phone: "01 23 45 68 14",
          position: "Coordinatrice RH",
          department: "RH",
          salary: "3900",
          dateJoined: "2023-09-12T00:00:00.000Z",
        },
      ]

      localStorage.setItem("employees", JSON.stringify(exampleEmployees))
      setEmployees(exampleEmployees)
    }
  }, [router])

  const stats = [
    {
      title: "Total Employés",
      value: employees.length,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Départements",
      value: new Set(employees.map((emp: any) => emp.department)).size,
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Nouveaux ce mois",
      value: employees.filter((emp: any) => {
        const empDate = new Date(emp.dateJoined || Date.now())
        const now = new Date()
        return empDate.getMonth() === now.getMonth() && empDate.getFullYear() === now.getFullYear()
      }).length,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900">Bonjour, {userName} 👋</h1>
          <p className="text-gray-600 mt-2">Voici un aperçu de votre système de gestion d'employés</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez vos employés efficacement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/add-employee">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un nouvel employé
                </Button>
              </Link>
              <Link href="/employees">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Voir tous les employés
                </Button>
              </Link>
              <Link href="/employees">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier les employés
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employés récents</CardTitle>
              <CardDescription>Les derniers employés ajoutés</CardDescription>
            </CardHeader>
            <CardContent>
              {employees.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucun employé ajouté pour le moment</p>
              ) : (
                <div className="space-y-3">
                  {employees.slice(-3).map((employee: any, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-orange-100">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">{employee.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{employee.name}</p>
                        <p className="text-sm text-gray-500 truncate">{employee.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
