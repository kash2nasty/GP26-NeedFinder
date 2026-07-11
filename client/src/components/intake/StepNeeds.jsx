import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NEEDS_OPTIONS } from '../../data/constants';

export default function StepNeeds({ data, updateData }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const toggleNeed = (value) => {
    const current = [...(data.needs || [])];
    if (current.includes(value)) {
      updateData({ needs: current.filter(v => v !== value) });
    } else {
      updateData({ needs: [...current, value] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">{t('intake.step5Title')}</h2>
        <p className="text-white/50 text-sm">{t('intake.step5Desc')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NEEDS_OPTIONS.map(opt => {
          const selected = data.needs?.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleNeed(opt.value)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                selected
                  ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(0,255,135,0.15)]'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className={`text-sm font-medium ${selected ? 'text-accent' : 'text-white/70'}`}>
                {lang === 'es' ? opt.labelEs : opt.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
