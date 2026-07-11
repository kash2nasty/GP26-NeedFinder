import { useTranslation } from 'react-i18next';

export default function GerminationBanner() {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-4 md:p-6 flex items-center gap-4 border-purple/20">
      <img
        src="/gp-logo.jpg" 
        alt="Germination Project Logo"
        className="w-10 h-10 rounded-lg flex-shrink-0"
      />
      <p className="text-sm text-white/70 leading-relaxed">
        {t('banner.text')}{' '}
        <a
          href="https://germinationproject.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple hover:text-accent transition-colors underline underline-offset-2"
        >
          germinationproject.com
        </a>
      </p>
    </div>
  );
}
