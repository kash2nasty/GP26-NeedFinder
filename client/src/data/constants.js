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
  CT: ['Fairfield County', 'Hartford County', 'Litchfield County', 'Middlesex County', 'New Haven County', 'New London County', 'Tolland County', 'Windham County'],
  DE: ['New Castle County', 'Kent County', 'Sussex County'],
  MA: ['Barnstable County', 'Berkshire County', 'Bristol County', 'Dukes County', 'Essex County', 'Franklin County', 'Hampden County', 'Hampshire County', 'Middlesex County', 'Nantucket County', 'Norfolk County', 'Plymouth County', 'Suffolk County', 'Worcester County'],
  MD: ['Allegany County', 'Anne Arundel County', 'Baltimore City', 'Baltimore County', 'Calvert County', 'Caroline County', 'Carroll County', 'Cecil County', 'Charles County', 'Dorchester County', 'Frederick County', 'Garrett County', 'Harford County', 'Howard County', 'Kent County', 'Montgomery County', "Prince George's County", "Queen Anne's County", 'St. Marys County', 'Somerset County', 'Talbot County', 'Washington County', 'Wicomico County', 'Worcester County'],
  ME: ['Androscoggin County', 'Aroostook County', 'Cumberland County', 'Franklin County', 'Hancock County', 'Kennebec County', 'Knox County', 'Lincoln County', 'Oxford County', 'Penobscot County', 'Piscataquis County', 'Sagadahoc County', 'Somerset County', 'Waldo County', 'Washington County', 'York County'],
  NH: ['Belknap County', 'Carroll County', 'Cheshire County', 'Coos County', 'Grafton County', 'Hillsborough County', 'Merrimack County', 'Rockingham County', 'Strafford County', 'Sullivan County'],
  NJ: ['Atlantic County', 'Bergen County', 'Burlington County', 'Camden County', 'Cape May County', 'Cumberland County', 'Essex County', 'Gloucester County', 'Hudson County', 'Hunterdon County', 'Mercer County', 'Middlesex County', 'Monmouth County', 'Morris County', 'Ocean County', 'Passaic County', 'Salem County', 'Somerset County', 'Sussex County', 'Union County', 'Warren County'],
  NY: ['Albany County', 'Allegany County', 'Bronx County', 'Broome County', 'Cattaraugus County', 'Cayuga County', 'Chautauqua County', 'Chemung County', 'Chenango County', 'Clinton County', 'Columbia County', 'Cortland County', 'Delaware County', 'Dutchess County', 'Erie County', 'Essex County', 'Franklin County', 'Fulton County', 'Genesee County', 'Greene County', 'Hamilton County', 'Herkimer County', 'Jefferson County', 'Kings County', 'Lewis County', 'Livingston County', 'Madison County', 'Monroe County', 'Montgomery County', 'Nassau County', 'New York County', 'Niagara County', 'Oneida County', 'Onondaga County', 'Ontario County', 'Orange County', 'Orleans County', 'Oswego County', 'Otsego County', 'Putnam County', 'Queens County', 'Rensselaer County', 'Richmond County', 'Rockland County', 'Saratoga County', 'Schenectady County', 'Schoharie County', 'Schuyler County', 'Seneca County', 'St. Lawrence County', 'Steuben County', 'Suffolk County', 'Sullivan County', 'Tioga County', 'Tompkins County', 'Ulster County', 'Warren County', 'Washington County', 'Wayne County', 'Westchester County', 'Wyoming County', 'Yates County'],
  PA: ['Adams County', 'Allegheny County', 'Armstrong County', 'Beaver County', 'Bedford County', 'Berks County', 'Blair County', 'Bradford County', 'Bucks County', 'Butler County', 'Cambria County', 'Cameron County', 'Carbon County', 'Centre County', 'Chester County', 'Clarion County', 'Clearfield County', 'Clinton County', 'Columbia County', 'Crawford County', 'Cumberland County', 'Dauphin County', 'Delaware County', 'Elk County', 'Erie County', 'Fayette County', 'Forest County', 'Franklin County', 'Fulton County', 'Greene County', 'Huntingdon County', 'Indiana County', 'Jefferson County', 'Juniata County', 'Lackawanna County', 'Lancaster County', 'Lawrence County', 'Lebanon County', 'Lehigh County', 'Luzerne County', 'Lycoming County', 'McKean County', 'Mercer County', 'Mifflin County', 'Monroe County', 'Montgomery County', 'Montour County', 'Northampton County', 'Northumberland County', 'Perry County', 'Philadelphia County', 'Pike County', 'Potter County', 'Schuylkill County', 'Snyder County', 'Somerset County', 'Sullivan County', 'Susquehanna County', 'Tioga County', 'Union County', 'Venango County', 'Warren County', 'Washington County', 'Wayne County', 'Westmoreland County', 'Wyoming County', 'York County'],
  RI: ['Bristol County', 'Kent County', 'Newport County', 'Providence County', 'Washington County'],
  VT: ['Addison County', 'Bennington County', 'Caledonia County', 'Chittenden County', 'Essex County', 'Franklin County', 'Grand Isle County', 'Lamoille County', 'Orange County', 'Orleans County', 'Rutland County', 'Washington County', 'Windham County', 'Windsor County'],
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
  { value: 'female', labelEn: 'Female', labelEs: 'Femenino' },
  { value: 'male', labelEn: 'Male', labelEs: 'Masculino' },
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
