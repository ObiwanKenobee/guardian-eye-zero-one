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

export type Investigator = {
  id: string;
  name: string;
  specialization: string;
  location: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'training';
  skills: string[];
  activeCases: number;
  teamId?: string;
  teamName?: string;
  imageUrl?: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  leadInvestigatorId: string;
  memberIds: string[];
  region: string;
  specializations: string[];
  status: 'active' | 'forming' | 'standby';
  activeCases: number;
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  tags?: string[];
  relatedViolationId?: string;
  assignedTo?: string;
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

// Mock data for investigators
export const MOCK_INVESTIGATORS: Investigator[] = [
  {
    id: 'i1',
    name: 'Sarah Johnson',
    specialization: 'Labor Rights Specialist',
    location: 'Geneva, Switzerland',
    joinDate: 'March 15, 2024',
    status: 'active',
    skills: ['Interviews', 'Report Writing', 'Evidence Collection', 'Labor Law'],
    activeCases: 3,
    teamId: 't1',
    teamName: 'Rapid Response Team'
  },
  {
    id: 'i2',
    name: 'Miguel Torres',
    specialization: 'Environmental Impact Analyst',
    location: 'Bogotá, Colombia',
    joinDate: 'January 8, 2024',
    status: 'active',
    skills: ['Environmental Law', 'Satellite Imagery', 'GIS', 'Water Testing'],
    activeCases: 4,
    teamId: 't2',
    teamName: 'Environmental Justice Unit'
  },
  {
    id: 'i3',
    name: 'Aisha Nyambura',
    specialization: 'Child Rights Advocate',
    location: 'Nairobi, Kenya',
    joinDate: 'February 22, 2024',
    status: 'active',
    skills: ['Child Protection', 'Trauma-Informed Interviews', 'Policy Analysis'],
    activeCases: 2,
    teamId: 't1',
    teamName: 'Rapid Response Team'
  },
  {
    id: 'i4',
    name: 'David Chen',
    specialization: 'Supply Chain Auditor',
    location: 'Bangkok, Thailand',
    joinDate: 'October 5, 2023',
    status: 'on-leave',
    skills: ['Factory Audits', 'Compliance Assessment', 'Worker Interviews'],
    activeCases: 0,
    teamId: 't3',
    teamName: 'Supply Chain Transparency Team'
  },
  {
    id: 'i5',
    name: 'Priya Patel',
    specialization: 'Digital Forensics Expert',
    location: 'New Delhi, India',
    joinDate: 'December 12, 2023',
    status: 'active',
    skills: ['Digital Evidence', 'Data Analysis', 'Cyber Security', 'Blockchain'],
    activeCases: 5,
    teamId: 't4',
    teamName: 'Digital Evidence Unit'
  },
  {
    id: 'i6',
    name: 'Jean-Pierre Dubois',
    specialization: 'Legal Counsel',
    location: 'Paris, France',
    joinDate: 'November 1, 2023',
    status: 'active',
    skills: ['International Law', 'Human Rights Law', 'Legal Documentation'],
    activeCases: 6,
    teamId: 't5',
    teamName: 'Legal Affairs Team'
  },
  {
    id: 'i7',
    name: 'Emma Wilson',
    specialization: 'Indigenous Rights Specialist',
    location: 'Vancouver, Canada',
    joinDate: 'January 30, 2024',
    status: 'training',
    skills: ['Indigenous Consultation', 'Land Rights', 'Community Engagement'],
    activeCases: 1,
    teamId: 't2',
    teamName: 'Environmental Justice Unit'
  },
  {
    id: 'i8',
    name: 'Takashi Yamamoto',
    specialization: 'Financial Investigator',
    location: 'Tokyo, Japan',
    joinDate: 'September 15, 2023',
    status: 'active',
    skills: ['Financial Analysis', 'Anti-Corruption', 'Money Laundering'],
    activeCases: 2,
    teamId: 't4',
    teamName: 'Digital Evidence Unit'
  },
  {
    id: 'i9',
    name: 'Isabella Vargas',
    specialization: 'Community Liaison Officer',
    location: 'Lima, Peru',
    joinDate: 'March 1, 2024',
    status: 'active',
    skills: ['Community Engagement', 'Spanish Translation', 'Cultural Awareness'],
    activeCases: 3,
    teamId: 't3',
    teamName: 'Supply Chain Transparency Team'
  }
];

// Mock data for teams
export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Rapid Response Team',
    description: 'Deploys to urgent cases requiring immediate intervention and evidence collection',
    leadInvestigatorId: 'i1',
    memberIds: ['i1', 'i3'],
    region: 'Global',
    specializations: ['Crisis Response', 'Evidence Preservation', 'First-Contact'],
    status: 'active',
    activeCases: 5
  },
  {
    id: 't2',
    name: 'Environmental Justice Unit',
    description: 'Focuses on violations involving environmental damage and impacts on local communities',
    leadInvestigatorId: 'i2',
    memberIds: ['i2', 'i7'],
    region: 'Americas & Africa',
    specializations: ['Environmental Impact', 'Indigenous Rights', 'Land Use'],
    status: 'active',
    activeCases: 6
  },
  {
    id: 't3',
    name: 'Supply Chain Transparency Team',
    description: 'Investigates labor and human rights violations throughout global supply chains',
    leadInvestigatorId: 'i4',
    memberIds: ['i4', 'i9'],
    region: 'Asia & Pacific',
    specializations: ['Supply Chain Audits', 'Labor Rights', 'Factory Conditions'],
    status: 'forming',
    activeCases: 3
  },
  {
    id: 't4',
    name: 'Digital Evidence Unit',
    description: 'Specializes in collecting, analyzing and verifying digital evidence from various sources',
    leadInvestigatorId: 'i5',
    memberIds: ['i5', 'i8'],
    region: 'Global',
    specializations: ['Digital Forensics', 'Financial Tracking', 'Online Investigation'],
    status: 'active',
    activeCases: 7
  },
  {
    id: 't5',
    name: 'Legal Affairs Team',
    description: 'Ensures investigations adhere to legal standards and prepares cases for legal action',
    leadInvestigatorId: 'i6',
    memberIds: ['i6'],
    region: 'Europe & Middle East',
    specializations: ['Legal Documentation', 'Case Preparation', 'Legal Strategy'],
    status: 'standby',
    activeCases: 6
  }
];

