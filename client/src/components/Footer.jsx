import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-display font-bold text-lg">GP</span>
              </div>
              <span className="font-display font-bold text-xl">
                GP 26 <span className="text-accent">NeedFinder</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.mission')}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white/90">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/intake" className="text-white/60 hover:text-accent text-sm transition-colors">
                  {t('footer.findBenefits')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-accent text-sm transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <a
              href="https://germinationproject.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <img
                src="/gp-logo.png"
                alt="Germination Project Logo"
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <p className="text-sm text-white/60 group-hover:text-accent transition-colors">
                  {t('footer.builtBy')}
                </p>
                <p className="text-xs text-purple/80 group-hover:text-purple transition-colors">
                  germinationproject.com →
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            GP 26 NeedFinder, Built by students of The Germination Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
