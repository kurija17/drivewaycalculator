'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Info } from 'lucide-react'
import Image from 'next/image'

const materials = {
  asphalt: { name: 'Asphalt', unit: 'ton', pricePerUnit: 100 },
  concrete: { name: 'Concrete', unit: 'cubic yard', pricePerUnit: 150 },
  gravel: { name: 'Gravel', unit: 'cubic yard', pricePerUnit: 50 },
  pavers: { name: 'Pavers', unit: 'square foot', pricePerUnit: 5 },
}

function calculateMaterials(length: number, width: number, depth: number, material: keyof typeof materials) {
  const area = length * width
  const volume = area * (depth / 12) // Convert depth to feet
  let quantity: number

  switch (material) {
    case 'asphalt':
      quantity = volume * 2 // Asphalt weighs about 2 tons per cubic yard
      break
    case 'concrete':
    case 'gravel':
      quantity = volume / 27 // Convert cubic feet to cubic yards
      break
    case 'pavers':
      quantity = area // Pavers are sold by square foot
      break
    default:
      quantity = 0
  }

  const cost = quantity * materials[material].pricePerUnit

  return { quantity: Math.ceil(quantity), cost: Math.ceil(cost) }
}

function CalculatorForm({ material }: { material: keyof typeof materials }) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor={`${material}-length`} className="text-base sm:text-lg md:text-xl font-medium tracking-tight">
            Length (feet)
          </Label>
          <Input
            id={`${material}-length`}
            type="number"
            min="0"
            step="0.1"
            required
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="h-12 md:h-14 px-4 text-base sm:text-lg md:text-xl bg-[#f6f6f7] text-[#1a2039] border-[#b0a36e]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${material}-width`} className="text-base sm:text-lg md:text-xl font-medium tracking-tight">
            Width (feet)
          </Label>
          <Input
            id={`${material}-width`}
            type="number"
            min="0"
            step="0.1"
            required
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="h-12 md:h-14 px-4 text-base sm:text-lg md:text-xl bg-[#f6f6f7] text-[#1a2039] border-[#b0a36e]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${material}-depth`} className="text-base sm:text-lg md:text-xl font-medium tracking-tight">
            Depth (inches)
          </Label>
          <Input
            id={`${material}-depth`}
            type="number"
            min="0"
            step="0.1"
            required
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="h-12 md:h-14 px-4 text-base sm:text-lg md:text-xl bg-[#f6f6f7] text-[#1a2039] border-[#b0a36e]"
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#b0a36e] text-[#1a2039] hover:bg-[#1a2039] hover:text-[#f6f6f7] text-base sm:text-lg font-medium tracking-tight"
      >
        Calculate
      </Button>
      {result && (
        <div className="mt-6 p-6 bg-[#f6f6f7] rounded-md text-[#1a2039] border border-[#b0a36e]">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-2">
            Estimated Materials:
          </p>
          <p className="text-base sm:text-lg mb-4">{result.quantity} {materials[material].unit}s of {materials[material].name}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-2">
            Estimated Cost:
          </p>
          <p className="text-base sm:text-lg">${result.cost.toLocaleString()}</p>
        </div>
      )}
    </form>
  )
}

