import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Smile,
  Trophy,
  Calendar,
  TrendingUp,
  ChevronRight,
  Heart,
  Star,
} from "lucide-react";
import { currentPatient, milestones } from "../../data/mockData";

const moodEmojis = ["", "😔", "😟", "😐", "🙂", "😊"];
const moodLabels = ["", "Muito Ruim", "Ruim", "Neutro", "Bom", "Ótimo"];
const moodColors = ["", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#10B981"];

function CircularProgress({
  days,
  maxDays = 30,
  color,
}: {
  days: number;
  maxDays?: number;
  color: string;
}) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(days / maxDays, 1);
  const dash = circ * pct;

  return (
    <div className="relative w-36 h-36">
      <svg width="144" height="144" className="-rotate-90">
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="10"
        />
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[#7C3826]">{days}</span>
        <span className="text-xs text-gray-500">dias</span>
      </div>
    </div>
  );
}

export function PatientHome() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const todayMood = currentPatient.moodHistory.find((m) => m.date === today);
  const lastMood =
    currentPatient.moodHistory[currentPatient.moodHistory.length - 1];

  const earnedMilestones = milestones.filter(
    (m) => m.days <= currentPatient.sobrietyDays,
  );
  const nextMilestone = milestones.find(
    (m) => m.days > currentPatient.sobrietyDays,
  );

  const streak = currentPatient.moodHistory.filter((m) => m.mood >= 3).length;

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Today's Mood Summary or Prompt */}
      {todayMood ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Seu humor de hoje
          </p>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{moodEmojis[todayMood.mood]}</span>
            <div>
              <p
                className="font-bold text-lg"
                style={{ color: moodColors[todayMood.mood] }}
              >
                {moodLabels[todayMood.mood]}
              </p>
              {todayMood.reflection && (
                <p className="text-gray-500 text-sm mt-1 italic">
                  "{todayMood.reflection}"
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/patient/checkin")}
          className="w-full bg-gradient-to-r from-[#F4A261] to-[#E9C46A] rounded-2xl p-5 text-left shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-base mb-1">
                Como você está hoje? 💭
              </p>
              <p className="text-white/80 text-sm">Registre seu humor diário</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Smile className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.button>
      )}

      {/* Sobriety Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Sobriedade de {currentPatient.sobrietyType}
          </p>
          <button
            onClick={() => navigate("/patient/sobriety")}
            className="text-xs text-[#F4A261] font-medium flex items-center gap-1"
          >
            Ver detalhes <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <CircularProgress
            days={currentPatient.sobrietyDays}
            maxDays={30}
            color="#F4A261"
          />
          <div className="flex-1 pl-5 space-y-3">
            <div>
              <p className="text-2xl font-bold text-[#7C3826]">
                {currentPatient.sobrietyDays} Dias
              </p>
              <p className="text-gray-500 text-sm capitalize">
                Sem {currentPatient.sobrietyType}!
              </p>
            </div>
            {nextMilestone && (
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-600 font-semibold">
                  Próxima conquista
                </p>
                <p className="text-sm text-[#7C3826]">
                  {nextMilestone.icon} {nextMilestone.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Faltam {nextMilestone.days - currentPatient.sobrietyDays} dias
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Earned badges preview */}
        {earnedMilestones.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Conquistados:</p>
            <div className="flex gap-1">
              {earnedMilestones.slice(-4).map((m) => (
                <span key={m.days} className="text-lg" title={m.label}>
                  {m.icon}
                </span>
              ))}
              {earnedMilestones.length > 4 && (
                <span className="text-xs text-gray-400 self-center">
                  +{earnedMilestones.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Mood History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Histórico de Humor
          </p>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Últimos 7 dias</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-1">
          {currentPatient.moodHistory.slice(-7).map((entry, i) => {
            const d = new Date(entry.date + "T12:00:00");
            const dayName = d
              .toLocaleDateString("pt-BR", { weekday: "short" })
              .replace(".", "");
            return (
              <div
                key={entry.date}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <span className="text-base">{moodEmojis[entry.mood]}</span>
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${(entry.mood / 5) * 40 + 8}px`,
                    backgroundColor: moodColors[entry.mood] + "40",
                    borderBottom: `3px solid ${moodColors[entry.mood]}`,
                  }}
                />
                <p className="text-xs text-gray-400 capitalize">{dayName}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#1B82BF]" />
            <p className="text-xs text-gray-400">Em tratamento</p>
          </div>
          <p className="text-xl font-bold text-[#0F4C75]">
            {Math.floor(
              (new Date().getTime() -
                new Date(currentPatient.startDate).getTime()) /
                (1000 * 60 * 60 * 24),
            )}
            <span className="text-sm font-normal text-gray-400"> dias</span>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#E9C46A]" />
            <p className="text-xs text-gray-400">Dias positivos</p>
          </div>
          <p className="text-xl font-bold text-[#7C3826]">
            {streak}
            <span className="text-sm font-normal text-gray-400">
              {" "}
              / {currentPatient.moodHistory.length}
            </span>
          </p>
        </motion.div>
      </div>

      {/* Navigate to check-in */}
      {!todayMood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#2A9D8F] to-[#1B82BF] rounded-2xl p-4 flex items-center gap-4"
        >
          <Heart className="w-8 h-8 text-white flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              Registre seu dia!
            </p>
            <p className="text-white/80 text-xs">
              Seu terapeuta aguarda seu check-in de hoje.
            </p>
          </div>
          <button
            onClick={() => navigate("/patient/checkin")}
            className="bg-white text-[#2A9D8F] px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors"
          >
            Ir
          </button>
        </motion.div>
      )}
    </div>
  );
}
