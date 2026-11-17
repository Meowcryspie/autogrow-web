import type { ProductItem, EcosystemNode, SolutionItem, DownloadItem } from '../types';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'multigrow-pro',
    modelCode: 'MGC-Pro',
    name: 'MultiGrow Pro Commercial Master',
    category: 'climate',
    badge: 'FLAGSHIP COMMERCIAL',
    tagline: 'Multi-Compartment Climate & Irrigation Automation Brain',
    description:
      'Engineered for commercial glasshouses and complex multi-zone indoor facilities. Simultaneously coordinates up to 16 distinct climate zones with intelligent solar radiation lookahead, 3-tier ventilation stages, curtain drive motors, and integrated fertigation schedules.',
    image: 'assets/images/hero-greenhouse.jpg',
    specs: [
      { label: 'Control Zones', value: '1 to 16 Compartments' },
      { label: 'Sensor Bus', value: 'Dual RS-485 / Modbus RTU + RJ12' },
      { label: 'Display', value: '10.1" Capacitive Optical Touchscreen' },
      { label: 'Relay Channels', value: '32 Expandable Solid-State Outputs' },
      { label: 'Fail-Safe', value: 'Hardware Watchdog + Manual Overrides' },
    ],
    keyFeatures: [
      'Multi-compartment independent VPD, temperature, and CO2 recipes',
      'Solar radiation integration with weather station wind/rain protection',
      'Dual heating loop coordination (hydronic floor + ambient finned pipes)',
      'IntelliGrow™ Cloud sync with sub-second websocket telemetry',
    ],
    connectivity: 'Ethernet RJ45, 2.4/5GHz Dual-Band Wi-Fi, RS-485',
    power: '100-240V AC 50/60Hz, 45W Max',
    idealFor: 'Commercial glasshouses, multi-span venlo facilities, institutional research',
  },
  {
    id: 'intelliclimate-pro',
    modelCode: 'ICC-2',
    name: 'IntelliClimate CEA Climate Coordinator',
    category: 'climate',
    badge: 'MOST POPULAR CEA',
    tagline: 'Precision VPD, Temperature, Humidity & CO2 Orchestration',
    description:
      'The gold standard for sealed indoor grow rooms and CEA vertical farms. Automatically balances HVAC, dehumidification, extraction, and compressed or burner CO2 injection based on real-time Vapor Pressure Deficit (VPD) targets.',
    image: 'assets/images/facility-indoor.jpg',
    specs: [
      { label: 'Sensor Support', value: '4-in-1 Canopy + Aux Temp/RH' },
      { label: 'CO2 Regulation', value: 'Dual-Stage Solenoid / Gas Burner' },
      { label: 'Control Modes', value: 'Day / Night / Transition Damping' },
      { label: 'Dehumidification', value: 'Refrigerant & Desiccant Contactors' },
      { label: 'Lighting Sync', value: 'Dual-Zone Digital Dimming (0-10V)' },
    ],
    keyFeatures: [
      'Automatic VPD target tracking based on leaf temperature offset',
      'Smooth transition ramping between day and night cycles to prevent dew point condensation',
      'Emergency high-temperature light shutoff and purge ventilation safety',
      'IntelliGrow™ mobile live telemetry with customizable push alarms',
    ],
    connectivity: 'Ethernet RJ45, 2.4GHz Wi-Fi, RJ12 Modular Bus',
    power: '100-240V AC, 25W',
    idealFor: 'Sealed indoor rooms, cleanrooms, container farms, flower flowering bays',
  },
  {
    id: 'intellidose-8ch',
    modelCode: 'IDC-4',
    name: 'IntelliDose 8-Channel Precision Doser',
    category: 'dosing',
    badge: 'PRECISION FERTIGATION',
    tagline: 'Automated 8-Part Nutrient & pH Auto-Correct Manifold',
    description:
      'Commercial automated nutrient doser capable of running up to 8 peristaltic pumps (up to 7 fertilizer stock parts + pH Up/Down) with lab-grade double-junction EC and pH electrodes. Delivers exact electrical conductivity to within ±0.05 mS/cm.',
    image: 'assets/images/dosing-reservoir.jpg',
    specs: [
      { label: 'Dosing Heads', value: 'Up to 8 Industrial Peristaltic Heads' },
      { label: 'EC Range / Accuracy', value: '0.00 – 9.99 mS/cm (±0.05 mS/cm)' },
      { label: 'pH Range / Accuracy', value: '2.0 – 12.0 pH (±0.05 pH)' },
      { label: 'Irrigation Stations', value: 'Up to 8 Solenoid Valve Zones' },
      { label: 'Flow Rate Capacity', value: 'From 50L/h to 100,000L/h In-Line' },
    ],
    keyFeatures: [
      'Proportional dosing algorithms prevent nutrient overshooting and reservoir shock',
      'Sequential nutrient blending prevents chemical precipitation in mixing chambers',
      'Integrated batch dosing recipes by crop growth stage (Vegetative, Stretch, Bloom)',
      'Run-to-waste and recirculation drain telemetry analysis',
    ],
    connectivity: 'Ethernet RJ45, Wi-Fi, RS-485 Expansion Port',
    power: '24V DC (Industrial Power Supply Included)',
    idealFor: 'Hydroponic substrate troughs, vertical NFT racks, automated berry gutters',
  },
  {
    id: 'ec-mini-link',
    modelCode: 'ECM-1',
    name: 'EC Mini Smart Telemetry Doser',
    category: 'dosing',
    badge: 'COMPACT SMART DOSER',
    tagline: 'Continuous Nutrient Strength Guardian with Cloud Sync',
    description:
      'Ultra-reliable, set-and-forget nutrient dosing controller. Constantly measures conductivity and water temperature, driving two dosing pumps to automatically maintain user setpoint while streaming live micro-drift packets to the IntelliGrow™ app.',
    image: 'assets/images/sensor-crop.jpg',
    specs: [
      { label: 'Electrode', value: 'Autogrow Standard Industrial Platinum EC' },
      { label: 'Measurement Units', value: 'EC (mS/cm), CF, PPM 500 / 700' },
      { label: 'Dose Tracking', value: 'Real-time Doses/Hour & Dose Total counter' },
      { label: 'Outputs', value: '2x 24V DC PWM Dosing Outputs' },
      { label: 'Enclosure', value: 'IP65 Weatherproof Industrial Shell' },
    ],
    keyFeatures: [
      'High/low alarm thresholds safeguard against empty tanks and line blockages',
      'Instant push alerts to mobile phones via low-latency cloud broker',
      'One-touch manual dosing pulse override for rapid adjustments',
      'Integrated temperature compensation with auto-calibration routine',
    ],
    connectivity: '2.4GHz Wi-Fi (802.11 b/g/n) with TLS 1.3 Encryption',
    power: '12V DC, 1.5A Max',
    idealFor: 'Greenhouse vegetable bays, nursery propagation, hydroponic bench runs',
  },
  {
    id: 'envirosensor-4in1',
    modelCode: 'ESS-4',
    name: 'EnviroSensor 4-in-1 Canopy Pod',
    category: 'sensors',
    badge: 'ACCURACY SENSOR',
    tagline: 'Canopy-Level Temperature, Humidity, CO2 & Light Intensity',
    description:
      'Suspended directly above the crop canopy to eliminate microclimate dead zones. Houses optical NDIR CO2 sensing, dual temperature/RH elements, and a cosine-corrected silicon photodiode in an aspiration-shielded chamber.',
    image: 'assets/images/strawberries-cea.jpg',
    specs: [
      { label: 'CO2 Range', value: '0 – 5,000 PPM (±30 PPM)' },
      { label: 'Temp Range', value: '-20°C to +60°C (±0.2°C)' },
      { label: 'RH Range', value: '0 – 100% Non-Condensing (±1.5%)' },
      { label: 'Light Photodiode', value: '0 – 200,000 Lux / μmol PAR conversion' },
      { label: 'Interface', value: 'RJ12 Plug-and-Play Quick Bus' },
    ],
    keyFeatures: [
      'Active aspiration fan prevents radiant heat distortion on sensor readings',
      'Built-in status LED flashes on successful data transmission',
      'Modular daisy-chain architecture allows up to 12 sensors on one controller',
      'Heavy-duty hanging wire rope and height-adjustment clip included',
    ],
    connectivity: 'RJ12 Modular 6-Pin Bus Cable (up to 100m reach)',
    power: 'Powered via RJ12 Controller Bus',
    idealFor: 'Crop canopy level positioning, indoor multi-tier racks, greenhouse apex',
  },
  {
    id: 'substrate-sensor-sms',
    modelCode: 'SMS-Pro',
    name: 'Substrate Moisture & Pore-EC Array',
    category: 'sensors',
    badge: 'CROP STEERING',
    tagline: 'High-Frequency TDR Moisture, Pore Water EC & Root Temperature',
    description:
      'Master precision crop steering and generative/vegetative drybacks. Measures volumetric water content (VWC%), bulk and pore-water electrical conductivity, and root temperature directly within rockwool, coco coir, or soil substrates.',
    image: 'assets/images/lettuce-nft.jpg',
    specs: [
      { label: 'Technology', value: '100MHz Frequency Domain Reflectometry' },
      { label: 'VWC Range', value: '0 – 100% (±1.0%)' },
      { label: 'Pore EC', value: '0 – 15.0 mS/cm with Hilbert Transform' },
      { label: 'Substrate Prongs', value: '3x Medical Grade 316L Stainless Steel' },
      { label: 'Cable Length', value: '5m Standard (Shielded Polyurethane)' },
    ],
    keyFeatures: [
      'Real-time dryback curve graphing inside the IntelliGrow™ app',
      'Trigger irrigation pulses automatically when root-zone VWC hits target %',
      'Detect salt buildup before leaf tip burn occurs',
      'Works seamlessly with rockwool slabs, coco slabs, and potting containers',
    ],
    connectivity: 'Direct Controller Module connection via RJ12 adapter',
    power: 'Low-power 3.3V bus drive',
    idealFor: 'Rockwool slabs, coco coir troughs, automated drip irrigation steering',
  },
];

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'eco-controller',
    name: 'Central Automation Brain',
    code: 'MultiGrow & IntelliClimate',
    role: 'brain',
    categoryTitle: '01 / CONTROLLERS',
    description:
      'High-performance multi-zone industrial processors coordinating microclimates, lighting schedules, irrigation timing, and safety locks.',
    specs: 'Dual-core ARM industrial MCU, 32 solid-state relays, redundant watchdog',
    iconName: 'Cpu',
  },
  {
    id: 'eco-sensors',
    name: 'Canopy & Substrate Sensors',
    code: 'ESS-4 & SMS-Pro Arrays',
    role: 'sensor',
    categoryTitle: '02 / INPUTS',
    description:
      'Precision monitoring of air temp, humidity, VPD, CO2 concentration, light intensity, rootzone VWC%, and pore water EC.',
    specs: 'NDIR optics, TDR moisture prongs, double-junction pH/EC probes',
    iconName: 'Activity',
  },
  {
    id: 'eco-actuators',
    name: 'Dosing & Environmental Stations',
    code: 'IDC-4 & HVAC Modules',
    role: 'actuator',
    categoryTitle: '03 / OUTPUTS',
    description:
      'Heavy-duty industrial stations driving peristaltic nutrient pumps, motorized roof vents, shade curtains, AC contactors, and CO2 valves.',
    specs: 'PWM peristaltic heads, 0-10V lighting ballasts, dry contact relays',
    iconName: 'Sliders',
  },
  {
    id: 'eco-cloud',
    name: 'IntelliGrow™ Cloud Architecture',
    code: 'Mobile App & Desktop Suite',
    role: 'cloud',
    categoryTitle: '04 / CLOUD TELEMETRY',
    description:
      'Bank-grade TLS 1.3 encrypted cloud platform providing live remote monitoring, multi-farm aggregation, automated historical exports, and instant SMS push alerts.',
    specs: '5 years granular sensor storage, multi-user role RBAC, REST API',
    iconName: 'CloudLightning',
  },
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'commercial-greenhouse',
    title: 'Commercial Multi-Span Greenhouses',
    subtitle: 'Venlo Glasshouses, Polycarbonate & Tunnel Complexes',
    description:
      'Balance outdoor weather volatility against delicate indoor crop requirements. MultiGrow coordinates ridge vents, gable exhaust, shade/thermal screens, and hydronic boiler loops to deliver optimum energy efficiency.',
    image: 'assets/images/hero-greenhouse.jpg',
    metrics: [
      { label: 'Energy Savings', value: 'Up to 28%' },
      { label: 'Yield Gain', value: '+22.4%' },
      { label: 'Climate Precision', value: '±0.4°C' },
    ],
    features: [
      'Weather station wind/rain storm override protection',
      'Solar radiation integration for dynamic crop lighting & shading',
      'Dual heating loop control (hot water floor + air fans)',
      'Compartment-level isolation for staggered harvest cycles',
    ],
  },
  {
    id: 'indoor-cea-vertical',
    title: 'Controlled Environment Agriculture (CEA)',
    subtitle: 'Sealed Indoor Facilities, Vertical Racks & Cleanrooms',
    description:
      'Full microclimate supremacy in sealed spaces with zero natural light. IntelliClimate calculates VPD second-by-second, adjusting chilled water HVAC, industrial dehumidifiers, and CO2 injection without temperature overshoot.',
    image: 'assets/images/facility-indoor.jpg',
    metrics: [
      { label: 'Water Recycling', value: '98.5%' },
      { label: 'Cycle Uniformity', value: '99.2%' },
      { label: 'CO2 Optimization', value: '+350 PPM' },
    ],
    features: [
      'Dynamic leaf-to-air temperature VPD compensation',
      'Night-time dehumidification ramps to eliminate mold & botrytis',
      'Multi-tier canopy aspiration sensors across every vertical level',
      'Emergency high-temperature lighting cut-off safety circuits',
    ],
  },
  {
    id: 'precision-fertigation',
    title: 'Hydroponic Substrate & Dosing Centers',
    subtitle: 'Automated 8-Part Mixing, NFT Channels & Rockwool Drip',
    description:
      'Eliminate human mixing errors and nutrient spikes. IntelliDose and EC Mini continuously meter fertilizers and acids to provide rootzones with stable, biologically accessible nutrition.',
    image: 'assets/images/dosing-reservoir.jpg',
    metrics: [
      { label: 'Fertilizer Savings', value: 'Up to 24%' },
      { label: 'EC Repeatability', value: '±0.03 mS' },
      { label: 'pH Stability', value: '±0.05 pH' },
    ],
    features: [
      'Proportional dosing algorithms adapt to incoming water pressure',
      'Run-off and drain EC monitoring for closed-loop recirculation',
      'Sequential injection prevents calcium-phosphate precipitation',
      'Comprehensive total dose counters for cost accounting',
    ],
  },
];

