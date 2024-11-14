'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { materials, calculateMaterials } from '@/lib/calculator'
import { notFound } from 'next/navigation'

export default function MaterialPage({ 
  params,
}: {
  params: { material: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const material = params.material as keyof typeof materials

  if (!materials[material]) {
    notFound()
  }

  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [result, setResult] = useState<{
    thickness: number;
    quantity: number;
    cost: number;
    installationCost: number;
    totalCost: number;
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const calc = calculateMaterials(Number(length), Number(width), Number(depth), material)
    if (calc) {
      setResult({
        thickness: 0,
        quantity: calc.quantity,
        cost: calc.cost,
        installationCost: calc.installationCost,
        totalCost: calc.totalCost
      })
    }
  }

  const materialInfo = {
    asphalt: {
      benefits: [
        "Cost-effective and quick installation",
        "Flexible material that resists cracking",
        "Can be used immediately after installation",
        "Easy to repair and maintain",
        "Dark color hides stains and tire marks"
      ],
      importance: [
        "Proper depth is crucial for longevity",
        "Professional installation recommended",
        "20+ year lifespan with proper maintenance",
        "Ideal for cold climates due to flexibility"
      ],
      maintenance: "Requires sealing every 3-5 years for optimal performance"
    },
    concrete: {
      benefits: [
        "Extremely durable and long-lasting",
        "Minimal maintenance required",
        "Increases property value",
        "Various decorative options available",
        "Excellent load-bearing capacity"
      ],
      importance: [
        "Superior durability (30+ year lifespan)",
        "Higher upfront cost but lower long-term maintenance",
        "Ideal for hot climates",
        "Requires proper curing time"
      ],
      maintenance: "Minimal maintenance needed, occasional cleaning and sealing recommended"
    },
    gravel: {
      benefits: [
        "Most economical option",
        "Excellent drainage properties",
        "Easy DIY installation",
        "Natural, rustic appearance",
        "Environmentally friendly"
      ],
      importance: [
        "Requires proper grading for drainage",
        "Multiple layers needed for stability",
        "Good for temporary or rural driveways",
        "Easily customizable and expandable"
      ],
      maintenance: "Annual replenishment may be needed, regular raking required"
    },
    pavers: {
      benefits: [
        "Elegant and customizable appearance",
        "Easy to repair individual pieces",
        "Excellent drainage when properly installed",
        "High durability and load capacity",
        "Increases property value significantly"
      ],
      importance: [
        "Requires proper installation and maintenance",
        "Higher upfront cost but long-lasting",
        "Ideal for high-traffic areas",
        "Requires professional installation"
      ],
      maintenance: "Regular cleaning and occasional sealing recommended"
    }
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

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-[1200px] mx-auto bg-white text-[#1a2039] border-[#b0a36e]">
          <div className="relative w-full h-[400px]">
            <Image
              src={`/images/${material}.jpg`}
              alt={`${materials[material].name} driveway`}
              fill
              className="object-cover rounded-t-lg"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                {materials[material].name} Calculator
              </h1>
            </div>
          </div>
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="length" className="text-lg">Length (feet)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="Enter length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      required
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="width" className="text-lg">Width (feet)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="Enter width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      required
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="depth" className="text-lg">Depth (inches)</Label>
                    <Input
                      id="depth"
                      type="number"
                      placeholder="Enter depth"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      required
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-[#b0a36e] hover:bg-[#8f845a] transition-colors"
                >
                  Calculate
                </Button>
              </form>
              
              {result && (
                <div className="mt-8 p-8 bg-[#f6f6f7] rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Cost Breakdown</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Required {materials[material].name}</p>
                        <p className="text-xl font-semibold">
                          {result.quantity.toFixed(2)} {materials[material].unit}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Material Cost</p>
                        <p className="text-xl font-semibold">
                          ${result.cost.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {result.installationCost > 0 && (
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Estimated Installation Cost</p>
                        <p className="text-xl font-semibold">
                          ${result.installationCost.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="bg-[#1a2039] text-white p-4 rounded-md">
                      <p className="text-gray-300">Total Estimated Cost</p>
                      <p className="text-2xl font-bold">
                        ${result.totalCost.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-md text-sm text-gray-600">
                      <p className="font-medium">Note:</p>
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li>Prices include {material === 'asphalt' || material === 'concrete' ? 'standard installation' : 'materials only'}</li>
                        <li>Additional costs may apply for site preparation</li>
                        <li>Prices may vary based on your location</li>
                        <li>For accurate quotes, please consult local contractors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 p-8 bg-[#f6f6f7] rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Material Information</h3>
                <div className="space-y-3 text-lg">
                  <p>Price per {materials[material].unit}: ${materials[material].pricePerUnit.toFixed(2)}</p>
                  <ul>
                    {materialInfo[material].benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <p>Importance:</p>
                  <ul>
                    {materialInfo[material].importance.map((importance, index) => (
                      <li key={index}>{importance}</li>
                    ))}
                  </ul>
                  <p>Maintenance:</p>
                  <p>{materialInfo[material].maintenance}</p>
                </div>
              </div>

              {result && material === 'asphalt' && (
                <div className="mt-8 p-8 bg-[#f6f6f7] rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Asphalt Cost Breakdown</h3>
                  <div className="space-y-4">
                    {/* Material Quantities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Required Asphalt</p>
                        <p className="text-xl font-semibold">
                          {result.quantity.toFixed(2)} tons
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          At ${materials.asphalt.pricePerUnit}/ton
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Area to Cover</p>
                        <p className="text-xl font-semibold">
                          {result.quantity * 2000 / (materials.asphalt.density * result.thickness/12)} sq ft
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Depth: {result.thickness} inches
                        </p>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Material Cost</p>
                        <p className="text-xl font-semibold">
                          ${result.cost.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Base material only
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md">
                        <p className="text-gray-600">Installation Cost</p>
                        <p className="text-xl font-semibold">
                          ${result.installationCost.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Labor and equipment
                        </p>
                      </div>
                    </div>

                    {/* Total Cost */}
                    <div className="bg-[#1a2039] text-white p-6 rounded-md">
                      <p className="text-gray-300">Total Estimated Cost</p>
                      <p className="text-3xl font-bold">
                        ${result.totalCost.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        (${(result.totalCost / (result.quantity * 2000 / (materials.asphalt.density * result.thickness/12))).toFixed(2)} per square foot)
                      </p>
                    </div>

                    {/* Important Notes */}
                    <div className="mt-4 p-4 bg-white rounded-md text-sm text-gray-600">
                      <p className="font-medium">Important Notes:</p>
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li>Price includes hot-mix asphalt material at {materials.asphalt.density} lbs/cubic foot</li>
                        <li>Installation includes grading, compaction, and finishing</li>
                        <li>Additional costs may apply for:</li>
                        <ul className="list-circle ml-6 mt-1">
                          <li>Site preparation and excavation</li>
                          <li>Base material (crushed aggregate)</li>
                          <li>Drainage solutions if needed</li>
                          <li>Permits and inspections</li>
                        </ul>
                        <li>Prices may vary based on project location and complexity</li>
                        <li>Minimum project sizes may apply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}