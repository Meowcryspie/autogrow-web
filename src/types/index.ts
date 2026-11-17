export type ProductCategory = 'all' | 'controllers' | 'dosing-skids' | 'sensors' | 'software';

export interface ProductItem {
  id: string;
  modelCode: string;
  name: string;
  category: 'controllers' | 'dosing-skids' | 'sensors' | 'software';
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  capacity?: string;
  specs: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  connectivity: string;
  power: string;
  idealFor: string;
  terminalPinout?: {
    terminal: string;
    signal: string;
    spec: string;
  }[];
}

export interface EcosystemNode {
  id: string;
  name: string;
  code: string;
  role: 'brain' | 'sensor' | 'actuator' | 'cloud';
  categoryTitle: string;
  description: string;
  specs: string;
  iconName: string;
}

export interface CropSolution {
  id: string;
  name: string;
  scientificGroup: string;
  targetVPD: string;
  targetEC: string;
  targetPH: string;
  targetDryback: string;
  irrigationStrategy: string;
  recommendedHardware: string[];
  description: string;
  image: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
}

export interface DownloadItem {
  id: string;
  category: 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures' | 'CAD';
  title: string;
  product: string;
  version: string;
  fileSize: string;
  date: string;
}

export interface DistributorLocation {
  id: string;
  region: string;
  country: string;
  partnerName: string;
  territory: string;
  supportPhone: string;
  email: string;
  website?: string;
  address?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
  image: string;
}

export interface StoreProduct {
  id: string;
  modelCode: string;
  name: string;
  category: 'controllers' | 'hardware' | 'parts';
  price: number;
  inStock: boolean;
  image: string;
  description: string;
  specs: string;
}
