import { motion } from 'framer-motion';

export default function LoadingScreen({ message, submessage }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-6 max-w-md w-full"
      >
        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-4 bg-white/10 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: ['0%', '70%', '80%'][i - 1] }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-accent/20 to-accent/40"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-display font-semibold text-white mb-2"
        >
          {message}
        </motion.p>
        {submessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/50 text-sm"
          >
            {submessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
