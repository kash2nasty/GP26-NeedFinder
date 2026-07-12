import { Router } from 'express';
import cors from 'cors';
import { analyzeEligibility, getFallbackPrograms } from '../services/anthropic.js';
import { saveSession } from '../services/supabase.js';

const router = Router();

router.options('/analyze', cors());
router.post('/analyze', async (req, res) => {
  try {
    const { intake, language = 'en' } = req.body;

    console.log('=== /api/eligibility/analyze endpoint hit ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Intake fields:', {
      state: intake?.state,
      county: intake?.county,
      householdSize: intake?.householdSize,
      annualIncome: intake?.annualIncome,
      employmentStatus: intake?.employmentStatus,
      age: intake?.age,
      gender: intake?.gender,
      raceEthnicity: intake?.raceEthnicity,
      isVeteran: intake?.isVeteran,
      hasDisability: intake?.hasDisability,
      immigrationStatus: intake?.immigrationStatus,
      currentAssistance: intake?.currentAssistance,
      needs: intake?.needs,
      isHeadOfHousehold: intake?.isHeadOfHousehold,
    });

    if (!intake || !intake.state) {
      return res.status(400).json({ error: 'Missing required intake data' });
    }

    let programs;
    try {
      programs = await analyzeEligibility(intake, language);
    } catch (aiError) {
      console.error('AI analysis failed, using fallback:', aiError.message);
      programs = getFallbackPrograms(intake, language);
    }

    const sessionId = await saveSession({
      intake,
      results: programs,
      language,
    });

    res.json({
      success: true,
      programs,
      sessionId,
      firstName: intake.firstName || null,
    });
  } catch (error) {
    console.error('Eligibility analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze eligibility',
      message: error.message,
      retryable: true,
    });
  }
});

export default router;
