export default function ResultsSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-10 w-2/3 max-w-lg bg-white/10 rounded-xl mb-3" />
        <div className="h-4 w-1/2 max-w-sm bg-white/5 rounded-lg mb-8" />

        <div className="flex gap-3 mb-8">
          <div className="h-9 w-28 bg-white/10 rounded-full" />
          <div className="h-9 w-28 bg-white/10 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 w-20 bg-white/10 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-accent/20 rounded-full" />
                <div className="h-5 w-14 bg-purple/20 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
              <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/5 rounded" />
                <div className="h-3 w-5/6 bg-white/5 rounded" />
                <div className="h-3 w-4/6 bg-white/5 rounded" />
              </div>
              <div className="h-20 bg-accent/5 rounded-xl border border-white/5" />
              <div className="h-10 bg-accent/20 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="h-6 w-48 bg-white/10 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-white/5 rounded-lg mb-6" />
        <div className="glass-card h-96 md:h-[28rem] bg-white/5 rounded-2xl" />
      </div>
    </div>
  );
}
