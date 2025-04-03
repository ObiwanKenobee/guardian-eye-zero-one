
// Types for our application
export type RiskLevel = 'low' | 'medium' | 'high';

export type Violation = {
  id: string;
  title: string;
  description: string;
  location: string;
  company: string;
  industry: string;
  reportedDate: string;
  status: 'pending' | 'investigating' | 'verified' | 'resolved';
  riskLevel: RiskLevel;
  reportCount: number;
  evidenceCount: number;
  tags: string[];
  coordinates: [number, number];
};

export type RiskPrediction = {
  id: string;
  region: string;
  industry: string;
  riskScore: number;
  riskLevel: RiskLevel;
  factors: string[];
  trend: 'increasing' | 'stable' | 'decreasing';
  relatedCompanies: string[];
};

// Mock data
export const MOCK_VIOLATIONS: Violation[] = [
  {
    id: 'v1',
    title: 'Unsafe Working Conditions',
    description: 'Factory workers exposed to hazardous chemicals without proper protective equipment.',
    location: 'Jakarta, Indonesia',
    company: 'TextileCorp International',
    industry: 'Garment Manufacturing',
    reportedDate: '2025-03-28T09:15:00Z',
    status: 'investigating',
    riskLevel: 'high',
    reportCount: 12,
    evidenceCount: 3,
    tags: ['labor rights', 'safety violations', 'chemical exposure'],
    coordinates: [106.8456, -6.2088]
  },
  {
    id: 'v2',
    title: 'Child Labor Allegations',
    description: 'Reports of minors working in cocoa farms supplying major chocolate manufacturers.',
    location: 'Abidjan, Ivory Coast',
    company: 'Global Cocoa Suppliers Ltd.',
    industry: 'Agriculture',
    reportedDate: '2025-03-29T15:30:00Z',
    status: 'pending',
    riskLevel: 'high',
    reportCount: 5,
    evidenceCount: 2,
    tags: ['child labor', 'agriculture', 'supply chain'],
    coordinates: [-4.0082, 5.3596]
  },
  {
    id: 'v3',
    title: 'Deforestation for Mining Operations',
    description: 'Illegal land clearing for mineral extraction affecting indigenous communities.',
    location: 'Madre de Dios, Peru',
    company: 'ResourceX Mining Corp',
    industry: 'Mining',
    reportedDate: '2025-03-25T11:45:00Z',
    status: 'verified',
    riskLevel: 'medium',
    reportCount: 8,
    evidenceCount: 6,
    tags: ['environmental damage', 'indigenous rights', 'deforestation'],
    coordinates: [-70.5317, -12.5933]
  },
  {
    id: 'v4',
    title: 'Wage Theft Allegations',
    description: 'Workers report unpaid overtime and withholding of wages at electronics factory.',
    location: 'Shenzhen, China',
    company: 'TechAssembly Inc',
    industry: 'Electronics Manufacturing',
    reportedDate: '2025-03-30T16:20:00Z',
    status: 'investigating',
    riskLevel: 'medium',
    reportCount: 15,
    evidenceCount: 4,
    tags: ['wage theft', 'labor rights', 'overtime'],
    coordinates: [114.0579, 22.5431]
  },
  {
    id: 'v5',
    title: 'Union Busting Activities',
    description: 'Systematic intimidation of workers attempting to organize at distribution center.',
    location: 'Chicago, USA',
    company: 'MegaRetail Enterprises',
    industry: 'Retail',
    reportedDate: '2025-03-27T10:00:00Z',
    status: 'pending',
    riskLevel: 'medium',
    reportCount: 7,
    evidenceCount: 2,
    tags: ['union busting', 'worker intimidation', 'labor rights'],
    coordinates: [-87.6298, 41.8781]
  },
  {
    id: 'v6',
    title: 'Water Pollution from Factory',
    description: 'Chemical discharge from manufacturing plant contaminating local water sources.',
    location: 'Dhaka, Bangladesh',
    company: 'DyeChem Industries',
    industry: 'Textile Processing',
    reportedDate: '2025-03-26T08:30:00Z',
    status: 'verified',
    riskLevel: 'high',
    reportCount: 22,
    evidenceCount: 9,
    tags: ['water pollution', 'environmental damage', 'public health'],
    coordinates: [90.4152, 23.8103]
  },
  {
    id: 'v7',
    title: 'Dangerous Building Safety Issues',
    description: 'Building structural problems ignored despite worker complaints.',
    location: 'Mumbai, India',
    company: 'FastFashion Garments Ltd',
    industry: 'Apparel Manufacturing',
    reportedDate: '2025-03-29T13:15:00Z',
    status: 'investigating',
    riskLevel: 'high',
    reportCount: 5,
    evidenceCount: 3,
    tags: ['building safety', 'structural hazards', 'worker safety'],
    coordinates: [72.8777, 19.0760]
  },
  {
    id: 'v8',
    title: 'Forced Overtime Complaints',
    description: 'Workers forced to work excessive hours to meet production quotas.',
    location: 'Ho Chi Minh City, Vietnam',
    company: 'SneakerPro Manufacturing',
    industry: 'Footwear Production',
    reportedDate: '2025-03-28T14:45:00Z',
    status: 'pending',
    riskLevel: 'medium',
    reportCount: 9,
    evidenceCount: 2,
    tags: ['forced overtime', 'labor exploitation', 'production quotas'],
    coordinates: [106.6297, 10.8231]
  },
  {
    id: 'v9',
    title: 'Indigenous Land Rights Violation',
    description: 'Pipeline construction proceeding without proper consultation or consent.',
    location: 'Alberta, Canada',
    company: 'Northern Oil Transport',
    industry: 'Oil & Gas',
    reportedDate: '2025-03-24T09:30:00Z',
    status: 'verified',
    riskLevel: 'medium',
    reportCount: 14,
    evidenceCount: 7,
    tags: ['indigenous rights', 'land rights', 'consultation failure'],
    coordinates: [-115.0008, 51.0447]
  },
  {
    id: 'v10',
    title: 'Worker Harassment Claims',
    description: 'Multiple reports of verbal abuse and harassment toward female workers.',
    location: 'Phnom Penh, Cambodia',
    company: 'BudgetClothes Manufacturing',
    industry: 'Garment Production',
    reportedDate: '2025-03-27T11:20:00Z',
    status: 'investigating',
    riskLevel: 'medium',
    reportCount: 6,
    evidenceCount: 3,
    tags: ['harassment', 'gender discrimination', 'workplace abuse'],
    coordinates: [104.9282, 11.5564]
  }
];

