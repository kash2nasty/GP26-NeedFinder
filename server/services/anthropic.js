import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const VALID_CATEGORIES = [
  'food', 'housing', 'healthcare', 'childcare', 'utilities',
  'employment', 'education', 'legal', 'mental_health', 'transportation', 'business',
];

function buildSystemPrompt(language) {
  const langInstruction = language === 'es'
    ? 'Write ALL text fields (description, eligibility_reason, required_documents items) in Spanish.'
    : 'Write ALL text fields in plain, simple English, no government jargon.';

  return `You are an expert benefits eligibility navigator specializing in government assistance programs across the Northeast United States (Connecticut, Delaware, Massachusetts, Maryland, Maine, New Hampshire, New Jersey, New York, Pennsylvania, Rhode Island, and Vermont).

IMPORTANT: Never use em dashes in your responses. Use regular hyphens (-), commas (,), or colons (:) instead.

Your job is to analyze a user's personal situation and return EVERY federal, state, and local program they could realistically qualify for.

${langInstruction}

Return ONLY a valid JSON array. Each object must have exactly these fields:
- program_name (string)
- agency (string)
- description (string, 2-3 sentences in plain language)
- eligibility_reason (string, explain why THIS specific user qualifies based on their data)
- required_documents (array of strings)
- apply_url (string, real URL when possible, or official agency page)
- category (one of: ${VALID_CATEGORIES.join(', ')})
- is_federal (boolean)

Be thorough - include ALL of the following programs when relevant:

FEDERAL PROGRAMS:
- SNAP (Supplemental Nutrition Assistance Program)
- Medicaid
- Medicare
- CHIP (Children's Health Insurance Program)
- WIC (Women, Infants, and Children)
- TANF (Temporary Assistance for Needy Families)
- SSI (Supplemental Security Income)
- SSDI (Social Security Disability Insurance)
- Social Security benefits
- Housing Choice Voucher (Section 8)
- Public Housing
- HOME Investment Partnerships Program
- LIHEAP (Low Income Home Energy Assistance Program)
- Head Start
- Early Head Start
- FAFSA / Pell Grant
- Federal Work Study
- Perkins Loan
- AmeriCorps
- Job Corps
- WIOA (Workforce Innovation and Opportunity Act) workforce training
- Veterans Benefits: VA healthcare, disability compensation, pension, education GI Bill, home loan
- EITC (Earned Income Tax Credit)
- Child Tax Credit
- Child and Dependent Care Tax Credit
- Free and Reduced School Lunch
- School Breakfast Program
- Summer Food Service Program
- USDA Rural Development loans
- FHA loans
- Community Development Block Grants
- Ryan White HIV/AIDS Program
- Substance Abuse treatment grants
- Mental Health block grants

PENNSYLVANIA SPECIFIC:
- COMPASS benefits portal
- PA Medical Assistance
- PA CHIP
- PA Cash Assistance
- PA Food Assistance
- PACENET/PACE (prescription assistance for seniors)
- Property Tax/Rent Rebate Program
- PA Student Assistance Program (PHEAA)
- PA CareerLink workforce centers
- Rapid Housing Assistance
- Emergency Rental Assistance Program
- Utility Emergency Services Fund (UESF)
- Low Income Home Energy Assistance
- Philadelphia Housing Authority programs
- Philly Office of Homeless Services
- PA Department of Aging services
- Statewide Adoption Network
- PA Legal Aid Network
- Community Legal Services Philadelphia
- Philadelphia Water Revenue Bureau assistance
- Philly Neighborhood Energy Centers

NEW YORK SPECIFIC:
- NY SNAP
- NY Medicaid
- NY CHIP
- Empire State Child Credit
- NY Earned Income Credit
- HEAP (Home Energy Assistance)
- NY Rental Assistance
- NYCHA housing
- NY Office of Temporary and Disability Assistance programs
- NY State Education Department grants
- Excelsior Scholarship
- NY tuition assistance program (TAP)
- NY Legal Aid Society
- NY Office for the Aging

NEW JERSEY SPECIFIC:
- NJ FamilyCare
- NJ SNAP
- WorkFirst NJ
- NJ Earned Income Tax Credit
- LIHEAP NJ
- NJ Affordable Housing programs
- NJ Department of Human Services programs
- NJ Transit reduced fare
- Senior Gold Prescription Discount
- NJ Legal Services

MASSACHUSETTS SPECIFIC:
- MassHealth
- MA SNAP
- Emergency Aid to Elders Disabled and Children
- MA Rental Voucher Program
- Residential Assistance for Families in Transition
- MA Department of Transitional Assistance programs
- MA Education Financing Authority
- MA Legal Aid

CONNECTICUT SPECIFIC:
- HUSKY Health (Medicaid/CHIP)
- CT SNAP
- Connecticut Energy Assistance Program
- RENTConnect
- Connecticut Homecare Program for Elders
- CT Department of Social Services programs

MARYLAND SPECIFIC:
- Maryland Medicaid
- MD SNAP
- Maryland Energy Assistance Program
- Maryland Rental Assistance
- MD CASH Campaign tax credits
- Maryland Legal Aid

MAINE SPECIFIC:
- MaineCare
- ME SNAP
- Maine Housing programs
- Maine Energy Assistance
- Maine Legal Services

NEW HAMPSHIRE SPECIFIC:
- NH Medicaid
- NH SNAP
- NH Electric Assistance Program
- NH Housing Finance Authority
- NH Legal Assistance

RHODE ISLAND SPECIFIC:
- Medicaid RI
- RI SNAP
- RIHousing programs
- RI Energy Assistance
- Rhode Island Legal Services

VERMONT SPECIFIC:
- Vermont Medicaid
- VT SNAP
- Vermont Rental Housing Vouchers
- HEAT program
- Vermont Legal Aid

DELAWARE SPECIFIC:
- Delaware Medicaid
- DE SNAP
- Delaware Housing Assistance
- LIHEAP Delaware
- Community Legal Aid Society

Consider the user's state, county, income, household size, demographics, employment status, veteran/disability status, immigration status, and specific needs.

Return at least 8-15 programs when possible. Only return the JSON array, no markdown or explanation.`;
}

