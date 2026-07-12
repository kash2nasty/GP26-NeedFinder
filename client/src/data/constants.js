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
  CT: ['Fairfield County', 'Hartford County', 'New Haven County', 'Litchfield County', 'New London County', 'Middlesex County', 'Tolland County', 'Windham County', 'Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'West Hartford', 'Bristol', 'Meriden', 'Middletown'],
  DE: ['New Castle County', 'Kent County', 'Sussex County', 'Wilmington', 'Dover', 'Newark', 'Middletown', 'Bear', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Lewes', 'Rehoboth Beach'],
  MA: ['Suffolk County', 'Middlesex County', 'Essex County', 'Norfolk County', 'Worcester County', 'Hampshire County', 'Berkshire County', 'Plymouth County', 'Bristol County', 'Hampden County', 'Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell', 'Quincy', 'Lynn', 'New Bedford', 'Fall River', 'Brookline', 'Somerville', 'Cambridge', 'Newton', 'Lawrence', 'Haverhill'],
  MD: ['Baltimore City', 'Montgomery County', 'Prince George\'s County', 'Baltimore County', 'Anne Arundel County', 'Howard County', 'Frederick County', 'Harford County', 'Carroll County', 'Charles County', 'St. Mary\'s County', 'Calvert County', 'Allegany County', 'Washington County', 'Wicomico County', 'Worcester County', 'Talbot County', 'Dorchester County', 'Caroline County', 'Queen Anne\'s County', 'Kent County', 'Cecil County', 'Garrett County', 'Baltimore', 'Silver Spring', 'Frederick', 'Rockville', 'Columbia', 'Gaithersburg', 'Annapolis', 'Towson', 'Ellicott City', 'Dundalk', 'Bethesda'],
  ME: ['Cumberland County', 'York County', 'Penobscot County', 'Kennebec County', 'Androscoggin County', 'Sagadahoc County', 'Lincoln County', 'Knox County', 'Waldo County', 'Hancock County', 'Washington County', 'Aroostook County', 'Piscataquis County', 'Somerset County', 'Franklin County', 'Oxford County', 'Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Brunswick', 'Scarborough', 'Augusta', 'Saco', 'Westbrook', 'Waterville', 'Presque Isle'],
  NH: ['Hillsborough County', 'Rockingham County', 'Merrimack County', 'Strafford County', 'Cheshire County', 'Grafton County', 'Sullivan County', 'Belknap County', 'Carroll County', 'Coos County', 'Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester', 'Salem', 'Merrimack', 'Hudson', 'Londonderry', 'Keene', 'Laconia', 'Lebanon', 'Durham', 'Hanover', 'Portsmouth', 'Exeter'],
  NJ: ['Essex County', 'Bergen County', 'Middlesex County', 'Hudson County', 'Union County', 'Monmouth County', 'Ocean County', 'Passaic County', 'Morris County', 'Somerset County', 'Hunterdon County', 'Mercer County', 'Burlington County', 'Camden County', 'Gloucester County', 'Atlantic County', 'Cape May County', 'Cumberland County', 'Salem County', 'Sussex County', 'Warren County', 'Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton', 'Clifton', 'Camden', 'Edison', 'Woodbridge', 'Lakewood', 'Toms River', 'Hamilton', 'Princeton', 'New Brunswick', 'Atlantic City', 'Vineland', 'Bayonne', 'Union City', 'Passaic', 'East Orange', 'Hoboken', 'West Orange'],
  NY: ['New York County (Manhattan)', 'Kings County (Brooklyn)', 'Queens County', 'Bronx County', 'Richmond County (Staten Island)', 'Nassau County', 'Suffolk County', 'Westchester County', 'Rockland County', 'Putnam County', 'Dutchess County', 'Orange County', 'Ulster County', 'Sullivan County', 'Greene County', 'Columbia County', 'Rensselaer County', 'Albany County', 'Saratoga County', 'Schenectady County', 'Schoharie County', 'Montgomery County', 'Fulton County', 'Hamilton County', 'Warren County', 'Washington County', 'Clinton County', 'Franklin County', 'St. Lawrence County', 'Lewis County', 'Jefferson County', 'Oswego County', 'Oneida County', 'Herkimer County', 'Otsego County', 'Delaware County', 'Chenango County', 'Broome County', 'Tioga County', 'Tompkins County', 'Cortland County', 'Onondaga County', 'Madison County', 'Cayuga County', 'Seneca County', 'Wayne County', 'Yates County', 'Ontario County', 'Livingston County', 'Monroe County', 'Orleans County', 'Niagara County', 'Erie County', 'Chautauqua County', 'Cattaraugus County', 'Allegany County', 'Steuben County', 'Schuyler County', 'Chemung County', 'Yates County', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'New York City', 'Yonkers', 'Rochester', 'Syracuse', 'Albany', 'Buffalo', 'White Plains', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'Binghamton', 'Ithaca', 'Troy', 'Niagara Falls'],
  PA: ['Adams County', 'Allegheny County', 'Armstrong County', 'Beaver County', 'Bedford County', 'Berks County', 'Blair County', 'Bradford County', 'Bucks County', 'Butler County', 'Cambria County', 'Cameron County', 'Carbon County', 'Centre County', 'Chester County', 'Clarion County', 'Clearfield County', 'Clinton County', 'Columbia County', 'Crawford County', 'Cumberland County', 'Dauphin County', 'Delaware County', 'Elk County', 'Erie County', 'Fayette County', 'Forest County', 'Franklin County', 'Fulton County', 'Greene County', 'Huntingdon County', 'Indiana County', 'Jefferson County', 'Juniata County', 'Lackawanna County', 'Lancaster County', 'Lawrence County', 'Lebanon County', 'Lehigh County', 'Luzerne County', 'Lycoming County', 'McKean County', 'Mercer County', 'Mifflin County', 'Monroe County', 'Montgomery County', 'Montour County', 'Northampton County', 'Northumberland County', 'Perry County', 'Philadelphia County', 'Pike County', 'Potter County', 'Schuylkill County', 'Snyder County', 'Somerset County', 'Sullivan County', 'Susquehanna County', 'Tioga County', 'Union County', 'Venango County', 'Warren County', 'Washington County', 'Wayne County', 'Westmoreland County', 'Wyoming County', 'York County', 'Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona', 'Easton', 'Wilkes-Barre', 'York', 'State College', 'Chester', 'West Chester', 'Norristown', 'Bensalem', 'Bristol', 'Doylestown', 'West Chester', 'Phoenixville', 'Pottstown', 'Coatesville', 'Chambersburg', 'Carlisle', 'Mechanicsburg', 'Lebanon', 'Hazleton', 'Nanticoke', 'Shamokin', 'Sunbury', 'Williamsport', 'Bloomsburg', 'Selinsgrove', 'Lewisburg', 'Towanda', 'Warren', 'Oil City', 'Franklin', 'Meadville', 'New Castle', 'Sharon', 'Hermitage', 'Greenville', 'Butler', 'Washington', 'Canonsburg', 'Monongahela', 'McKeesport', 'New Kensington', 'Uniontown', 'Connellsville', 'Greensburg', 'Jeannette', 'Latrobe', 'Indiana', 'Johnstown', 'Somerset', 'Bedford', 'Huntingdon', 'DuBois', 'Clearfield', 'St. Marys', 'Bradford', 'Sayre', 'Towanda', 'Montrose', 'Honesdale', 'Milford', 'East Stroudsburg', 'Stroudsburg', 'Bethlehem', 'Easton', 'Nazareth', 'Allentown', 'Emmaus', 'Bethlehem', 'Quakertown', 'Souderton', 'Harleysville', 'Lansdale', 'North Wales', 'Doylestown', 'New Hope', 'Sellersville', 'Perkasie', 'Souderton', 'Hatfield', 'Colmar', 'Lansdale', 'North Wales', 'Gwynedd Valley', 'Blue Bell', 'Ambler', 'Fort Washington', 'Conshohocken', 'Plymouth Meeting', 'Norristown', 'Bridgeport', 'King of Prussia', 'Phoenixville', 'Pottstown', 'Coatesville', 'Downingtown', 'West Chester', 'Exton', 'Kennett Square', 'West Chester', 'Chadds Ford', 'Media', 'Swarthmore', 'Broomall', 'Springfield', 'Clifton Heights', 'Drexel Hill', 'Upper Darby', 'Darby', 'Sharon Hill', 'Collingdale', 'Folcroft', 'Prospect Park', 'Norwood', 'Glenolden', 'Ridley Park', 'Ridley Township', 'Folsom', 'Springfield', 'Morton', 'Aldan', 'Lansdowne', 'Yeadon', 'Upper Darby', 'Drexel Hill', 'Havertown', 'Broomall', 'Newtown Square', 'Radnor', 'Wayne', 'Villanova', 'Bryn Mawr', 'Haverford', 'Ardmore', 'Wynnewood', 'Narberth', 'Merion', 'Penn Wynne', 'Overbrook', 'Upper Darby', 'Drexel Hill', 'Clifton Heights', 'Lansdowne', 'Yeadon', 'Darby', 'Sharon Hill', 'Collingdale', 'Folcroft', 'Prospect Park', 'Norwood', 'Glenolden', 'Ridley Park', 'Ridley Township', 'Folsom', 'Springfield', 'Morton', 'Aldan', 'Lansdowne', 'Yeadon', 'Upper Darby', 'Drexel Hill', 'Havertown', 'Broomall', 'Newtown Square', 'Radnor', 'Wayne', 'Villanova', 'Bryn Mawr', 'Haverford', 'Ardmore', 'Wynnewood', 'Narberth', 'Merion', 'Penn Wynne', 'Overbrook'],
  RI: ['Providence County', 'Kent County', 'Washington County', 'Newport County', 'Bristol County', 'Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Cumberland', 'North Providence', 'West Warwick', 'Coventry', 'Johnston', 'North Kingstown', 'South Kingstown', 'West Greenwich', 'East Greenwich', 'Narragansett', 'North Smithfield', 'Lincoln', 'Smithfield', 'Glocester', 'Foster', 'Scituate', 'Burrillville', 'Central Falls', 'Barrington', 'Bristol', 'Warren', 'Tiverton', 'Little Compton', 'Portsmouth', 'Middletown', 'Newport', 'Jamestown', 'Block Island'],
  VT: ['Chittenden County', 'Rutland County', 'Washington County', 'Windham County', 'Addison County', 'Franklin County', 'Lamoille County', 'Orange County', 'Orleans County', 'Caledonia County', 'Essex County', 'Bennington County', 'Grand Isle County', 'Windsor County', 'Burlington', 'South Burlington', 'Rutland', 'Montpelier', 'Barre', 'St. Albans', 'Winooski', 'Newport', 'St. Johnsbury', 'Middlebury', 'Brattleboro', 'Bennington', 'Springfield', 'White River Junction', 'Essex Junction', 'Colchester', 'Milton', 'Swanton', 'Shelburne', 'Williston', 'South Hero', 'St. Albans', 'Enosburg Falls', 'Richford', 'Newport', 'Derby Line', 'North Troy', 'Coventry', 'Jay', 'Westfield', 'Newport', 'St. Johnsbury', 'Lyndonville', 'Burke', 'East Burke', 'Danville', 'Barnet', 'Groton', 'Hardwick', 'Wolcott', 'Morrisville', 'Hyde Park', 'Johnson', 'Cambridge', 'Jeffersonville', 'Waterbury', 'Duxbury', 'Moretown', 'Waitsfield', 'Fayston', 'Warren', 'Granville', 'Roxbury', 'Braintree', 'Brookfield', 'Randolph', 'Bethel', 'Rochester', 'Stockbridge', 'Pittsfield', 'Killington', 'Mendon', 'Rutland', 'Castleton', 'Fair Haven', 'Poultney', 'Brandon', 'Middlebury', 'Vergennes', 'Bristol', 'Shoreham', 'Addison', 'Starksboro', 'Ferrisburg', 'Swanton', 'Highgate', 'Alburg', 'Grand Isle', 'North Hero', 'South Hero', 'Isle La Motte', 'Georgia', 'Milton', 'Colchester', 'Essex Junction', 'Winooski', 'South Burlington', 'Shelburne', 'Charlotte', 'Hinesburg', 'Williston', 'St. George', 'Richmond', 'Bolton', 'Duxbury', 'Waterbury', 'Moretown', 'Waitsfield', 'Warren', 'Fayston', 'Granville', 'Roxbury', 'Braintree', 'Brookfield', 'Randolph', 'Bethel', 'Rochester', 'Stockbridge', 'Pittsfield', 'Killington', 'Mendon', 'Rutland', 'Castleton', 'Fair Haven', 'Poultney', 'Brandon', 'Middlebury', 'Vergennes', 'Bristol', 'Shoreham', 'Addison', 'Starksboro', 'Ferrisburg', 'Brattleboro', 'Bellows Falls', 'Westminster', 'Putney', 'Dummerston', 'Guilford', 'Vernon', 'Rockingham', 'Bellows Falls', 'Springfield', 'Windsor', 'Hartland', 'Woodstock', 'Quechee', 'White River Junction', 'Norwich', 'Hanover', 'Lebanon', 'Wilder', 'Enfield', 'Canaan', 'Lyme', 'Orford', 'Fairlee', 'Bradford', 'Piermont', 'Haverhill', 'Woodsville', 'Benton', 'Orford', 'Fairlee', 'Bradford', 'Newbury', 'Wells River', 'Groton', 'Ryegate', 'Barnet', 'Peacham', 'Barnet', 'St. Johnsbury', 'Lyndonville', 'Burke', 'East Burke', 'Danville', 'Barnet', 'Groton', 'Hardwick', 'Wolcott', 'Morrisville', 'Hyde Park', 'Johnson', 'Cambridge', 'Jeffersonville', 'Waterbury', 'Duxbury', 'Moretown', 'Waitsfield', 'Fayston', 'Warren', 'Granville', 'Roxbury', 'Braintree', 'Brookfield', 'Randolph', 'Bethel', 'Rochester', 'Stockbridge', 'Pittsfield', 'Killington', 'Mendon', 'Rutland', 'Castleton', 'Fair Haven', 'Poultney', 'Brandon', 'Middlebury', 'Vergennes', 'Bristol', 'Shoreham', 'Addison', 'Starksboro', 'Ferrisburg'],
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
