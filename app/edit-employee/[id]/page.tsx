"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

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

export default function EditEmployeePage() {
  const router = useRouter()
  const params = useParams()
  const employeeId = params.id as string

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [employeeFound, setEmployeeFound] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Charger les données de l'employé
    const savedEmployees = localStorage.getItem("employees")
    if (savedEmployees) {
      const employees: Employee[] = JSON.parse(savedEmployees)
      const employee = employees.find((emp) => emp.id === employeeId)

      if (employee) {
        setFormData({
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          position: employee.position,
          department: employee.department,
          salary: employee.salary,
        })
      } else {
        setEmployeeFound(false)
      }
    } else {
      setEmployeeFound(false)
    }
  }, [router, employeeId])

  const departments = ["IT", "RH", "Finance", "Marketing", "Ventes", "Production", "Logistique"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.position ||
      !formData.department ||
      !formData.salary
    ) {
      setError("Veuillez remplir tous les champs")
      setLoading(false)
      return
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide")
      setLoading(false)
      return
    }

    // Validation salaire
    if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      setError("Veuillez entrer un salaire valide")
      setLoading(false)
      return
    }

    try {
      // Récupérer les employés existants
      const existingEmployees = localStorage.getItem("employees")
      const employees: Employee[] = existingEmployees ? JSON.parse(existingEmployees) : []

      // Vérifier si l'email existe déjà (sauf pour l'employé actuel)
      const emailExists = employees.some((emp: Employee) => emp.email === formData.email && emp.id !== employeeId)
      if (emailExists) {
        setError("Un autre employé avec cette adresse email existe déjà")
        setLoading(false)
        return
      }

      // Mettre à jour l'employé
      const updatedEmployees = employees.map((emp: Employee) => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            ...formData,
          }
        }
        return emp
      })

      localStorage.setItem("employees", JSON.stringify(updatedEmployees))

      setSuccess(true)

      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push("/employees")
      }, 2000)
    } catch (err) {
      setError("Une erreur est survenue lors de la modification de l'employé")
    }

    setLoading(false)
  }

  if (!employeeFound) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-orange-900 mb-2">Employé introuvable</h3>
              <p className="text-gray-500 mb-4">L'employé que vous cherchez à modifier n'existe pas.</p>
              <Link href="/employees">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux employés
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/employees">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux employés
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-orange-900">Modifier l'employé</h1>
          <p className="text-gray-600 mt-2">Modifiez les informations de l'employé</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="mr-2 h-5 w-5" />
              Informations de l'employé
            </CardTitle>
            <CardDescription>Tous les champs sont obligatoires</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  ✅ Employé modifié avec succès ! Redirection en cours...
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean.dupont@entreprise.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="01 23 45 67 89"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Poste *</Label>
                  <Input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Développeur Full Stack"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Département *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire mensuel (€) *</Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    placeholder="3500"
                    value={formData.salary}
                    onChange={handleChange}
                    min="0"
                    step="100"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? "Modification en cours..." : "Sauvegarder les modifications"}
                </Button>
                <Link href="/employees">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
