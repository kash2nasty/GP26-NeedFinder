import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function StepLanguage({ data, updateData }) {
  const { t } = useTranslation();

  const selectLanguage = (lang) => {
    updateData({ language: lang });
    i18n.changeLanguage(lang);
    localStorage.setItem('northeastassist-lang', lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">{t('intake.step6Title')}</h2>
        <p className="text-white/50 text-sm">{t('intake.step6Desc')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { code: 'en', label: t('intake.english'), flag: '🇺🇸' },
          { code: 'es', label: t('intake.spanish'), flag: '🇪🇸' },
        ].map(lang => {
          const selected = data.language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => selectLanguage(lang.code)}
              className={`flex flex-col items-center gap-3 p-8 rounded-2xl border transition-all duration-300 ${
                selected
                  ? 'border-accent bg-accent/10 shadow-[0_0_30px_rgba(0,255,135,0.2)]'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-4xl">{lang.flag}</span>
              <span className={`font-display font-semibold text-lg ${selected ? 'text-accent' : 'text-white/70'}`}>
                {lang.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
