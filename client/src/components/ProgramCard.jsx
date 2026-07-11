import { motion } from 'framer-motion';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CATEGORY_LABELS } from '../data/constants';

export default function ProgramCard({ program, isSaved, onSave }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const categoryLabel = CATEGORY_LABELS[program.category]?.[lang] || program.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              {categoryLabel}
            </span>
            {program.is_federal && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple/20 text-purple font-medium">
                {t('results.federal')}
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-lg text-white group-hover:text-accent transition-colors">
            {program.program_name}
          </h3>
          <p className="text-white/50 text-sm">{program.agency}</p>
        </div>
        <button
          onClick={() => onSave(program.id)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label={isSaved ? t('results.saved') : t('results.save')}
        >
          {isSaved ? (
            <BookmarkCheck size={20} className="text-accent" />
          ) : (
            <Bookmark size={20} className="text-white/40 hover:text-accent" />
          )}
        </button>
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-4">
        {program.description}
      </p>

      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wide">
          {t('results.eligibility')}
        </p>
        <p className="text-white/70 text-sm">{program.eligibility_reason}</p>
      </div>

      {program.required_documents?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
            {t('results.documents')}
          </p>
          <ul className="space-y-1">
            {program.required_documents.map((doc, i) => (
              <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={program.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow w-full text-sm py-2.5 flex items-center justify-center gap-2"
      >
        {t('results.apply')}
        <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}
