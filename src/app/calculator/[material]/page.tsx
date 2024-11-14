'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { materials, calculateMaterials, MaterialInfo } from '@/lib/calculator'
import { notFound } from 'next/navigation'

export default function CalculatorPage({ params }: { params: { material: string } }) {
  const material = params.material as keyof typeof materials

  // Validate material exists
  if (!materials[material]) {
    notFound()
  }

  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [result, setResult] = useState<{ quantity: number; cost: number } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const calc = calculateMaterials(Number(length), Number(width), Number(depth), material)
    setResult(calc)
  }

  return (
    <div className="min-h-screen bg-[#1a2039] text-[#f6f6f7]">
      <header className="px-4 lg:px-6 h-14 md:h-16 lg:h-20 flex items-center justify-between border-b border-[#b0a36e]">
        <Link href="/" className="flex items-center whitespace-nowrap">
          <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-2 text-[#b0a36e]" />
          <span className="font-medium text-sm md:text-base lg:text-lg tracking-tight">
            Driveway Calculator
          </span>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-[800px] mx-auto bg-white text-[#1a2039] border-[#b0a36e]">
          <div className="relative w-full h-[300px]">
            <Image
              src={`/images/${material}.jpg`}
              alt={`${materials[material].name} driveway`}
              fill
              className="object-cover rounded-t-lg"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                {materials[material].name} Calculator
              </h1>
            </div>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Keep existing form content */}
            </form>
            {result && (
              <div className="mt-6 p-6 bg-[#f6f6f7] rounded-md">
                {/* Keep existing result display */}
              </div>
            )}
          </CardContent>
        </Card>
        <MaterialInfo material={material} />
      </main>
    </div>
  )
} 