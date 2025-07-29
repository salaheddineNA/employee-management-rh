// Listes de données pour générer des employés aléatoires
const firstNames = [
  "Alexandre",
  "Antoine",
  "Arthur",
  "Baptiste",
  "Benjamin",
  "Camille",
  "Charles",
  "Clément",
  "David",
  "Étienne",
  "Fabien",
  "François",
  "Gabriel",
  "Guillaume",
  "Hugo",
  "Jean",
  "Julien",
  "Kevin",
  "Louis",
  "Lucas",
  "Marc",
  "Mathieu",
  "Maxime",
  "Nicolas",
  "Olivier",
  "Paul",
  "Pierre",
  "Quentin",
  "Raphaël",
  "Romain",
  "Sébastien",
  "Thomas",
  "Vincent",
  "Yann",
  "Adèle",
  "Amélie",
  "Anna",
  "Camille",
  "Caroline",
  "Charlotte",
  "Chloé",
  "Claire",
  "Élise",
  "Emma",
  "Eva",
  "Inès",
  "Julie",
  "Léa",
  "Lisa",
  "Louise",
  "Lucie",
  "Manon",
  "Marie",
  "Mathilde",
  "Océane",
  "Pauline",
  "Sarah",
  "Sophie",
  "Valerie",
  "Zoé",
]

const lastNames = [
  "Martin",
  "Bernard",
  "Thomas",
  "Petit",
  "Robert",
  "Richard",
  "Durand",
  "Dubois",
  "Moreau",
  "Laurent",
  "Simon",
  "Michel",
  "Lefebvre",
  "Leroy",
  "Roux",
  "David",
  "Bertrand",
  "Morel",
  "Fournier",
  "Girard",
  "Bonnet",
  "Dupont",
  "Lambert",
  "Fontaine",
  "Rousseau",
  "Vincent",
  "Muller",
  "Lefevre",
  "Faure",
  "Andre",
  "Mercier",
  "Blanc",
  "Guerin",
  "Boyer",
  "Garnier",
  "Chevalier",
  "Francois",
  "Legrand",
  "Gauthier",
  "Garcia",
  "Perrin",
  "Robin",
  "Clement",
  "Morin",
  "Nicolas",
  "Henry",
  "Roussel",
  "Mathieu",
  "Gautier",
  "Masson",
]

const positions = [
  "Développeur Full Stack",
  "Développeur Frontend",
  "Développeur Backend",
  "Chef de Projet",
  "Product Manager",
  "UX/UI Designer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Architecte Logiciel",
  "Responsable RH",
  "Assistante RH",
  "Chargé de Recrutement",
  "Gestionnaire Paie",
  "Responsable Formation",
  "Analyste Financier",
  "Comptable",
  "Contrôleur de Gestion",
  "Directeur Financier",
  "Assistant Comptable",
  "Responsable Marketing",
  "Chargé de Communication",
  "Community Manager",
  "Content Manager",
  "SEO Specialist",
  "Commercial Senior",
  "Chargé d'Affaires",
  "Business Developer",
  "Account Manager",
  "Responsable Ventes",
  "Responsable Production",
  "Technicien",
  "Ingénieur Qualité",
  "Superviseur",
  "Opérateur",
  "Responsable Logistique",
  "Gestionnaire Stock",
  "Coordinateur Supply Chain",
  "Préparateur Commandes",
]

const departments = ["IT", "RH", "Finance", "Marketing", "Ventes", "Production", "Logistique"]

const departmentPositions: { [key: string]: string[] } = {
  IT: [
    "Développeur Full Stack",
    "Développeur Frontend",
    "Développeur Backend",
    "Chef de Projet",
    "Product Manager",
    "UX/UI Designer",
    "Data Analyst",
    "Data Scientist",
    "DevOps Engineer",
    "Architecte Logiciel",
  ],
  RH: ["Responsable RH", "Assistante RH", "Chargé de Recrutement", "Gestionnaire Paie", "Responsable Formation"],
  Finance: ["Analyste Financier", "Comptable", "Contrôleur de Gestion", "Directeur Financier", "Assistant Comptable"],
  Marketing: [
    "Responsable Marketing",
    "Chargé de Communication",
    "Community Manager",
    "Content Manager",
    "SEO Specialist",
  ],
  Ventes: ["Commercial Senior", "Chargé d'Affaires", "Business Developer", "Account Manager", "Responsable Ventes"],
  Production: ["Responsable Production", "Technicien", "Ingénieur Qualité", "Superviseur", "Opérateur"],
  Logistique: ["Responsable Logistique", "Gestionnaire Stock", "Coordinateur Supply Chain", "Préparateur Commandes"],
}

const salaryRanges: { [key: string]: { min: number; max: number } } = {
  IT: { min: 3500, max: 6500 },
  RH: { min: 3000, max: 5500 },
  Finance: { min: 3200, max: 6000 },
  Marketing: { min: 3000, max: 5000 },
  Ventes: { min: 3500, max: 5500 },
  Production: { min: 2800, max: 4500 },
  Logistique: { min: 2800, max: 4200 },
}

// Fonction pour générer un numéro de téléphone français aléatoire
const generatePhoneNumber = (): string => {
  const prefixes = ["01", "02", "03", "04", "05", "06", "07"]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const numbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("")
  return `${prefix} ${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6, 8)}`
}

// Fonction pour générer une date d'embauche aléatoire
const generateJoinDate = (): string => {
  const start = new Date(2020, 0, 1) // 1er janvier 2020
  const end = new Date() // Aujourd'hui
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  return new Date(randomTime).toISOString()
}

// Fonction pour générer un email à partir du nom et prénom
const generateEmail = (firstName: string, lastName: string): string => {
  const cleanFirstName = firstName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  const cleanLastName = lastName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  return `${cleanFirstName}.${cleanLastName}@entreprise.com`
}

// Fonction pour générer un employé aléatoire
export const generateRandomEmployee = (existingEmails: string[] = []): any => {
  let firstName: string
  let lastName: string
  let email: string

  // Générer un email unique
  do {
    firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    email = generateEmail(firstName, lastName)
  } while (existingEmails.includes(email))

  const department = departments[Math.floor(Math.random() * departments.length)]
  const departmentPositionsList = departmentPositions[department]
  const position = departmentPositionsList[Math.floor(Math.random() * departmentPositionsList.length)]

  const salaryRange = salaryRanges[department]
  const salary = Math.floor(Math.random() * (salaryRange.max - salaryRange.min + 1)) + salaryRange.min

  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: `${firstName} ${lastName}`,
    email,
    phone: generatePhoneNumber(),
    position,
    department,
    salary: salary.toString(),
    dateJoined: generateJoinDate(),
  }
}

// Fonction pour générer plusieurs employés aléatoires
export const generateMultipleRandomEmployees = (count: number, existingEmployees: any[] = []): any[] => {
  const existingEmails = existingEmployees.map((emp) => emp.email)
  const newEmployees = []

  for (let i = 0; i < count; i++) {
    const newEmployee = generateRandomEmployee([...existingEmails, ...newEmployees.map((emp) => emp.email)])
    newEmployees.push(newEmployee)
  }

  return newEmployees
}
