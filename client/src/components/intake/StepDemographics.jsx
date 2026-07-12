import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RACE_OPTIONS, GENDER_OPTIONS, IMMIGRATION_OPTIONS } from '../../data/constants';

export default function StepDemographics({ data, updateData }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const toggleRace = (value) => {
    const current = [...(data.raceEthnicity || [])];
    if (current.includes(value)) {
      updateData({ raceEthnicity: current.filter(v => v !== value) });
    } else {
      updateData({ raceEthnicity: [...current, value] });
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
        <h2 className="font-display text-xl md:text-2xl font-bold mb-1">{t('intake.step4Title')}</h2>
        <p className="text-white/50 text-xs md:text-sm">{t('intake.step4Desc')}</p>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-2">{t('intake.age')}</label>
        <input
          type="number"
          value={data.age}
          onChange={e => updateData({ age: parseInt(e.target.value, 10) || 0 })}
          min={1}
          max={120}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 text-sm md:text-base"
        />
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-3">{t('intake.raceEthnicity')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RACE_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-white/5">
              <input
                type="checkbox"
                checked={data.raceEthnicity?.includes(opt.value)}
                onChange={() => toggleRace(opt.value)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent"
              />
              <span className="text-sm text-white/70 group-hover:text-white">
                {lang === 'es' ? opt.labelEs : opt.labelEn}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-2">{t('intake.gender')}</label>
        <select
          value={data.gender}
          onChange={e => updateData({ gender: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 appearance-none cursor-pointer text-sm md:text-base"
        >
          <option value="" className="bg-charcoal">{t('intake.selectGender')}</option>
          {GENDER_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-charcoal">
              {lang === 'es' ? opt.labelEs : opt.labelEn}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-1 p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30">
          <input
            type="checkbox"
            checked={data.isVeteran}
            onChange={e => updateData({ isVeteran: e.target.checked })}
            className="w-4 md:w-5 h-4 md:h-5 rounded text-accent"
          />
          <span className="text-xs md:text-sm text-white/70 group-hover:text-white">{t('intake.veteran')}</span>
        </label>
        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-1 p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30">
          <input
            type="checkbox"
            checked={data.hasDisability}
            onChange={e => updateData({ hasDisability: e.target.checked })}
            className="w-4 md:w-5 h-4 md:h-5 rounded text-accent"
          />
          <span className="text-xs md:text-sm text-white/70 group-hover:text-white">{t('intake.disability')}</span>
        </label>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-white/70 mb-2">{t('intake.immigrationStatus')}</label>
        <select
          value={data.immigrationStatus}
          onChange={e => updateData({ immigrationStatus: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:border-accent/50 appearance-none cursor-pointer text-sm md:text-base"
        >
          <option value="" className="bg-charcoal">{t('intake.selectImmigration')}</option>
          {IMMIGRATION_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-charcoal">
              {lang === 'es' ? opt.labelEs : opt.labelEn}
            </option>
          ))}
        </select>
        <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
          <Shield size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-white/60 leading-relaxed">{t('intake.immigrationNote')}</p>
        </div>
      </div>
    </motion.div>
  );
}
