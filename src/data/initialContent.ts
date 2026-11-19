import type { 
  SiteContentData, 
  HeroSlideItem, 
  ShowcaseSectionItem, 
  SupportContacts 
} from '../types';
import { STORE_PRODUCTS, BLOG_POSTS, DISTRIBUTORS_DATA } from './mockProducts';
import heroGreenhouseImg from '../assets/hero-commercial-greenhouse.jpg';

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'autogrow-banner',
    tag: 'Growing Automation',
    title: 'Growing Automation Tailored to Your Needs',
    subtitle: 'Over 30 years of precision commercial greenhouse automation across 27+ countries with 5 billion crop data points.',
    image: heroGreenhouseImg,
    buttonText: '',
    targetSection: 'suite',
    isBannerOnly: true,
  },
  {
    id: 'multigrow',
    tag: 'MultiGrow Pro',
    title: 'MultiGrow™ Pro Master',
    subtitle: 'Empowering commercial growers with Reliable & Precision Automation for over 30 years.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Explore MultiGrow System',
    targetSection: 'suite',
  },
  {
    id: 'fertix',
    tag: 'SatuGrow FertiX',
    title: 'SatuGrow™ FertiX Skid',
    subtitle: 'High-Volume Inline Fertigation up to 100 m³/hr with Closed-Loop Proportional EC/pH Dosing.',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Explore Fertigation Skids',
    targetSection: 'suite',
  },
  {
    id: 'farmroad',
    tag: 'FarmRoad AI',
    title: 'FarmRoad™ Agronomy AI',
    subtitle: 'Autonomous Yield Forecasting, Plant Microclimate Analysis & 24/7 Crop Steering.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Explore Agronomy Cloud',
    targetSection: 'suite',
  },
];

export const DEFAULT_SHOWCASE_SECTIONS: ShowcaseSectionItem[] = [
  {
    id: 'indoor-elevated',
    title: 'Commercial Environmental Control Elevated',
    description: 'Achieve precision indoor growing with MultiGrow controls, IntelliClimate, and EnviroSensors working in harmony. Automate every detail from ventilation to VPD for healthier plants, higher yields, and unmatched consistency.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Learn more',
    targetSection: 'suite',
  },
  {
    id: 'greenhouse-smarter',
    title: 'Greenhouse Growing Smarter, Stronger',
    description: 'Unlock the full potential of your commercial greenhouse with complete multi-compartment automation. From ridge vents and thermal screens to CO2 enrichment and supplemental lighting, everything works together for higher yields, lower costs, and peace of mind.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Learn more',
    targetSection: 'suite',
  },
  {
    id: 'irrigation-smarter',
    title: 'The Fertigation is Smarter with Absolute Ease',
    description: 'Say goodbye to guesswork and complex timers. Our "feed-on-demand" proportional injection measures return drain EC and substrate moisture to deliver precise, automated irrigation with absolute ease.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Learn more',
    targetSection: 'suite',
  },
  {
    id: 'safe-compliant',
    title: 'Safe, Compliant & Fail-Safe Protection',
    description: 'Autogrow gives large-scale commercial facilities peace of mind. Galvanic isolation, industrial IP66 die-cast enclosures, and instant alert relays ensure your facility stays protected 24/7.',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Learn more',
    targetSection: 'where-to-buy',
  },
];

export const DEFAULT_SUPPORT_CONTACTS: SupportContacts = {
  phoneNz: '+64 9 415 2380',
  phoneUs: '+1 (800) 852-3088',
  phoneSea: '+60 3-8023 2388',
  supportHours: 'Mon–Fri 11:00 AM – 5:00 PM (NZST)',
  emailHelp: 'help@autogrow.com',
  emailEngineering: 'engineering@autogrow.com',
  emailAgronomy: 'agronomy@autogrow.com',
};

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  heroSlides: DEFAULT_HERO_SLIDES,
  showcaseSections: DEFAULT_SHOWCASE_SECTIONS,
  storeProducts: STORE_PRODUCTS,
  blogPosts: BLOG_POSTS,
  distributors: DISTRIBUTORS_DATA,
  supportContacts: DEFAULT_SUPPORT_CONTACTS,
  lastUpdated: new Date().toISOString(),
};
