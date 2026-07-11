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
  { name: 'Advik Kashyap' },
  { name: 'Sofia Tang' },
  { name: 'Ella Conger' },
  { name: 'Aditi Patil' },
  { name: 'Kent Foo' },
  { name: 'Neel Rege' },
  { name: 'Claire Englander' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 bg-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">About GP 26 NeedFinder</h1>
          <div className="w-24 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Mission */}
        <motion.div {...fadeUp} className="py-12 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            <Heart size={28} className="text-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">{t('about.missionTitle')}</h2>
          </div>
          <p className="text-muted text-xl leading-relaxed mb-8">{t('about.mission')}</p>
          <h3 className="font-display text-2xl font-semibold mb-4 text-body">{t('about.whyTitle')}</h3>
          <p className="text-muted text-lg leading-relaxed">{t('about.why')}</p>
        </motion.div>

        {/* Germination Project */}
        <motion.div {...fadeUp} className="py-12 border-b border-border">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-display font-bold text-2xl">GP</span>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('about.germinationTitle')}</h2>
              <p className="text-muted text-xl leading-relaxed mb-6">{t('about.germination')}</p>
              <a
                href="https://germinationproject.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-secondary hover:text-accent transition-colors font-medium underline underline-offset-4 text-lg"
              >
                {t('about.germinationLink')} →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div {...fadeUp} className="py-12 border-b border-border">
          <div className="flex items-center gap-3 mb-8">
            <Users size={28} className="text-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">Our Team</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map(member => (
              <div key={member.name} className="flex items-center gap-4 px-6 py-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-display font-bold text-xl">
                  {member.name[0]}
                </div>
                <p className="font-semibold text-lg text-body">{member.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div {...fadeUp} className="py-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={28} className="text-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">{t('about.privacyTitle')}</h2>
          </div>
          <p className="text-muted text-xl leading-relaxed">{t('about.privacy')}</p>
        </motion.div>
      </div>
    </div>
  );
}
