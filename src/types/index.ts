export type ProductCategory = 'all' | 'climate' | 'dosing' | 'sensors' | 'cloud';

export interface ProductItem {
  id: string;
  modelCode: string;
  name: string;
  category: 'climate' | 'dosing' | 'sensors' | 'cloud';
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  specs: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  connectivity: string;
  power: string;
  idealFor: string;
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
  category: 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures';
  title: string;
  product: string;
  version: string;
  fileSize: string;
  date: string;
}
