import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Trophy, Zap, Star, X } from "lucide-react";
import { currentPatient, milestones } from "../../../shared/data/mockData";
import {
  getCurrentPatientId,
  getHumorHistory,
  type MoodEntry,
} from "../../../app/services/HumorHistoryService";

const moodEmojis = ["", "😔", "😟", "😐", "🙂", "😊"];
const moodLabels = ["", "Muito Ruim", "Ruim", "Neutro", "Bom", "Ótimo"];
const moodColors = ["", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#10B981"];

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekdayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

const motivationalQuotes = [
  "Cada dia sóbrio é uma vitória que ninguém pode tirar de você.",
  "Você já provou que é mais forte do que qualquer vício.",
  "O caminho da recuperação é feito de um passo de cada vez.",
  "Sua coragem de pedir ajuda é o maior ato de força.",
  "Você merece uma vida plena e feliz. Continue assim!",
];

function MilestoneBadge({
  milestone,
  earned,
  current,
  daysLeft,
}: {
  milestone: (typeof milestones)[0];
  earned: boolean;
  current: boolean;
  daysLeft?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={earned ? { scale: 1.05 } : undefined}
      className={`rounded-2xl p-4 border-2 flex flex-col items-center gap-2 transition-all ${
        current
          ? "border-[#F4A261] bg-orange-50 shadow-lg shadow-orange-100"
          : earned
            ? "border-green-200 bg-green-50"
            : "border-gray-100 bg-gray-50 opacity-60"
      }`}
    >
      <div className="relative">
        <span className={`text-3xl ${earned ? "" : "grayscale opacity-50"}`}>
          {milestone.icon}
        </span>
        {earned && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )}
      </div>
      <div className="text-center">
        <p
          className={`text-xs font-bold ${
            earned ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {milestone.label}
        </p>
        <p
          className={`text-xs mt-0.5 ${earned ? "text-green-500" : "text-gray-400"}`}
        >
          {milestone.days} dias
        </p>
        {current && daysLeft !== undefined && (
          <p className="text-xs text-[#F4A261] font-semibold mt-1">
            Faltam {daysLeft}d
          </p>
        )}
        {earned && !current && (
          <p className="text-xs text-green-500 font-semibold">
            Conquistado! 🎉
          </p>
        )}
      </div>
    </motion.div>
  );
}

function MonthCalendar({
  year,
  month,
  markedDates,
  selectedDate,
  onPrev,
  onNext,
  onSelectDay,
}: {
  year: number;
  month: number;
  markedDates: Set<string>;
  selectedDate: string | null;
  onPrev: () => void;
  onNext: () => void;
  onSelectDay: (date: string) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayKey =
    today.getFullYear() === year && today.getMonth() === month
      ? today.getDate()
      : -1;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const dateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrev}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-[#7C3826] text-lg">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={onNext}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {weekdayLabels.map((w, i) => (
          <div
            key={i}
            className="text-center text-xs font-semibold text-[#F4A261] py-1"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="aspect-square" />;
          }
          const key = dateKey(day);
          const isMarked = markedDates.has(key);
          const isToday = day === todayKey;
          const isSelected = selectedDate === key;
          return (
            <motion.button
              key={i}
              type="button"
              disabled={!isMarked}
              onClick={() => isMarked && onSelectDay(key)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              whileTap={isMarked ? { scale: 0.9 } : undefined}
              className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${
                isMarked
                  ? "bg-[#F4A261] text-white font-bold shadow-sm cursor-pointer hover:bg-[#E76F51]"
                  : "bg-white text-gray-600 border border-gray-100 cursor-default"
              } ${isToday ? "ring-2 ring-[#F4A261] ring-offset-1" : ""} ${
                isSelected ? "ring-2 ring-[#7C3826] ring-offset-1" : ""
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F4A261]" />
          <span className="text-xs text-gray-500">Dia marcado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-white border border-gray-200" />
          <span className="text-xs text-gray-500">Sem registro</span>
        </div>
      </div>
    </div>
  );
}

export function SobrietyTracker() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const patientId = await getCurrentPatientId();
        const history = await getHumorHistory(patientId);
        if (active) setMoodHistory(history);
      } catch {
        if (active) setMoodHistory([]);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const markedDates = new Set(moodHistory.map((m) => m.date));

  const [view, setView] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedEntry = selectedDate
    ? moodHistory.find((m) => m.date === selectedDate) ?? null
    : null;

  const goPrev = () =>
    setView((v) => {
      const m = v.month - 1;
      return m < 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: m };
    });
  const goNext = () =>
    setView((v) => {
      const m = v.month + 1;
      return m > 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: m };
    });

  const days = currentPatient.sobrietyDays;
  const earnedMilestones = milestones.filter((m) => m.days <= days);
  const nextMilestone = milestones.find((m) => m.days > days);

  const monthMarkedCount = moodHistory.filter((m) => {
    const d = new Date(m.date + "T12:00:00");
    return d.getFullYear() === view.year && d.getMonth() === view.month;
  }).length;

  const quoteIdx =
    Math.floor(Date.now() / 86400000) % motivationalQuotes.length;

  return (
    <div className="px-4 md:px-6 py-5 space-y-5">
      <MonthCalendar
        year={view.year}
        month={view.month}
        markedDates={markedDates}
        selectedDate={selectedDate}
        onPrev={() => {
          setSelectedDate(null);
          goPrev();
        }}
        onNext={() => {
          setSelectedDate(null);
          goNext();
        }}
        onSelectDay={(d) => setSelectedDate((curr) => (curr === d ? null : d))}
      />

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            key={selectedEntry.date}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Registro do dia
                </p>
                <p className="text-sm text-[#7C3826] font-bold capitalize">
                  {new Date(selectedEntry.date + "T12:00:00").toLocaleDateString(
                    "pt-BR",
                    { weekday: "long", day: "2-digit", month: "long" },
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedDate(null)}
                aria-label="Fechar"
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{moodEmojis[selectedEntry.mood]}</span>
              <div>
                <p
                  className="font-bold text-lg"
                  style={{ color: moodColors[selectedEntry.mood] }}
                >
                  {moodLabels[selectedEntry.mood]}
                </p>
                <p className="text-gray-400 text-xs">Humor registrado</p>
              </div>
            </div>

            {selectedEntry.reflection ? (
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-orange-600 mb-1">
                  Sua reflexão
                </p>
                <p className="text-sm text-[#7C3826] italic">
                  "{selectedEntry.reflection}"
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                Nenhuma reflexão registrada neste dia.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-[#2A9D8F] to-[#1B82BF] rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
          <p className="text-white text-sm leading-relaxed italic">
            {motivationalQuotes[quoteIdx]}
          </p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: <Star className="w-5 h-5" />,
            label: `Em ${monthNames[view.month]}`,
            value: monthMarkedCount,
            color: "#F4A261",
          },
          {
            icon: <Zap className="w-5 h-5" />,
            label: "Conquistas",
            value: earnedMilestones.length,
            color: "#E9C46A",
          },
          {
            icon: <Trophy className="w-5 h-5" />,
            label: "Próxima em",
            value: nextMilestone ? `${nextMilestone.days - days}d` : "✓",
            color: "#2A9D8F",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: stat.color + "20", color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="font-bold text-[#0F4C75] text-lg">{stat.value}</p>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Milestones Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#7C3826] text-base">
            Marcos de Conquista
          </h3>
          <span className="text-xs text-gray-400">
            {earnedMilestones.length}/{milestones.length} desbloqueados
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {milestones.map((m) => {
            const earned = m.days <= days;
            const isCurrent = nextMilestone?.days === m.days;
            const daysLeft = isCurrent ? m.days - days : undefined;
            return (
              <MilestoneBadge
                key={m.days}
                milestone={m}
                earned={earned}
                current={isCurrent}
                daysLeft={daysLeft}
              />
            );
          })}
        </div>
      </div>

      {/* Encouragement card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3 mb-4"
      >
        <span className="text-2xl">💙</span>
        <div>
          <p className="text-[#7C3826] font-semibold text-sm">
            Sua equipe está com você
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Seu progresso é acompanhado de perto pela{" "}
            <span className="font-medium">{currentPatient.psychologist}</span>{" "}
            no CAPS AD. Você não está sozinho nessa jornada.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
