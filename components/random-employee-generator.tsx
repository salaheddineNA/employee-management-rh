"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shuffle, Plus } from "lucide-react"
import { generateMultipleRandomEmployees } from "@/lib/random-employee-generator"

interface RandomEmployeeGeneratorProps {
  onGenerate: (employees: any[]) => void
  existingEmployees: any[]
}

export default function RandomEmployeeGenerator({ onGenerate, existingEmployees }: RandomEmployeeGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const newEmployees = generateMultipleRandomEmployees(count, existingEmployees)
      onGenerate(newEmployees)
      setIsOpen(false)

      // Petit délai pour l'effet visuel
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
    }

    setIsGenerating(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Shuffle className="mr-2 h-4 w-4" />
          Générer des employés
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shuffle className="mr-2 h-5 w-5" />
            Générer des employés aléatoires
          </DialogTitle>
          <DialogDescription>
            Créez automatiquement des employés avec des données réalistes pour tester l'application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="count" className="text-right">
              Nombre
            </Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number.parseInt(e.target.value) || 1)))}
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-gray-500">
            <p>• Noms et prénoms français aléatoires</p>
            <p>• Postes cohérents avec les départements</p>
            <p>• Emails, téléphones et salaires réalistes</p>
            <p>• Dates d'embauche variées (2020-2024)</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                Génération...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Générer {count} employé{count > 1 ? "s" : ""}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
