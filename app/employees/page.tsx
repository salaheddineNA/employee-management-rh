"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserPlus, Search, Mail, Phone, Trash2, Users, Edit } from "lucide-react"
import ResetDataButton from "@/components/reset-data-button"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  salary: string
  dateJoined: string
}

export default function EmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const savedEmployees = localStorage.getItem("employees")
    if (savedEmployees) {
      const employeeList = JSON.parse(savedEmployees)
      setEmployees(employeeList)
      setFilteredEmployees(employeeList)
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
      setFilteredEmployees(exampleEmployees)
    }
  }, [router])

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEmployees(filtered)
  }, [searchTerm, employees])

  const handleDeleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id)
    setEmployees(updatedEmployees)
    localStorage.setItem("employees", JSON.stringify(updatedEmployees))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      IT: "bg-orange-100 text-orange-800",
      RH: "bg-green-100 text-green-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Marketing: "bg-purple-100 text-purple-800",
      Ventes: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800",
    }
    return colors[department] || colors.default
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-900">Employés</h1>
            <p className="text-gray-600 mt-2">
              Gérez votre équipe ({employees.length} employé{employees.length !== 1 ? "s" : ""})
            </p>
          </div>
          <div className="flex gap-2">
            <ResetDataButton
              onReset={() => {
                const savedEmployees = localStorage.getItem("employees")
                if (savedEmployees) {
                  const employeeList = JSON.parse(savedEmployees)
                  setEmployees(employeeList)
                  setFilteredEmployees(employeeList)
                }
              }}
            />
            <Link href="/add-employee">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un employé
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher</CardTitle>
            <CardDescription>Trouvez un employé par nom, email, poste ou département</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {filteredEmployees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-orange-900 mb-2">
                {employees.length === 0 ? "Aucun employé" : "Aucun résultat"}
              </h3>
              <p className="text-gray-500 mb-4">
                {employees.length === 0
                  ? "Commencez par ajouter votre premier employé"
                  : "Essayez de modifier votre recherche"}
              </p>
              {employees.length === 0 && (
                <Link href="/add-employee">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter un employé
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription>{employee.position}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Link href={`/edit-employee/${employee.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-800 hover:bg-orange-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className={getDepartmentColor(employee.department)}>{employee.department}</Badge>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="mr-2 h-4 w-4" />
                      {employee.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="mr-2 h-4 w-4" />
                      {employee.phone}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Salaire:</span>
                      <span className="font-medium">{employee.salary}€</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Embauché:</span>
                      <span className="font-medium">{new Date(employee.dateJoined).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
