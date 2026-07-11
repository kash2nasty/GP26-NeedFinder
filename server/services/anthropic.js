import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

Be thorough - include SNAP, Medicaid, LIHEAP, WIC, Section 8, unemployment, state-specific programs, local food banks with official programs, energy assistance, childcare subsidies, veterans benefits, disability programs, immigrant-eligible programs where applicable, and any other relevant programs.

Consider the user's state, county, income, household size, demographics, employment status, veteran/disability status, immigration status, and specific needs.

Return at least 8-15 programs when possible. Only return the JSON array, no markdown or explanation.`;
}

function buildUserPrompt(intake) {
  return `Analyze eligibility for this Northeast US resident:

LOCATION:
- State: ${intake.state}
- County/City: ${intake.county}

HOUSEHOLD:
- Household size: ${intake.householdSize}
- Head of household: ${intake.isHeadOfHousehold ? 'Yes' : 'No'}

FINANCIAL:
- Annual household income: $${intake.annualIncome}
- Employment status: ${intake.employmentStatus}
- Currently receiving assistance: ${intake.currentAssistance?.length ? intake.currentAssistance.join(', ') : 'None'}

DEMOGRAPHICS:
- Age: ${intake.age}
- Race/Ethnicity: ${intake.raceEthnicity?.join(', ') || 'Not specified'}
- Gender: ${intake.gender}
- Veteran: ${intake.isVeteran ? 'Yes' : 'No'}
- Disability: ${intake.hasDisability ? 'Yes' : 'No'}
- Immigration/Citizenship: ${intake.immigrationStatus}

SPECIFIC NEEDS:
${intake.needs?.map(n => `- ${n}`).join('\n') || '- General assistance'}

Return the JSON array of qualifying programs.`;
}

function parseProgramsResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

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
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('No Anthropic API key, returning fallback programs');
    return getFallbackPrograms(intake, language);
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: buildSystemPrompt(language),
      messages: [
        { role: 'user', content: buildUserPrompt(intake) },
      ],
    });

    const textBlock = response.content.find(block => block.type === 'text');
    if (!textBlock) {
      throw new Error('No text response from AI');
    }

    return parseProgramsResponse(textBlock.text);
  } catch (error) {
    console.error('Anthropic API error:', error.message);
    throw error;
  }
}

export { getFallbackPrograms };