export const DOWNLOADS_DATA: DownloadItem[] = [
  {
    id: 'dl-1',
    category: 'Manuals',
    title: 'MultiGrow Pro Commercial Installation & Operation Guide',
    product: 'MultiGrow MGC-1',
    version: 'Rev 4.2',
    fileSize: '4.8 MB PDF',
    date: '2026 Update',
  },
  {
    id: 'dl-2',
    category: 'Firmware',
    title: 'EC Mini Firmware v1.4.0 (OTA Cloud Update)',
    product: 'EC Mini Link',
    version: 'v1.4.0',
    fileSize: '1.2 MB BIN',
    date: 'Oct 2026',
  },
  {
    id: 'dl-3',
    category: 'Wiring',
    title: 'IntelliDose 8-Channel Industrial Solenoid & Pump Schematics',
    product: 'IntelliDose IDC-4',
    version: 'CAD-DWG',
    fileSize: '2.4 MB ZIP',
    date: '2026 Edition',
  },
  {
    id: 'dl-4',
    category: 'Manuals',
    title: 'IntelliClimate CEA Environmental Controller Quick Start',
    product: 'IntelliClimate ICC-2',
    version: 'Rev 3.0',
    fileSize: '3.1 MB PDF',
    date: '2026 Edition',
  },
  {
    id: 'dl-5',
    category: 'Brochures',
    title: 'Autogrow Commercial Ecosystem Master Product Catalog',
    product: 'All Systems',
    version: 'Global Catalog',
    fileSize: '12.4 MB PDF',
    date: '2026 / 2027',
  },
];

export const products = PRODUCTS_DATA;
export const ecosystemNodes = ECOSYSTEM_NODES;
