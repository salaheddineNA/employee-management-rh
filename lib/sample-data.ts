export const sampleEmployees = [
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
    name: "Léa Bonnet",
    email: "lea.bonnet@entreprise.com",
    phone: "01 23 45 67 99",
    position: "Data Analyst",
    department: "IT",
    salary: "4100",
    dateJoined: "2023-03-10T00:00:00.000Z",
  },
  {
    id: "12",
    name: "Antoine Durand",
    email: "antoine.durand@entreprise.com",
    phone: "01 23 45 68 00",
    position: "Responsable Logistique",
    department: "Logistique",
    salary: "4400",
    dateJoined: "2022-07-25T00:00:00.000Z",
  },
  {
    id: "13",
    name: "Chloé Simon",
    email: "chloe.simon@entreprise.com",
    phone: "01 23 45 68 01",
    position: "Community Manager",
    department: "Marketing",
    salary: "3400",
    dateJoined: "2023-04-12T00:00:00.000Z",
  },
  {
    id: "14",
    name: "Maxime Michel",
    email: "maxime.michel@entreprise.com",
    phone: "01 23 45 68 02",
    position: "DevOps Engineer",
    department: "IT",
    salary: "4700",
    dateJoined: "2022-12-08T00:00:00.000Z",
  },
  {
    id: "15",
    name: "Sarah Garcia",
    email: "sarah.garcia@entreprise.com",
    phone: "01 23 45 68 03",
    position: "Contrôleur de Gestion",
    department: "Finance",
    salary: "4300",
    dateJoined: "2023-01-30T00:00:00.000Z",
  },
]

// Fonction utilitaire pour initialiser les données d'exemple
export const initializeSampleData = () => {
  const existingEmployees = localStorage.getItem("employees")
  if (!existingEmployees) {
    localStorage.setItem("employees", JSON.stringify(sampleEmployees))
    return sampleEmployees
  }
  return JSON.parse(existingEmployees)
}

// Fonction pour réinitialiser avec les données d'exemple
export const resetToSampleData = () => {
  localStorage.setItem("employees", JSON.stringify(sampleEmployees))
  return sampleEmployees
}
