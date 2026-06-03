import { useState } from "react";
import { motion } from "motion/react";
import { currentPatient, milestones } from "../../data/mockData";
import { Trophy, Plus, RotateCcw, Calendar, Zap, Star } from "lucide-react";

function CircularRing({
  days,
  maxDays,
  color,
  size = 180,
}: {
  days: number;
  maxDays: number;
  color: string;
  size?: number;
}) {
  const strokeWidth = 14;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(days / maxDays, 1);
  const dash = circ * pct;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl font-bold"
          style={{ color }}
        >
          {days}
        </motion.span>
        <span className="text-gray-400 text-sm mt-1">dias</span>
      </div>
    </div>
  );
}

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

const motivationalQuotes = [
  "Cada dia sóbrio é uma vitória que ninguém pode tirar de você. 💪",
  "Você já provou que é mais forte do que qualquer vício. 🌟",
  "O caminho da recuperação é feito de um passo de cada vez. 👣",
  "Sua coragem de pedir ajuda é o maior ato de força. ❤️",
  "Você merece uma vida plena e feliz. Continue assim! 🌈",
];

export function SobrietyTracker() {
  const [days, setDays] = useState(currentPatient.sobrietyDays);
  const [showReset, setShowReset] = useState(false);
  const quoteIdx =
    Math.floor(Date.now() / 86400000) % motivationalQuotes.length;

  const earnedMilestones = milestones.filter((m) => m.days <= days);
  const nextMilestone = milestones.find((m) => m.days > days);
  const prevMilestone = earnedMilestones[earnedMilestones.length - 1];

  // Color based on streak
  const ringColor =
    days >= 180
      ? "#7C3AED"
      : days >= 90
        ? "#059669"
        : days >= 30
          ? "#F4A261"
          : days >= 7
            ? "#3B82F6"
            : "#EF4444";

  const pct = nextMilestone
    ? ((days - (prevMilestone?.days ?? 0)) /
        (nextMilestone.days - (prevMilestone?.days ?? 0))) *
      100
    : 100;

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Main Counter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center"
      >
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Contador de Sobriedade
        </p>
        <p className="text-gray-600 text-sm mb-5 capitalize">
          Livre de{" "}
          <span className="font-bold text-[#7C3826]">
            {currentPatient.sobrietyType}
          </span>
        </p>

        <div className="flex justify-center mb-4">
          <CircularRing
            days={days}
            maxDays={nextMilestone?.days ?? 365}
            color={ringColor}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl font-bold mb-1"
          style={{ color: ringColor }}
        >
          {days === 1 ? "1 Dia" : `${days} Dias`} Sem{" "}
          {currentPatient.sobrietyType}!
        </motion.p>

        {nextMilestone ? (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>{prevMilestone ? prevMilestone.label : "Início"}</span>
              <span>
                {nextMilestone.icon} {nextMilestone.label} ({nextMilestone.days}{" "}
                dias)
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: ringColor }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Faltam{" "}
              <span className="font-bold" style={{ color: ringColor }}>
                {nextMilestone.days - days} dias
              </span>{" "}
              para {nextMilestone.icon} {nextMilestone.label}
            </p>
          </div>
        ) : (
          <div className="mt-4 bg-purple-50 rounded-2xl p-3">
            <p className="text-purple-600 font-bold text-sm">
              🎊 Você alcançou todos os marcos!
            </p>
            <p className="text-purple-400 text-xs mt-1">
              Você é uma inspiração para todos. ❤️
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setDays((d) => d + 1)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, ${ringColor}, ${ringColor}CC)`,
            }}
          >
            <Plus className="w-4 h-4" />
            +1 Dia
          </button>
          <button
            onClick={() => setShowReset(true)}
            className="px-4 py-3 rounded-2xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {showReset && (
          <div className="mt-3 bg-red-50 border border-red-100 rounded-2xl p-4 text-left">
            <p className="text-red-600 text-sm font-semibold mb-1">
              Reiniciar contador?
            </p>
            <p className="text-red-400 text-xs mb-3">
              Não há vergonha em recomeçar. A jornada de recuperação tem altos e
              baixos, e o que importa é continuar tentando. 💙
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDays(0);
                  setShowReset(false);
                }}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl text-xs font-bold"
              >
                Reiniciar
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl text-xs font-bold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </motion.div>

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
            icon: <Calendar className="w-5 h-5" />,
            label: "Dias Totais",
            value: days,
            color: ringColor,
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
        <div className="grid grid-cols-3 gap-3">
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
