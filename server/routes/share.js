import { Router } from 'express';
import { getSession, saveSession } from '../services/supabase.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { intake, results, language } = req.body;

    if (!results || !Array.isArray(results)) {
      return res.status(400).json({ error: 'Missing results data' });
    }

    const sessionId = await saveSession({ intake, results, language });
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    res.json({
      success: true,
      sessionId,
      shareUrl: `${clientUrl}/results/${sessionId}`,
    });
  } catch (error) {
    console.error('Share creation error:', error);
    res.status(500).json({ error: 'Failed to create share link' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const session = await getSession(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      success: true,
      intake: session.intake_data,
      programs: session.results,
      language: session.language,
    });
  } catch (error) {
    console.error('Share retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve shared results' });
  }
});

export default router;
