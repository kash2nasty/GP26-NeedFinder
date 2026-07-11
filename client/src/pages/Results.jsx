import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Share2, RotateCcw, AlertCircle, Calendar, List } from 'lucide-react';
import { getSharedResults, createShareLink, fetchResources, analyzeEligibility } from '../api/client';
import { CATEGORY_LABELS } from '../data/constants';
import ProgramCard from '../components/ProgramCard';
import ResourceMap from '../components/ResourceMap';
import GerminationBanner from '../components/GerminationBanner';
import LoadingScreen from '../components/LoadingScreen';
import DeadlineCalendar from '../components/DeadlineCalendar';

export default function Results() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const lang = i18n.language === 'es' ? 'es' : 'en';

  const [programs, setPrograms] = useState([]);
  const [intake, setIntake] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(sessionId);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    async function loadResults() {
      setLoading(true);
      setError(null);

      try {
        let loadedIntake = null;

        if (sessionId) {
          const shared = await getSharedResults(sessionId);
          setPrograms(shared.programs);
          loadedIntake = shared.intake;
          setIntake(shared.intake);
          setFirstName(shared.intake?.firstName || '');
          if (shared.language) i18n.changeLanguage(shared.language);
        } else {
          const stored = sessionStorage.getItem('northeastassist-results');
          if (stored) {
            const parsed = JSON.parse(stored);
            setPrograms(parsed.programs);
            loadedIntake = parsed.intake;
            setIntake(parsed.intake);
            setFirstName(parsed.firstName || '');
            setCurrentSessionId(parsed.sessionId);
          } else {
            navigate('/intake');
            return;
          }
        }

        const state = loadedIntake?.state || 'PA';
        const resData = await fetchResources({ state, limit: 20 });
        setResources(resData.resources || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [sessionId, navigate, i18n]);

  useEffect(() => {
    if (intake?.state) {
      fetchResources({ state: intake.state, limit: 20 })
        .then(res => setResources(res.resources || []))
        .catch(() => {});
    }
  }, [intake?.state]);

  const categories = ['all', ...new Set(programs.map(p => p.category))];

  const filteredPrograms = activeCategory === 'all'
    ? programs
    : programs.filter(p => p.category === activeCategory);

  const toggleSave = (id) => {
    setSavedPrograms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    try {
      let shareUrl;
      if (currentSessionId) {
        const clientUrl = window.location.origin;
        shareUrl = `${clientUrl}/results/${currentSessionId}`;
      } else {
        const result = await createShareLink(intake, programs, lang);
        shareUrl = result.shareUrl;
        setCurrentSessionId(result.sessionId);
      }
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch {
      setShareCopied(false);
    }
  };

  const handleRetry = async () => {
    if (!intake) {
      navigate('/intake');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeEligibility(intake, lang);
      setPrograms(result.programs);
      setCurrentSessionId(result.sessionId);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message={t('intake.loading')} submessage={t('intake.loadingSub')} />;
  }

  if (error && programs.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">{t('results.error')}</h2>
          <p className="text-white/50 text-sm mb-6">{t('results.errorDesc')}</p>
          <button onClick={handleRetry} className="btn-glow mr-3">{t('results.retry')}</button>
          <Link to="/intake" className="btn-outline">{t('results.startOver')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {firstName
              ? t('results.titleWithName', { name: firstName })
              : t('results.title')}
          </h1>
          <p className="text-white/50">{t('results.subtitle')}</p>
          <p className="text-accent text-sm mt-2">
            {t('results.programsFound', { count: programs.length })}
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={handleShare} className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            <Share2 size={16} />
            {shareCopied ? t('results.shareCopied') : t('results.share')}
          </button>
          <Link to="/intake" className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            <RotateCcw size={16} />
            {t('results.startOver')}
          </Link>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-accent text-navy'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <List size={16} />
            {t('results.listView') || 'List View'}
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === 'calendar'
                ? 'bg-accent text-navy'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Calendar size={16} />
            {t('results.calendarView') || 'Calendar View'}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-navy'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat === 'all'
                ? t('results.all')
                : CATEGORY_LABELS[cat]?.[lang] || cat}
            </button>
          ))}
        </div>

        {/* Program cards or calendar */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map(program => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    isSaved={savedPrograms.includes(program.id)}
                    onSave={toggleSave}
                  />
                ))
              ) : (
                <p className="text-white/50 col-span-2 text-center py-12">{t('results.noPrograms')}</p>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mb-16">
            <DeadlineCalendar programs={filteredPrograms} />
          </div>
        )}

        {/* Map section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold mb-2">{t('results.nearbyTitle')}</h2>
          <p className="text-white/50 text-sm mb-6">{t('results.nearbySubtitle')}</p>
          <ResourceMap resources={resources} state={intake?.state || 'PA'} />
        </motion.div>

        {/* Germination banner */}
        <GerminationBanner />
      </div>
    </div>
  );
}
