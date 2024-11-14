export const materials = {
  asphalt: { name: 'Asphalt', unit: 'ton', pricePerUnit: 100 },
  concrete: { name: 'Concrete', unit: 'cubic yard', pricePerUnit: 150 },
  gravel: { name: 'Gravel', unit: 'cubic yard', pricePerUnit: 50 },
  pavers: { name: 'Pavers', unit: 'square foot', pricePerUnit: 5 },
}

export function calculateMaterials(length: number, width: number, depth: number, material: keyof typeof materials) {
  // Move existing calculation function here
}

export function MaterialInfo({ material }: { material: keyof typeof materials }) {
  // Move existing MaterialInfo component here
} 