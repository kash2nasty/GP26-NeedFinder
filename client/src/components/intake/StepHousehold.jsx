import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StepHousehold({ data, updateData }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-1">{t('intake.step2Title')}</h2>
        <p className="text-white/50 text-xs md:text-sm">{t('intake.step2Desc')}</p>
      </div>

      <div>
        <label className="block text-sm md:text-base font-medium text-white/70 mb-4">{t('intake.householdSize')}</label>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => updateData({ householdSize: Math.max(1, data.householdSize - 1) })}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-accent/50 hover:text-accent transition-all"
          >
            <Minus size={16} />
          </button>
          <span className="font-display text-3xl md:text-4xl font-bold text-accent w-12 md:w-16 text-center">
            {data.householdSize}
          </span>
          <button
            type="button"
            onClick={() => updateData({ householdSize: Math.min(20, data.householdSize + 1) })}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-accent/50 hover:text-accent transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.isHeadOfHousehold}
          onChange={e => updateData({ isHeadOfHousehold: e.target.checked })}
          className="w-5 h-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent focus:ring-offset-0"
        />
        <span className="text-white/70 group-hover:text-white transition-colors">
          {t('intake.headOfHousehold')}
        </span>
      </label>
    </motion.div>
  );
}
