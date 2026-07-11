import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Heart, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const team = [
  { name: 'Advik' },
  { name: 'Sofia' },
  { name: 'Ella' },
  { name: 'Aditi' },
  { name: 'Kent' },
  { name: 'Neel' },
  { name: 'Claire' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About GP 26 NeedFinder</h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Mission */}
        <motion.div {...fadeUp} className="glass-card p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={24} className="text-accent" />
            <h2 className="font-display text-2xl font-bold">{t('about.missionTitle')}</h2>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">{t('about.mission')}</p>
          <h3 className="font-display text-lg font-semibold mb-3">{t('about.whyTitle')}</h3>
          <p className="text-white/70 leading-relaxed">{t('about.why')}</p>
        </motion.div>

        {/* Germination Project */}
        <motion.div {...fadeUp} className="glass-card p-8 mb-8 border-purple/20">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src="/gp-logo.png"
              alt="Germination Project Logo"
              className="w-20 h-20 rounded-xl flex-shrink-0"
            />
            <div>
              <h2 className="font-display text-2xl font-bold mb-3">{t('about.germinationTitle')}</h2>
              <p className="text-white/70 leading-relaxed mb-4">{t('about.germination')}</p>
              <a
                href="https://germinationproject.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple hover:text-accent transition-colors font-medium underline underline-offset-4"
              >
                {t('about.germinationLink')} →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div {...fadeUp} className="glass-card p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Users size={24} className="text-accent" />
            <h2 className="font-display text-2xl font-bold">Our Team</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map(member => (
              <div key={member.name} className="flex items-center gap-4 bg-white/5 rounded-2xl px-6 py-4 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-purple flex items-center justify-center text-navy font-display font-bold text-xl">
                  {member.name[0]}
                </div>
                <p className="font-semibold text-lg">{member.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div {...fadeUp} className="glass-card p-8 border-accent/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-accent" />
            <h2 className="font-display text-2xl font-bold">{t('about.privacyTitle')}</h2>
          </div>
          <p className="text-white/70 leading-relaxed">{t('about.privacy')}</p>
        </motion.div>
      </div>
    </div>
  );
}
