import { Router } from 'express';
import { analyzeEligibility, getFallbackPrograms } from '../services/anthropic.js';
import { saveSession } from '../services/supabase.js';

const router = Router();

router.post('/analyze', async (req, res) => {
  try {
    const { intake, language = 'en' } = req.body;

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
