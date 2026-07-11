import { useState } from 'react';
import { motion } from 'framer-motion';
import { NORTHEAST_STATES } from '../data/constants';

const STATE_PATHS = {
  CT: 'M 820 280 L 835 275 L 845 290 L 830 300 Z',
  DE: 'M 780 340 L 795 335 L 800 350 L 785 355 Z',
  MA: 'M 850 240 L 880 230 L 890 250 L 860 260 Z',
  MD: 'M 760 360 L 790 355 L 795 375 L 765 380 Z',
  ME: 'M 870 150 L 900 140 L 905 170 L 875 180 Z',
  NH: 'M 855 210 L 875 205 L 880 225 L 860 230 Z',
  NJ: 'M 790 320 L 810 315 L 815 340 L 795 345 Z',
  NY: 'M 750 220 L 850 200 L 860 280 L 780 300 L 740 260 Z',
  PA: 'M 720 300 L 790 290 L 800 340 L 730 350 Z',
  RI: 'M 870 270 L 880 265 L 885 280 L 875 285 Z',
  VT: 'M 830 200 L 855 195 L 860 220 L 835 225 Z',
};

export default function NortheastMap() {
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="680 120 250 280" className="w-full h-auto">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {NORTHEAST_STATES.map(state => {
          const isHovered = hoveredState === state.code;
          return (
            <motion.path
              key={state.code}
              d={STATE_PATHS[state.code]}
              fill={isHovered ? 'rgba(0, 255, 135, 0.4)' : 'rgba(255, 255, 255, 0.08)'}
              stroke={isHovered ? '#00FF87' : 'rgba(255, 255, 255, 0.2)'}
              strokeWidth={isHovered ? 2 : 1}
              filter={isHovered ? 'url(#glow)' : undefined}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredState(state.code)}
              onMouseLeave={() => setHoveredState(null)}
              whileHover={{ scale: 1.02 }}
              style={{ transformOrigin: 'center' }}
            />
          );
        })}

        {NORTHEAST_STATES.map(state => {
          const labels = {
            CT: [832, 292], DE: [790, 348], MA: [870, 248], MD: [778, 370],
            ME: [888, 162], NH: [868, 218], NJ: [802, 332], NY: [800, 250],
            PA: [760, 322], RI: [877, 276], VT: [845, 212],
          };
          const [x, y] = labels[state.code];
          return (
            <text
              key={`label-${state.code}`}
              x={x}
              y={y}
              textAnchor="middle"
              className={`text-[8px] font-bold pointer-events-none ${
                hoveredState === state.code ? 'fill-accent' : 'fill-white/40'
              }`}
            >
              {state.code}
            </text>
          );
        })}
      </svg>

      {hoveredState && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-sm"
        >
          <span className="text-accent font-semibold">{hoveredState}</span>
          <span className="text-white/60 ml-2">
            {NORTHEAST_STATES.find(s => s.code === hoveredState)?.name}
          </span>
        </motion.div>
      )}
    </div>
  );
}
