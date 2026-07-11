export const NORTHEAST_STATES = [
  { code: 'CT', name: 'Connecticut', nameEs: 'Connecticut' },
  { code: 'DE', name: 'Delaware', nameEs: 'Delaware' },
  { code: 'MA', name: 'Massachusetts', nameEs: 'Massachusetts' },
  { code: 'MD', name: 'Maryland', nameEs: 'Maryland' },
  { code: 'ME', name: 'Maine', nameEs: 'Maine' },
  { code: 'NH', name: 'New Hampshire', nameEs: 'Nuevo Hampshire' },
  { code: 'NJ', name: 'New Jersey', nameEs: 'Nueva Jersey' },
  { code: 'NY', name: 'New York', nameEs: 'Nueva York' },
  { code: 'PA', name: 'Pennsylvania', nameEs: 'Pensilvania' },
  { code: 'RI', name: 'Rhode Island', nameEs: 'Rhode Island' },
  { code: 'VT', name: 'Vermont', nameEs: 'Vermont' },
];

export const STATE_LOCATIONS = {
  CT: ['Fairfield County', 'Hartford County', 'New Haven County', 'Litchfield County', 'New London County', 'Middlesex County', 'Tolland County', 'Windham County', 'Bridgeport', 'New Haven', 'Hartford', 'Stamford'],
  DE: ['New Castle County', 'Kent County', 'Sussex County', 'Wilmington', 'Dover', 'Newark', 'Middletown', 'Bear'],
  MA: ['Suffolk County', 'Middlesex County', 'Essex County', 'Norfolk County', 'Worcester County', 'Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell'],
  MD: ['Baltimore City', 'Montgomery County', 'Prince George\'s County', 'Baltimore County', 'Anne Arundel County', 'Baltimore', 'Silver Spring', 'Frederick', 'Rockville'],
  ME: ['Cumberland County', 'York County', 'Penobscot County', 'Kennebec County', 'Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
  NH: ['Hillsborough County', 'Rockingham County', 'Merrimack County', 'Strafford County', 'Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester'],
  NJ: ['Essex County', 'Bergen County', 'Middlesex County', 'Hudson County', 'Union County', 'Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
  NY: ['New York County (Manhattan)', 'Kings County (Brooklyn)', 'Queens County', 'Bronx County', 'Richmond County (Staten Island)', 'Erie County', 'Monroe County', 'Albany County', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'],
  PA: ['Philadelphia County', 'Allegheny County', 'Montgomery County', 'Bucks County', 'Delaware County', 'Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
  RI: ['Providence County', 'Kent County', 'Washington County', 'Newport County', 'Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
  VT: ['Chittenden County', 'Rutland County', 'Washington County', 'Windham County', 'Burlington', 'South Burlington', 'Rutland', 'Montpelier', 'Barre'],
};

export const STATE_COORDS = {
  CT: { lat: 41.6032, lng: -73.0877 },
  DE: { lat: 38.9108, lng: -75.5277 },
  MA: { lat: 42.4072, lng: -71.3824 },
  MD: { lat: 39.0458, lng: -76.6413 },
  ME: { lat: 45.2538, lng: -69.4455 },
  NH: { lat: 43.1939, lng: -71.5724 },
  NJ: { lat: 40.0583, lng: -74.4057 },
  NY: { lat: 40.7128, lng: -74.0060 },
  PA: { lat: 39.9526, lng: -75.1652 },
  RI: { lat: 41.8240, lng: -71.4128 },
  VT: { lat: 44.5588, lng: -72.5778 },
};

export const EMPLOYMENT_OPTIONS = [
  { value: 'full-time', labelEn: 'Employed full-time', labelEs: 'Empleado/a tiempo completo' },
  { value: 'part-time', labelEn: 'Employed part-time', labelEs: 'Empleado/a medio tiempo' },
  { value: 'unemployed', labelEn: 'Unemployed', labelEs: 'Desempleado/a' },
  { value: 'self-employed', labelEn: 'Self-employed', labelEs: 'Trabajador/a independiente' },
  { value: 'unable-to-work', labelEn: 'Unable to work', labelEs: 'Incapaz de trabajar' },
];

export const RACE_OPTIONS = [
  { value: 'black', labelEn: 'Black/African American', labelEs: 'Negro/Afroamericano' },
  { value: 'hispanic', labelEn: 'Hispanic/Latino', labelEs: 'Hispano/Latino' },
  { value: 'white', labelEn: 'White', labelEs: 'Blanco' },
  { value: 'asian', labelEn: 'Asian', labelEs: 'Asiático' },
  { value: 'native', labelEn: 'Native American', labelEs: 'Nativo Americano' },
  { value: 'pacific', labelEn: 'Pacific Islander', labelEs: 'Isleño del Pacífico' },
  { value: 'multiracial', labelEn: 'Multiracial', labelEs: 'Multirracial' },
  { value: 'prefer-not', labelEn: 'Prefer not to say', labelEs: 'Prefiero no decir' },
];

export const GENDER_OPTIONS = [
  { value: 'woman', labelEn: 'Woman', labelEs: 'Mujer' },
  { value: 'man', labelEn: 'Man', labelEs: 'Hombre' },
  { value: 'non-binary', labelEn: 'Non-binary', labelEs: 'No binario' },
  { value: 'prefer-not', labelEn: 'Prefer not to say', labelEs: 'Prefiero no decir' },
];

export const IMMIGRATION_OPTIONS = [
  { value: 'citizen', labelEn: 'US Citizen', labelEs: 'Ciudadano/a de EE.UU.' },
  { value: 'permanent-resident', labelEn: 'Permanent Resident', labelEs: 'Residente permanente' },
  { value: 'daca', labelEn: 'DACA', labelEs: 'DACA' },
  { value: 'visa', labelEn: 'Visa holder', labelEs: 'Titular de visa' },
  { value: 'undocumented', labelEn: 'Undocumented', labelEs: 'Indocumentado/a' },
];

export const NEEDS_OPTIONS = [
  { value: 'food', labelEn: 'Food & nutrition', labelEs: 'Alimentos y nutrición', icon: '🍎' },
  { value: 'housing', labelEn: 'Housing & rent', labelEs: 'Vivienda y alquiler', icon: '🏠' },
  { value: 'healthcare', labelEn: 'Healthcare & insurance', labelEs: 'Salud y seguro médico', icon: '🏥' },
  { value: 'childcare', labelEn: 'Childcare', labelEs: 'Cuidado infantil', icon: '👶' },
  { value: 'utilities', labelEn: 'Utilities & energy bills', labelEs: 'Servicios y facturas de energía', icon: '⚡' },
  { value: 'employment', labelEn: 'Job training & employment', labelEs: 'Capacitación laboral y empleo', icon: '💼' },
  { value: 'education', labelEn: 'Education & scholarships', labelEs: 'Educación y becas', icon: '🎓' },
  { value: 'legal', labelEn: 'Legal aid', labelEs: 'Asistencia legal', icon: '⚖️' },
  { value: 'mental_health', labelEn: 'Mental health support', labelEs: 'Apoyo de salud mental', icon: '🧠' },
  { value: 'transportation', labelEn: 'Transportation', labelEs: 'Transporte', icon: '🚌' },
  { value: 'business', labelEn: 'Small business support', labelEs: 'Apoyo para pequeños negocios', icon: '🏪' },
];

export const ASSISTANCE_OPTIONS = [
  { value: 'snap', labelEn: 'SNAP / Food stamps', labelEs: 'SNAP / Cupones de alimentos' },
  { value: 'medicaid', labelEn: 'Medicaid', labelEs: 'Medicaid' },
  { value: 'wic', labelEn: 'WIC', labelEs: 'WIC' },
  { value: 'section8', labelEn: 'Section 8 / Housing voucher', labelEs: 'Sección 8 / Vale de vivienda' },
  { value: 'unemployment', labelEn: 'Unemployment benefits', labelEs: 'Beneficios de desempleo' },
  { value: 'ssi', labelEn: 'SSI / SSDI', labelEs: 'SSI / SSDI' },
  { value: 'none', labelEn: 'None', labelEs: 'Ninguno' },
];

export const CATEGORY_LABELS = {
  food: { en: 'Food', es: 'Alimentos' },
  housing: { en: 'Housing', es: 'Vivienda' },
  healthcare: { en: 'Healthcare', es: 'Salud' },
  childcare: { en: 'Childcare', es: 'Cuidado infantil' },
  utilities: { en: 'Utilities', es: 'Servicios' },
  employment: { en: 'Employment', es: 'Empleo' },
  education: { en: 'Education', es: 'Educación' },
  legal: { en: 'Legal Aid', es: 'Asistencia legal' },
  mental_health: { en: 'Mental Health', es: 'Salud mental' },
  transportation: { en: 'Transportation', es: 'Transporte' },
  business: { en: 'Business', es: 'Negocios' },
};

export const DEFAULT_INTAKE = {
  firstName: '',
  state: '',
  county: '',
  householdSize: 1,
  isHeadOfHousehold: true,
  annualIncome: 30000,
  employmentStatus: '',
  currentAssistance: [],
  age: 30,
  raceEthnicity: [],
  gender: '',
  isVeteran: false,
  hasDisability: false,
  immigrationStatus: '',
  needs: [],
  language: 'en',
};
