import { motion } from 'framer-motion';
import { NORTHEAST_STATES, STATE_LOCATIONS } from '../../data/constants';
import { useTranslation } from 'react-i18next';

export default function StepLocation({ data, updateData }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const counties = data.state ? STATE_LOCATIONS[data.state] || [] : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-1">{t('intake.step1Title')}</h2>
        <p className="text-white/50 text-xs md:text-sm">{t('intake.step1Desc')}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">{t('intake.state')}</label>
        <select
          value={data.state}
          onChange={e => updateData({ state: e.target.value, county: '' })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer text-sm md:text-base"
        >
          <option value="" className="bg-charcoal">{t('intake.selectState')}</option>
          {NORTHEAST_STATES.map(s => (
            <option key={s.code} value={s.code} className="bg-charcoal">
              {lang === 'es' ? s.nameEs : s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">{t('intake.county')}</label>
        <select
          value={data.county}
          onChange={e => updateData({ county: e.target.value })}
          disabled={!data.state}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer disabled:opacity-40 text-sm md:text-base"
        >
          <option value="" className="bg-charcoal">{t('intake.selectCounty')}</option>
          {counties.map(c => (
            <option key={c} value={c} className="bg-charcoal">{c}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