export const MOCK_RISK_PREDICTIONS: RiskPrediction[] = [
  {
    id: 'r1',
    region: 'Southeast Asia',
    industry: 'Textile Manufacturing',
    riskScore: 87,
    riskLevel: 'high',
    factors: ['Previous violations', 'Weak regulatory oversight', 'Price pressures'],
    trend: 'increasing',
    relatedCompanies: ['FastFashion Global', 'BudgetClothes Manufacturing', 'TextileCorp International']
  },
  {
    id: 'r2',
    region: 'West Africa',
    industry: 'Cocoa Production',
    riskScore: 82,
    riskLevel: 'high',
    factors: ['Poverty rates', 'Limited monitoring', 'Seasonal labor demands'],
    trend: 'stable',
    relatedCompanies: ['Global Cocoa Suppliers Ltd.', 'SweetTreats Inc', 'ChocoCorp International']
  },
  {
    id: 'r3',
    region: 'South America',
    industry: 'Mining',
    riskScore: 74,
    riskLevel: 'medium',
    factors: ['Remote locations', 'Illegal operations', 'Indigenous territories'],
    trend: 'increasing',
    relatedCompanies: ['ResourceX Mining Corp', 'GlobalExtract Ltd', 'MineralTech Partners']
  },
  {
    id: 'r4',
    region: 'East Asia',
    industry: 'Electronics Manufacturing',
    riskScore: 68,
    riskLevel: 'medium',
    factors: ['Production quotas', 'Overtime requirements', 'Migrant labor'],
    trend: 'stable',
    relatedCompanies: ['TechAssembly Inc', 'DigiParts Manufacturing', 'ElectroFab Co.']
  },
  {
    id: 'r5',
    region: 'South Asia',
    industry: 'Garment Production',
    riskScore: 79,
    riskLevel: 'high',
    factors: ['Building safety', 'Fire hazards', 'Low wages'],
    trend: 'decreasing',
    relatedCompanies: ['FastFashion Garments Ltd', 'GlobalThreads Inc.', 'ApparelMax Co.']
  }
];

export const RISK_LEVEL_COLOR = {
  low: 'bg-green-500',
  medium: 'bg-amber-500',
  high: 'bg-red-500'
};

export const STATUS_BADGES = {
  pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  investigating: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  verified: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};
