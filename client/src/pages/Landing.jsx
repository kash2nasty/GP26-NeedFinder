import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { ClipboardList, Brain, ListChecks, ChevronDown } from 'lucide-react';
import NortheastMap from '../components/NortheastMap';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Landing() {
  const { t } = useTranslation();

  const steps = [
    { icon: ClipboardList, title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
    { icon: Brain, title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
    { icon: ListChecks, title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
  ];

  const stats = [
    { value: '11', label: t('stats.states') },
    { value: '200+', label: t('stats.programs') },
    { value: '2', label: t('stats.languages') },
  ];

  const testimonials = [
    { quote: t('testimonials.t1Quote'), name: t('testimonials.t1Name'), location: t('testimonials.t1Location') },
    { quote: t('testimonials.t2Quote'), name: t('testimonials.t2Name'), location: t('testimonials.t2Location') },
    { quote: t('testimonials.t3Quote'), name: t('testimonials.t3Name'), location: t('testimonials.t3Location') },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-navy dot-pattern">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              AI-Powered Benefits Navigator
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
              {i18n.language === 'es' ? (
                <>Encuentra cada beneficio que te corresponde. <span className="text-accent">En segundos.</span></>
              ) : (
                <>Find every benefit you&apos;re owed. <span className="text-accent">In seconds.</span></>
              )}
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <Link to="/intake" className="btn-glow text-lg px-8 py-4 animate-glow inline-flex">
              {t('hero.cta')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16"
          >
            <ChevronDown className="mx-auto text-white/30 animate-bounce" size={28} />
          </motion.div>
        </div>
      </section>

      {/* How It Works - Asymmetric Layout */}
      <section className="py-32 px-4 sm:px-6 bg-gradient-to-br from-charcoal to-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="space-y-8">
              <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <span className="text-accent text-sm font-medium">How It Works</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Three simple steps to discover every program you qualify for
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                No complicated forms, no waiting on hold. Just answer a few questions and get your personalized benefits list in under 2 minutes.
              </p>
            </motion.div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`flex gap-6 p-6 rounded-2xl transition-all duration-300 ${
                    i === 0 ? 'bg-accent/10 border border-accent/20' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                    <step.icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent font-display font-bold text-sm mb-1">Step {i + 1}</div>
                    <h3 className="font-display font-semibold text-xl mb-2 text-white">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Full Width Color Block */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="font-display text-5xl md:text-6xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* States Map - Offset Layout */}
      <section className="py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Covering the entire Northeast
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                We track programs across all 11 Northeast states, from Connecticut to Vermont. Whether you are in Philadelphia, Boston, or anywhere in between, we have you covered.
              </p>
              <div className="space-y-4">
                {['Connecticut', 'Delaware', 'Massachusetts', 'Maryland', 'Maine', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont'].map((state, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-white/70">{state}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
              <NortheastMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Featured Quote Layout */}
      <section className="py-32 px-4 sm:px-6 bg-gradient-to-br from-purple/10 to-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Real Stories, Real Impact</h2>
            <p className="text-white/60 text-lg">See how GP 26 NeedFinder has helped people across the Northeast</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              {...fadeUp}
              className="lg:col-span-2 glass-card p-8 md:p-12 bg-gradient-to-br from-accent/10 to-transparent"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple flex items-center justify-center text-navy font-display font-bold text-2xl">
                  {testimonials[0].name[0]}
                </div>
                <div>
                  <p className="font-semibold text-xl text-white">{testimonials[0].name}</p>
                  <p className="text-white/50">{testimonials[0].location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-yellow-400 text-xl">★</span>
                ))}
 </div>
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed italic">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
            </motion.div>

            <div className="space-y-6">
              {testimonials.slice(1).map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card p-6 hover:border-accent/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-display font-bold">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Split Layout */}
      <section className="py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Got questions? We have answers. Here are the most common things people ask about GP 26 NeedFinder.
              </p>
              <div className="inline-flex items-center gap-2 text-accent font-medium">
                <span>Still have questions?</span>
                <span className="text-white/40">Contact us anytime</span>
              </div>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: 'Is GP 26 NeedFinder free to use?',
                  a: 'Yes, GP 26 NeedFinder is completely free. We built this as a public service to help Northeast residents find benefits they qualify for.'
                },
                {
                  q: 'How accurate are the results?',
                  a: 'Our AI analyzes your information against official program guidelines. While we strive for accuracy, always verify eligibility directly with the program administrator before applying.'
                },
                {
                  q: 'What states do you cover?',
                  a: 'We currently cover all 11 Northeast states: Connecticut, Delaware, Massachusetts, Maryland, Maine, New Hampshire, New Jersey, New York, Pennsylvania, Rhode Island, and Vermont.'
                },
                {
                  q: 'Is my personal information stored?',
                  a: 'Your information is used only to generate your personalized benefits list. We do not store, sell, or share your data with any third parties or government agencies.'
                },
                {
                  q: 'Can I use this if I am not a US citizen?',
                  a: 'Yes. Many programs are available to non-cizens, including permanent residents, DACA recipients, and undocumented individuals. Our tool helps identify programs you may qualify for regardless of citizenship status.'
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    i % 2 === 0 ? 'bg-white/5 border border-white/10' : 'bg-accent/5 border border-accent/10'
                  }`}
                >
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{faq.q}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Bold Full Width */}
      <section className="py-32 px-4 sm:px-6 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Start finding your benefits today
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Answer a few questions and get your personalized list of benefits in under 2 minutes. No cost, no signup required.
            </p>
            <Link to="/intake" className="btn-glow text-lg px-10 py-4">
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
