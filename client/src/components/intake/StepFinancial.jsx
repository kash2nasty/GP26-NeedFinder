import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EMPLOYMENT_OPTIONS, ASSISTANCE_OPTIONS } from '../../data/constants';

export default function StepFinancial({ data, updateData }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const toggleAssistance = (value) => {
    let current = [...(data.currentAssistance || [])];
    if (value === 'none') {
      current = ['none'];
    } else {
      current = current.filter(v => v !== 'none');
      if (current.includes(value)) {
        current = current.filter(v => v !== value);
      } else {
        current.push(value);
      }
    }
    updateData({ currentAssistance: current });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-1">{t('intake.step3Title')}</h2>
        <p className="text-white/50 text-xs md:text-sm">{t('intake.step3Desc')}</p>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-2">
          {t('intake.annualIncome')}: <span className="text-accent font-bold">${data.annualIncome.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min={0}
          max={150000}
          step={1000}
          value={data.annualIncome}
          onChange={e => updateData({ annualIncome: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>$0</span>
          <span>$150,000+</span>
        </div>
        <input
          type="number"
          value={data.annualIncome}
          onChange={e => updateData({ annualIncome: parseInt(e.target.value, 10) || 0 })}
          className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 text-white focus:outline-none focus:border-accent/50 text-sm md:text-base"
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">{t('intake.employmentStatus')}</label>
        <select
          value={data.employmentStatus}
          onChange={e => updateData({ employmentStatus: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 appearance-none cursor-pointer text-sm md:text-base"
        >
          <option value="" className="bg-charcoal">{t('intake.selectEmployment')}</option>
          {EMPLOYMENT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-charcoal">
              {lang === 'es' ? opt.labelEs : opt.labelEn}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-3">{t('intake.currentAssistance')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ASSISTANCE_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-white/5">
              <input
                type="checkbox"
                checked={data.currentAssistance?.includes(opt.value)}
                onChange={() => toggleAssistance(opt.value)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent"
              />
              <span className="text-sm text-white/70 group-hover:text-white">
                {lang === 'es' ? opt.labelEs : opt.labelEn}
              </span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