function buildUserPrompt(intake) {
  return `You are a benefits eligibility expert for the Northeast United States. 
A user has submitted the following information:
- State: ${intake.state}
- County: ${intake.county}
- Household size: ${intake.householdSize}
- Annual household income: $${intake.annualIncome}
- Employment status: ${intake.employmentStatus}
- Age: ${intake.age}
- Gender: ${intake.gender}
- Race/Ethnicity: ${intake.raceEthnicity?.join(', ') || 'Not specified'}
- Veteran status: ${intake.isVeteran ? 'Yes' : 'No'}
- Disability status: ${intake.hasDisability ? 'Yes' : 'No'}
- Immigration/citizenship status: ${intake.immigrationStatus}
- Currently receiving assistance: ${intake.currentAssistance?.length ? intake.currentAssistance.join(', ') : 'None'}
- Areas of need: ${intake.needs?.join(', ') || 'General assistance'}
- Head of household: ${intake.isHeadOfHousehold ? 'Yes' : 'No'}

You must return a minimum of 15 programs. Do not stop at the obvious federal programs. Include state specific programs for ${intake.state}, county level resources for ${intake.county}, local nonprofit programs, tax credits, workforce programs, housing assistance, legal aid, childcare subsidies, and any other relevant assistance this specific user qualifies for based on every detail of their profile. A response with fewer than 15 programs is incomplete.

Based on ALL of this specific information, return a comprehensive and personalized JSON array of EVERY federal, state, and local benefit program this specific person qualifies for. Return AT LEAST 15 programs and as many as 40 if applicable. Each program must be directly relevant to this person's specific situation — do not return generic programs that don't apply to their profile. Do not return the same programs regardless of input.

Return only a raw JSON array with no markdown, no backticks, no explanation. Each object must have these exact fields: program_name, agency, description, eligibility_reason, required_documents, apply_url, category, is_federal.

Do not use em dashes anywhere in your response. Use commas, colons, or hyphens instead.`;
}

function parseProgramsResponse(text) {
  let cleaned = text.trim();
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '');
  
  // Remove any leading/trailing non-JSON content
  cleaned = cleaned.replace(/^[^{[]*/, '').replace(/[^}\]]*$/, '');
  
  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) {
      throw new Error('AI response is not an array');
    }
    return parsed.map((program, index) => ({
      id: `program-${index}-${Date.now()}`,
      program_name: program.program_name || 'Unknown Program',
      agency: program.agency || 'Government Agency',
      description: program.description || '',
      eligibility_reason: program.eligibility_reason || '',
      required_documents: Array.isArray(program.required_documents) ? program.required_documents : [],
      apply_url: program.apply_url || '#',
      category: VALID_CATEGORIES.includes(program.category) ? program.category : 'food',
      is_federal: Boolean(program.is_federal),
    }));
  } catch (parseError) {
    console.error('JSON parsing error:', parseError.message);
    console.error('Cleaned text:', cleaned.substring(0, 500));
    throw new Error(`Failed to parse AI response: ${parseError.message}`);
  }
}