// Mock data for alerts
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    title: 'New Whistleblower Report',
    description: 'Anonymous worker reported unsafe conditions at TextileCorp factory in Jakarta',
    company: 'TextileCorp International',
    location: 'Jakarta, Indonesia',
    timestamp: '2025-04-03T08:23:00Z',
    priority: 'high',
    read: false,
    tags: ['labor rights', 'safety violations', 'whistleblower'],
    relatedViolationId: 'v1'
  },
  {
    id: 'a2',
    title: 'Satellite Imagery Confirms Deforestation',
    description: 'Satellite data shows clearing of protected forest by ResourceX Mining operations',
    company: 'ResourceX Mining Corp',
    location: 'Madre de Dios, Peru',
    timestamp: '2025-04-02T14:15:00Z',
    priority: 'high',
    read: false,
    tags: ['deforestation', 'environmental damage', 'satellite evidence'],
    relatedViolationId: 'v3'
  },
  {
    id: 'a3',
    title: 'Media Report on Child Labor',
    description: 'News article published detailing child labor allegations in cocoa farms',
    company: 'Global Cocoa Suppliers Ltd.',
    location: 'Abidjan, Ivory Coast',
    timestamp: '2025-04-02T09:40:00Z',
    priority: 'medium',
    read: true,
    tags: ['child labor', 'media report', 'agriculture'],
    relatedViolationId: 'v2'
  },
  {
    id: 'a4',
    title: 'Local NGO Filed Official Complaint',
    description: 'Environmental advocacy group filed formal complaint about water pollution',
    company: 'DyeChem Industries',
    location: 'Dhaka, Bangladesh',
    timestamp: '2025-04-01T16:50:00Z',
    priority: 'medium',
    read: true,
    tags: ['water pollution', 'NGO report', 'environmental damage'],
    relatedViolationId: 'v6'
  },
  {
    id: 'a5',
    title: 'Social Media Evidence of Protests',
    description: 'Multiple social media posts showing worker protests at factory gates',
    company: 'SneakerPro Manufacturing',
    location: 'Ho Chi Minh City, Vietnam',
    timestamp: '2025-04-01T10:30:00Z',
    priority: 'medium',
    read: false,
    tags: ['labor rights', 'protests', 'social media evidence'],
    relatedViolationId: 'v8'
  },
  {
    id: 'a6',
    title: 'Risk Assessment Threshold Exceeded',
    description: 'AI risk model flagged high likelihood of labor violations at electronics factory',
    company: 'TechAssembly Inc',
    location: 'Shenzhen, China',
    timestamp: '2025-03-31T13:20:00Z',
    priority: 'low',
    read: true,
    tags: ['ai prediction', 'labor rights', 'risk alert'],
    relatedViolationId: 'v4'
  },
  {
    id: 'a7',
    title: 'Building Safety Inspection Failed',
    description: 'Government inspection found multiple safety code violations in garment factory',
    company: 'FastFashion Garments Ltd',
    location: 'Mumbai, India',
    timestamp: '2025-03-31T09:45:00Z',
    priority: 'high',
    read: true,
    tags: ['building safety', 'government inspection', 'safety violations'],
    relatedViolationId: 'v7'
  },
  {
    id: 'a8',
    title: 'Indigenous Community Complaint',
    description: 'Formal grievance filed by indigenous group regarding land encroachment',
    company: 'Northern Oil Transport',
    location: 'Alberta, Canada',
    timestamp: '2025-03-30T15:10:00Z',
    priority: 'medium',
    read: false,
    tags: ['indigenous rights', 'land rights', 'formal complaint'],
    relatedViolationId: 'v9'
  },
  {
    id: 'a9',
    title: 'Audit Report Discrepancy',
    description: 'Significant differences found between company self-reporting and third-party audit',
    company: 'MegaRetail Enterprises',
    location: 'Chicago, USA',
    timestamp: '2025-03-30T11:30:00Z',
    priority: 'low',
    read: true,
    tags: ['audit discrepancy', 'transparency issue', 'reporting failure'],
    relatedViolationId: 'v5'
  },
  {
    id: 'a10',
    title: 'Worker Harassment Documentation',
    description: 'Multiple witness statements collected detailing harassment of female workers',
    company: 'BudgetClothes Manufacturing',
    location: 'Phnom Penh, Cambodia',
    timestamp: '2025-03-29T08:15:00Z',
    priority: 'high',
    read: true,
    tags: ['harassment', 'gender discrimination', 'worker testimony'],
    relatedViolationId: 'v10'
  },
  {
    id: 'a11',
    title: 'Suspicious Financial Transactions',
    description: 'Pattern of payments to unknown entities in regions with weak labor oversight',
    company: 'GlobalThreads Inc.',
    location: 'Multiple Locations',
    timestamp: '2025-03-28T14:40:00Z',
    priority: 'medium',
    read: false,
    tags: ['financial tracking', 'corruption risk', 'supply chain'],
    relatedViolationId: null
  },
  {
    id: 'a12',
    title: 'AI-Detected Sensor Anomalies',
    description: 'Environmental sensors showing unusual patterns consistent with chemical dumping',
    company: 'ChemProcess Industries',
    location: 'Gujarat, India',
    timestamp: '2025-03-28T09:20:00Z',
    priority: 'high',
    read: false,
    tags: ['sensor data', 'environmental damage', 'chemical pollution'],
    relatedViolationId: null
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
