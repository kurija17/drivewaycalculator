'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateGravel } from '@/lib/calculator'
import Image from 'next/image'
import Link from 'next/link'
import { Calculator } from 'lucide-react'

interface CalculationResult {
  area: number;
  volumeCubicYards: number;
  tons: number;
  materialCost: number;
  pricePerUnit: number;
  pricePerSquareFoot: number;
  totalCost: number;
}

export default function GravelCalculator() {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    depth: '',
  });
  const [customPrice, setCustomPrice] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    
    const calc = calculateGravel(
      Number(dimensions.length),
      Number(dimensions.width),
      Number(dimensions.depth),
      'crushed-stone',
      customPrice ? Number(customPrice) : undefined
    );
    
    setResult(calc);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#1a2039] text-[#f6f6f7] px-4 lg:px-6 h-14 md:h-16 lg:h-20 flex items-center justify-between border-b border-[#b0a36e]">
        <Link href="/" className="flex items-center whitespace-nowrap">
          <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-2 text-[#b0a36e]" />
          <span className="font-medium text-sm md:text-base lg:text-lg tracking-tight">
            Driveway Calculator
          </span>
        </Link>
      </header>

      <section className="relative h-[600px] min-h-[400px] max-h-[80vh]">
        <Image
          src="/images/gravel.jpg"
          alt="Gravel driveway"
          fill
          className="object-cover object-bottom"
          priority
        />
        <div className="absolute inset-0 bg-[#1a2039]/40 z-[1]"></div>
        <div className="absolute inset-0 z-[2]">
          <div className="container mx-auto h-full px-4 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter whitespace-nowrap bg-gradient-to-r from-[#f6f6f7] via-[#f6f6f7] via-[#f6f6f7] to-[#b0a36e] text-transparent bg-clip-text">
              Gravel Driveway Calculator
            </h1>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#b0a36e] to-[#f6f6f7] bg-clip-text text-transparent drop-shadow-sm mb-6 max-w-[1200px] mx-auto">
            Calculator
          </h2>
          
          <Card className="max-w-[1200px] mx-auto bg-white border-[#b0a36e]">
            <CardContent className="py-12 px-6">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleCalculate} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="length" className="text-xl font-bold text-[#1a2039]">Length (feet)</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="Enter length"
                        value={dimensions.length}
                        onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                        required
                        className="h-14 text-3xl px-4 [&::-webkit-inner-spin-button]:appearance-none text-[#1a2039]"
                        style={{ fontSize: '1.75rem' }}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="width" className="text-xl font-bold text-[#1a2039]">Width (feet)</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="Enter width"
                        value={dimensions.width}
                        onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                        required
                        className="h-14 text-3xl px-4 [&::-webkit-inner-spin-button]:appearance-none text-[#1a2039]"
                        style={{ fontSize: '1.75rem' }}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="depth" className="text-xl font-bold text-[#1a2039]">Depth (inches)</Label>
                      <Input
                        id="depth"
                        type="number"
                        placeholder="Enter depth"
                        value={dimensions.depth}
                        onChange={(e) => setDimensions(prev => ({ ...prev, depth: e.target.value }))}
                        required
                        className="h-14 text-3xl px-4 [&::-webkit-inner-spin-button]:appearance-none text-[#1a2039]"
                        style={{ fontSize: '1.75rem' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-xl font-bold text-[#1a2039]">Price per Cubic Yard (optional)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price per cubic yard"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="h-14 text-3xl px-4 [&::-webkit-inner-spin-button]:appearance-none text-[#1a2039]"
                      style={{ fontSize: '1.75rem' }}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-16 text-xl font-medium bg-[#b0a36e] hover:bg-[#8f845a] transition-colors text-[#f6f6f7]"
                  >
                    Calculate
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#b0a36e] to-[#f6f6f7] bg-clip-text text-transparent drop-shadow-sm mb-6 max-w-[1200px] mx-auto">
            Calculation Results
          </h2>

          <Card className="max-w-[1200px] mx-auto bg-white border-[#b0a36e]">
            <CardContent className="py-12 px-6">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[#1a2039] mb-4">Dimensions</h4>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90 mb-2">Area: {result ? result.area.toFixed(2) : '--'} sq ft</p>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90 mb-2">Volume: {result ? result.volumeCubicYards.toFixed(1) : '--'} cubic yards</p>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90">Weight: {result ? result.tons.toFixed(1) : '--'} tons</p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[#1a2039] mb-4">Cost Breakdown</h4>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90 mb-2">Material Cost: ${result ? result.materialCost.toFixed(2) : '--'}</p>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90 mb-2">Price per Cubic Yard: ${result ? result.pricePerUnit.toFixed(2) : '--'}</p>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90 mb-2">Price per Cubic Foot: ${result ? (result.pricePerUnit / 27).toFixed(2) : '--'}</p>
                      <p className="text-base sm:text-lg md:text-xl text-[#1a2039]/90">Price per Square Foot: ${result ? result.pricePerSquareFoot.toFixed(2) : '--'}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-blue-900 mb-4">Estimated Total Cost</h4>
                    {result && !customPrice ? (
                      <div className="text-blue-900">
                        <p className="text-base sm:text-lg md:text-xl font-medium">Please enter Price per Cubic Yard to calculate total cost</p>
                        <p className="text-sm sm:text-base md:text-lg mt-2 italic">Input the price above and click Calculate</p>
                      </div>
                    ) : (
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                        ${result ? result.totalCost.toFixed(2) : '--'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-[#1a2039] text-[#f6f6f7] border-t border-[#b0a36e] py-6 px-4 mt-auto">
        <div className="container mx-auto text-center text-sm text-[#f6f6f7]/60">
          <p>© 2024 Driveway Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}