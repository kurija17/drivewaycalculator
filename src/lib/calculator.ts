export const materials = {
  asphalt: { 
    name: 'Asphalt', 
    unit: 'ton', 
    pricePerUnit: 120, // $120-150 per ton
    density: 145, // pounds per cubic foot
    note: 'Price includes base material. Installation typically adds $2-4 per square foot.'
  },
  concrete: { 
    name: 'Concrete', 
    unit: 'square foot', 
    pricePerUnit: 8.50, // $8-10 per square foot installed
    note: 'Price includes professional installation. Basic concrete finish, decorative finishes will cost more.'
  },
  gravel: { 
    name: 'Gravel', 
    unit: 'cubic yard', 
    pricePerUnit: 65, // Base price per cubic yard
    deliveryFee: 150, // Base delivery fee
    note: 'Prices vary by gravel type and quantity. Delivery fees depend on distance.',
    types: {
      'crushed-stone': { name: 'Crushed Stone (#57)', pricePerUnit: 65 },
      'pea-gravel': { name: 'Pea Gravel', pricePerUnit: 70 },
      'river-rock': { name: 'River Rock', pricePerUnit: 75 },
      'crushed-granite': { name: 'Crushed Granite', pricePerUnit: 85 }
    }
  },
  pavers: { 
    name: 'Pavers', 
    unit: 'square foot', 
    pricePerUnit: 12, // $10-15 per square foot for materials
    note: 'Material only. Professional installation adds $10-15 per square foot.'
  }
};

export function calculateMaterials(
  length: number,
  width: number,
  depth: number,
  material: keyof typeof materials
): { 
  quantity: number; 
  cost: number; 
  installationCost: number; 
  totalCost: number; 
  details?: {    // Replace any with an object type
    area: number;
    depth: number;
    volume: number;
  }
} | null {
  if (!length || !width || !depth) return null;
  
  const area = length * width; // square feet
  const volume = area * (depth / 12); // cubic feet

  if (material === 'asphalt') {
    // Convert cubic feet to tons using asphalt density
    const weightInPounds = volume * materials.asphalt.density;
    const weightInTons = weightInPounds / 2000; // Convert pounds to tons
    
    const materialCost = weightInTons * materials.asphalt.pricePerUnit;
    const installationCost = area * 3; // $3 per square foot installation
    
    return {
      quantity: weightInTons,
      cost: materialCost,
      installationCost,
      totalCost: materialCost + installationCost,
      details: {
        area,
        depth,
        volume
      }
    };
  }
  
  let quantity: number;
  let materialCost: number;
  let installationCost: number;
  
  switch(material) {
    case 'concrete':
      // Concrete is priced per square foot
      quantity = area;
      materialCost = area * materials.concrete.pricePerUnit;
      installationCost = 0; // Installation included in price
      break;

    case 'gravel':
      // Gravel is priced per cubic yard (27 cubic feet = 1 cubic yard)
      quantity = volume / 27;
      materialCost = quantity * materials.gravel.pricePerUnit;
      installationCost = area * 3.50; // Average installation cost of $3.50 per square foot
      break;

    case 'pavers':
      // Pavers are priced per square foot
      quantity = area;
      materialCost = area * materials.pavers.pricePerUnit;
      installationCost = area * 12.50; // Average installation cost of $12.50 per square foot
      break;

    default:
      return null;
  }

  const totalCost = materialCost + installationCost;
  
  return {
    quantity,
    cost: materialCost,
    installationCost,
    totalCost
  };
}

// Change to React component
export const MaterialInfo = ({ material }: { material: keyof typeof materials }) => {
  const info = materials[material];
  return `${info.name} costs $${info.pricePerUnit} per ${info.unit}`;
}

interface GravelCalculation {
  area: number;           // square feet
  volumeCubicFeet: number;
  volumeCubicYards: number;
  materialCost: number;
  totalCost: number;
  pricePerSquareFoot: number;
}

interface GravelCalculation {
  area: number;
  volumeCubicFeet: number;
  volumeCubicYards: number;
  tons: number;           // Add this line
  materialCost: number;
  totalCost: number;
  pricePerSquareFoot: number;
  pricePerUnit: number;
}

export function calculateGravel(
  length: number,
  width: number,
  depth: number,
  gravelType: keyof typeof materials.gravel.types,
  customPrice?: number
): GravelCalculation {
  // Calculate area in square feet
  const area = length * width;
  
  // Convert depth to feet and calculate volume
  const depthInFeet = depth / 12;
  const volumeCubicFeet = area * depthInFeet;
  
  // Convert to cubic yards (rounded to 1 decimal)
  const volumeCubicYards = Number((volumeCubicFeet / 27).toFixed(1));
  
  // Calculate tons (rounded to 1 decimal)
  const tons = Number((volumeCubicYards * 1.35).toFixed(1));
  
  // Use 0 instead of the default material price when customPrice is undefined
  const pricePerUnit = customPrice ?? 0;
  const materialCost = volumeCubicYards * pricePerUnit;
  const totalCost = materialCost;
  const pricePerSquareFoot = totalCost / area;
  
  return {
    area,
    volumeCubicFeet,
    volumeCubicYards,
    tons,
    materialCost,
    totalCost,
    pricePerSquareFoot,
    pricePerUnit
  };
}