function getFallbackPrograms(intake, language) {
  const isEs = language === 'es';
  const state = intake.state;

  return [
    {
      id: 'fallback-snap',
      program_name: isEs ? 'SNAP (Cupones para Alimentos)' : 'SNAP (Supplemental Nutrition Assistance Program)',
      agency: isEs ? 'USDA / Departamento de Agricultura' : 'USDA / State Department of Human Services',
      description: isEs
        ? 'SNAP ayuda a familias de bajos ingresos a comprar alimentos nutritivos. Recibirás una tarjeta EBT para usar en tiendas de comestibles.'
        : 'SNAP helps low-income households buy nutritious food. You receive an EBT card to use at grocery stores and farmers markets.',
      eligibility_reason: isEs
        ? `Con un hogar de ${intake.householdSize} personas e ingresos de $${intake.annualIncome}, es probable que califiques según las pautas de ingresos de ${state}.`
        : `With a household of ${intake.householdSize} and income of $${intake.annualIncome}, you likely meet ${state}'s income guidelines.`,
      required_documents: isEs
        ? ['Identificación con foto', 'Comprobante de ingresos', 'Comprobante de residencia', 'Números de Seguro Social de todos los miembros del hogar']
        : ['Photo ID', 'Proof of income', 'Proof of residency', 'Social Security numbers for all household members'],
      apply_url: 'https://www.fns.usda.gov/snap/state-directory',
      category: 'food',
      is_federal: true,
    },
    {
      id: 'fallback-medicaid',
      program_name: isEs ? 'Medicaid / CHIP' : 'Medicaid / CHIP',
      agency: isEs ? `Departamento de Salud de ${state}` : `${state} Department of Health`,
      description: isEs
        ? 'Cobertura médica gratuita o de bajo costo para personas elegibles, incluyendo niños, embarazadas, personas mayores y personas con discapacidades.'
        : 'Free or low-cost health coverage for eligible individuals including children, pregnant women, seniors, and people with disabilities.',
      eligibility_reason: isEs
        ? 'Los ingresos de tu hogar están dentro del rango típico de elegibilidad para Medicaid en el noreste.'
        : 'Your household income falls within typical Medicaid eligibility ranges for Northeast states.',
      required_documents: isEs
        ? ['Identificación', 'Comprobante de ingresos', 'Comprobante de ciudadanía o estatus migratorio']
        : ['ID', 'Proof of income', 'Proof of citizenship or immigration status'],
      apply_url: 'https://www.healthcare.gov/medicaid-chip/',
      category: 'healthcare',
      is_federal: true,
    },
    {
      id: 'fallback-liheap',
      program_name: isEs ? 'LIHEAP (Asistencia Energética)' : 'LIHEAP (Low Income Home Energy Assistance)',
      agency: isEs ? 'Administración de Recursos y Servicios Comunitarios' : 'Administration for Community Living',
      description: isEs
        ? 'Ayuda a pagar facturas de calefacción, refrigeración y energía para hogares elegibles de bajos ingresos.'
        : 'Helps pay heating, cooling, and energy bills for eligible low-income households.',
      eligibility_reason: intake.needs?.includes('utilities')
        ? (isEs ? 'Seleccionaste ayuda con servicios públicos, LIHEAP está diseñado exactamente para eso.' : 'You selected utilities assistance, LIHEAP is designed for exactly that.')
        : (isEs ? 'Los ingresos de tu hogar califican para asistencia energética en la mayoría de los estados del noreste.' : 'Your household income qualifies for energy assistance in most Northeast states.'),
      required_documents: isEs
        ? ['Factura de servicios reciente', 'Comprobante de ingresos', 'Comprobante de residencia']
        : ['Recent utility bill', 'Proof of income', 'Proof of residency'],
      apply_url: 'https://www.acf.hhs.gov/ocs/programs/liheap',
      category: 'utilities',
      is_federal: true,
    },
  ];
}

export async function analyzeEligibility(intake, language = 'en') {
  console.log('=== Eligibility Analysis Request ===');
  console.log('Full intake data:', JSON.stringify(intake, null, 2));
  console.log('Language:', language);

  if (!process.env.GEMINI_API_KEY) {
    console.warn('No Gemini API key, returning fallback programs');
    return getFallbackPrograms(intake, language);
  }

  try {
    const fullPrompt = `${buildSystemPrompt(language)}\n\n${buildUserPrompt(intake)}`;
    console.log('Sending prompt to Gemini...');
    
    let programs;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount <= maxRetries) {
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text;
      console.log('Gemini response received, length:', text.length);
      
      programs = parseProgramsResponse(text);
      console.log('Parsed programs count:', programs.length);
      
      // If we have more than 3 programs, we're good
      if (programs.length > 3) {
        break;
      }
      
      // If we have 3 or fewer programs and haven't hit max retries, retry
      if (retryCount < maxRetries) {
        console.log(`Only ${programs.length} programs returned, retrying (${retryCount + 1}/${maxRetries})...`);
        const retryPrompt = fullPrompt + `\n\nYour previous response only returned ${programs.length} programs. This is not enough. This user qualifies for far more than ${programs.length} programs based on their profile. Return at least 15 programs total including the ones you already found plus additional federal, state, county, and local programs specific to ${intake.state} and ${intake.county}. Be thorough and dig into lesser known programs beyond the obvious ones.`;
        programs = parseProgramsResponse((await model.generateContent(retryPrompt)).response.text);
        retryCount++;
      } else {
        console.warn(`Still only ${programs.length} programs after ${maxRetries} retries, returning as-is`);
        break;
      }
    }
    
    return programs;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

export { getFallbackPrograms };
