import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function LanguageToggle({ compact = false }) {
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('northeastassist-lang', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 rounded-lg border border-white/20 hover:border-accent/50 hover:text-accent transition-all duration-300 ${
        compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      } font-medium text-white/70`}
      aria-label="Toggle language"
    >
      <span className="text-accent">🌐</span>
      {t('nav.language')}
    </button>
  );
}
