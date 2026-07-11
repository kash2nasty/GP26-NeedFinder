import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_INTAKE } from '../data/constants';
import { analyzeEligibility } from '../api/client';
import LoadingScreen from '../components/LoadingScreen';
import StepLocation from '../components/intake/StepLocation';
import StepHousehold from '../components/intake/StepHousehold';
import StepFinancial from '../components/intake/StepFinancial';
import StepDemographics from '../components/intake/StepDemographics';
import StepNeeds from '../components/intake/StepNeeds';
import StepLanguage from '../components/intake/StepLanguage';

const TOTAL_STEPS = 6;

const STEP_COMPONENTS = [
  StepLocation,
  StepHousehold,
  StepFinancial,
  StepDemographics,
  StepNeeds,
  StepLanguage,
];

function validateStep(step, data) {
  switch (step) {
    case 0: return data.state && data.county;
    case 1: return data.householdSize >= 1;
    case 2: return data.employmentStatus;
    case 3: return data.age > 0 && data.immigrationStatus;
    case 4: return data.needs?.length > 0;
    case 5: return data.language;
    default: return true;
  }
}

export default function Intake() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...DEFAULT_INTAKE, language: i18n.language });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (updates) => setData(prev => ({ ...prev, ...updates }));

  const handleNext = async () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeEligibility(data, i18n.language);
      sessionStorage.setItem('northeastassist-results', JSON.stringify({
        programs: result.programs,
        intake: data,
        sessionId: result.sessionId,
        firstName: data.firstName,
      }));
      navigate('/results');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const StepComponent = STEP_COMPONENTS[step];
  const canProceed = validateStep(step, data);
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  if (loading) {
    return (
      <LoadingScreen
        message={t('intake.loading')}
        submessage={t('intake.loadingSub')}
      />
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            {t('intake.title')}
          </h1>
          <p className="text-white/50 text-sm text-center">
            {t('intake.step', { current: step + 1, total: TOTAL_STEPS })}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 mb-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <StepComponent key={step} data={data} updateData={updateData} />
          </AnimatePresence>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-3 rounded-xl text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} />
            {t('intake.back')}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="btn-glow flex items-center gap-1 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {step === TOTAL_STEPS - 1 ? t('intake.submit') : t('intake.next')}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