function MaterialInfo({ material }: { material: keyof typeof materials }) {
  const info = {
    asphalt: "Asphalt is durable and cost-effective. It's ideal for larger driveways and can last up to 20 years with proper maintenance.",
    concrete: "Concrete is long-lasting and low-maintenance. It's versatile in terms of finish and color options, and can last 30+ years.",
    gravel: "Gravel is affordable and easy to install. It provides good drainage but requires regular maintenance to keep it level and weed-free.",
    pavers: "Pavers offer a wide variety of design options. They're durable, easy to repair, and can last 30-40 years with proper installation and care."
  }

  return (
    <Card className="mt-6 bg-white text-[#1a2039] border-[#b0a36e]">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
          About {materials[material].name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base sm:text-lg leading-relaxed">
          {info[material]}
        </p>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a2039] text-[#f6f6f7]">
      <header className="px-4 lg:px-6 h-14 md:h-16 lg:h-20 flex items-center justify-center border-b border-[#b0a36e]">
        <a className="flex items-center justify-center whitespace-nowrap" href="#">
          <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-2 text-[#b0a36e]" />
          <span className="font-medium text-sm md:text-base lg:text-lg tracking-tight">
            Driveway Calculator
          </span>
        </a>
      </header>

      <main className="flex-1">
        <section className="w-full px-4 py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56 bg-[#1a2039] flex items-center justify-center relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-driveway.jpg"
              alt="Modern driveway"
              fill
              className="object-cover opacity-70"
              priority
              sizes="100vw"
            />
          </div>
          
          <div className="absolute inset-0 bg-[#1a2039]/40 z-[1]"></div>
          
          <div className="container flex flex-col items-center justify-center relative z-10">
            <div className="w-full max-w-[90%] md:max-w-[800px] lg:max-w-[1500px] space-y-6 sm:space-y-8 md:space-y-10 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#b0a36e] to-[#f6f6f7] bg-clip-text text-transparent drop-shadow-sm leading-[1.1]">
                Driveway Material Calculator
              </h1>
              <p className="mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[700px] text-[#d9d8da] text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                Estimate materials and costs for your driveway project. Choose your material and enter your dimensions.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-16 sm:py-20 md:py-28 lg:py-32 bg-[#f6f6f7] flex items-center justify-center">
          <div className="container flex flex-col items-center justify-center">
            <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[900px]">
              <Tabs defaultValue="asphalt">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-[#1a2039] h-12 md:h-14 p-1.5 rounded-lg">
                  {Object.keys(materials).map((material) => (
                    <TabsTrigger 
                      key={material} 
                      value={material}
                      className="text-sm sm:text-base md:text-lg font-medium text-[#f6f6f7] data-[state=active]:bg-[#b0a36e] data-[state=active]:text-[#1a2039] tracking-tight h-full rounded-md"
                    >
                      {materials[material as keyof typeof materials].name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.keys(materials).map((material) => (
                  <TabsContent key={material} value={material}>
                    <Card className="bg-white text-[#1a2039] border-[#b0a36e] shadow-sm">
                      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                        <Image
                          src={`/images/${material}.jpg`}
                          alt={`${materials[material as keyof typeof materials].name} driveway`}
                          fill
                          className="object-cover rounded-t-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                          priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                            {materials[material as keyof typeof materials].name} Driveway
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6 md:p-8">
                        <CalculatorForm material={material as keyof typeof materials} />
                      </CardContent>
                    </Card>
                    <MaterialInfo material={material as keyof typeof materials} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-16 sm:py-20 md:py-28 lg:py-32 bg-[#232942] flex items-center justify-center">
          <div className="container flex flex-col items-center justify-center">
            <div className="w-full max-w-[90%] lg:max-w-[1200px]">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#b0a36e] to-[#f6f6f7] bg-clip-text text-transparent drop-shadow-sm">
                  Why Choose Our Calculator?
                </h2>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-[#d9d8da] font-light max-w-[800px] mx-auto">
                  Simplify your driveway planning with our comprehensive tools and features
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                <div className="bg-[#f6f6f7] rounded-lg text-[#1a2039] border border-[#b0a36e] overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="relative mx-auto w-full max-w-[300px] aspect-square overflow-hidden group rounded-lg flex items-center justify-center bg-[#eeeef0]">
                      <div className="relative w-[200px] h-[200px]">
                        <Image
                          src="/images/calculator.jpg"
                          alt="Calculator illustration"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          sizes="200px"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#1a2039] flex items-center tracking-tight">
                      <Calculator className="h-5 w-5 mr-2 text-[#b0a36e]" />
                      Instant Calculations
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-[#1a2039]/90">Get accurate material quantities and cost estimates in seconds.</p>
                  </div>
                </div>

                <div className="bg-[#f6f6f7] rounded-lg text-[#1a2039] border border-[#b0a36e] overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="relative mx-auto w-full max-w-[300px] aspect-square overflow-hidden group rounded-lg flex items-center justify-center bg-[#eeeef0]">
                      <div className="relative w-[200px] h-[200px]">
                        <Image
                          src="/images/cost-planning.jpg"
                          alt="Cost planning illustration"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          sizes="200px"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#1a2039] flex items-center tracking-tight">
                      <svg className="h-5 w-5 mr-2 text-[#b0a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cost Planning
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-[#1a2039]/90">Compare material costs easily and make informed decisions.</p>
                  </div>
                </div>

                <div className="bg-[#f6f6f7] rounded-lg text-[#1a2039] border border-[#b0a36e] overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="relative mx-auto w-full max-w-[300px] aspect-square overflow-hidden group rounded-lg flex items-center justify-center bg-[#eeeef0]">
                      <div className="relative w-[200px] h-[200px]">
                        <Image
                          src="/images/mobile-access.jpg"
                          alt="Mobile access illustration"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          sizes="200px"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#1a2039] flex items-center tracking-tight">
                      <svg className="h-5 w-5 mr-2 text-[#b0a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Convenient Access
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-[#1a2039]/90">Access our calculators 24/7 from any device.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-4 sm:py-6 px-4 md:px-6 border-t border-[#b0a36e] bg-[#1a2039]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
          <p className="text-sm md:text-base text-[#d9d8da] text-center sm:text-left font-light">
            © 2024 Driveway Calculator. All rights reserved.
          </p>
          <p className="text-sm md:text-base text-[#d9d8da] flex items-center gap-1 justify-center font-light">
            <Info className="h-3 w-3 sm:h-4 sm:w-4 text-[#b0a36e]" />
            <span className="hidden sm:inline">Disclaimer:</span> Estimates are approximate and may vary.
          </p>
        </div>
      </footer>
    </div>
  )
}