import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

export default function DeadlineCalendar({ programs }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Assign simulated deadlines to programs for demonstration
  const programsWithDeadlines = useMemo(() => {
    const today = new Date();
    return programs.map((program, index) => {
      // Stagger deadlines over the next 60 days
      const deadlineDate = new Date(today);
      deadlineDate.setDate(today.getDate() + (index * 5) % 60 + 7);
      return {
        ...program,
        deadline: deadlineDate,
      };
    });
  }, [programs]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getProgramsForDate = (date) => {
    if (!date) return [];
    return programsWithDeadlines.filter(program => {
      const progDate = new Date(program.deadline);
      return progDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    const programsOnDate = getProgramsForDate(date);
    if (programsOnDate.length > 0) {
      setSelectedDate(date);
      setSelectedProgram(programsOnDate[0]);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="glass-card p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-display text-xl font-bold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-white/50 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const programsOnDate = getProgramsForDate(date);
          const hasDeadline = programsOnDate.length > 0;
          const isToday = date && date.toDateString() === new Date().toDateString();

          return (
            <button
              key={index}
              onClick={() => date && handleDateClick(date)}
              disabled={!date}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                !date
                  ? 'bg-transparent'
                  : hasDeadline
                  ? 'bg-accent/20 text-accent hover:bg-accent/30 cursor-pointer'
                  : isToday
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 cursor-pointer'
              }`}
            >
              {date && (
                <>
                  <span>{date.getDate()}</span>
                  {hasDeadline && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {programsOnDate.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-accent"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Program Popup */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setSelectedDate(null);
              setSelectedProgram(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card p-6 max-w-md w-full bg-charcoal border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-display font-semibold text-lg text-white mb-1">
                    {selectedProgram.program_name}
                  </h4>
                  <p className="text-accent text-sm font-medium">
                    Deadline: {selectedDate?.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedProgram(null);
                  }}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {selectedProgram.description}
              </p>

              <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wide">
                  Eligibility
                </p>
                <p className="text-white/70 text-sm">{selectedProgram.eligibility_reason}</p>
              </div>

              <a
                href={selectedProgram.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow w-full text-sm py-2.5 flex items-center justify-center gap-2"
              >
                Apply Now
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent/20" />
          <span>Has deadline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
