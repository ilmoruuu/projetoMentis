import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  Activity,
  ChevronRight,
  Smile,
  Frown,
  Meh,
  Laugh,
} from "lucide-react";
import { patients, Patient } from "../../../shared/data/mockData";

const moodLabels = ["", "Muito Ruim", "Ruim", "Neutro", "Bom", "Ótimo"];
const moodColors = ["", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#10B981"];

function MoodSparkline({ data }: { data: { date: string; mood: number }[] }) {
  const chartData = data.map((d) => ({ mood: d.mood }));
  const latest = data[data.length - 1]?.mood ?? 3;
  const prev = data[data.length - 2]?.mood ?? 3;
  const trend = latest - prev;
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="mood"
              stroke={moodColors[latest]}
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              content={({ payload }) =>
                payload?.[0] ? (
                  <div className="bg-white shadow text-xs px-2 py-1 rounded border border-gray-100">
                    {moodLabels[payload[0].value as number]}
                  </div>
                ) : null
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <span
        className="text-xs font-semibold"
        style={{ color: moodColors[latest] }}
      >
        {moodLabels[latest]}
      </span>
      <span className="text-xs text-gray-400">
        {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: Patient["status"] }) {
  const config = {
    active: { label: "Estável", color: "bg-green-100 text-green-700" },
    monitoring: { label: "Atenção", color: "bg-yellow-100 text-yellow-700" },
    critical: { label: "Crítico", color: "bg-red-100 text-red-700" },
  };
  const c = config[status];
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function SobrietyBadge({ days, type }: { days: number; type: string }) {
  const color =
    days >= 90
      ? "#10B981"
      : days >= 30
        ? "#3B82F6"
        : days >= 7
          ? "#F59E0B"
          : "#EF4444";
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-700 font-medium">{days}d</span>
      <span className="text-xs text-gray-400 capitalize">{type}</span>
    </div>
  );
}

function MoodIcon({ mood }: { mood: number }) {
  if (mood >= 5) return <Laugh className="w-5 h-5 text-green-500" />;
  if (mood >= 4) return <Smile className="w-5 h-5 text-emerald-400" />;
  if (mood >= 3) return <Meh className="w-5 h-5 text-yellow-400" />;
  return <Frown className="w-5 h-5 text-red-400" />;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "monitoring" | "critical"
  >("all");

  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.status === "active").length,
    monitoring: patients.filter((p) => p.status === "monitoring").length,
    critical: patients.filter((p) => p.status === "critical").length,
  };

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cns.includes(search);
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const today = new Date().toISOString().split("T")[0];
  const checkedInToday = patients.filter((p) => p.lastCheckIn === today).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0F4C75] text-2xl font-bold">
            Dashboard de Monitoramento
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Acompanhamento em tempo real dos pacientes ativos
          </p>
        </div>
        <button
          onClick={() => navigate("/professional/raas")}
          className="flex items-center gap-2 bg-[#1B82BF] hover:bg-[#1670A8] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-md shadow-blue-200"
        >
          <FileText className="w-4 h-4" />
          Novo RAAS
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total de Pacientes",
            value: stats.total,
            icon: <Users className="w-5 h-5" />,
            color: "from-[#1B82BF] to-[#0F4C75]",
            light: "bg-blue-50 text-[#1B82BF]",
          },
          {
            label: "Check-ins Hoje",
            value: checkedInToday,
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "from-[#2A9D8F] to-[#1B82BF]",
            light: "bg-teal-50 text-[#2A9D8F]",
          },
          {
            label: "Em Monitoramento",
            value: stats.monitoring,
            icon: <Activity className="w-5 h-5" />,
            color: "from-[#F59E0B] to-[#F97316]",
            light: "bg-yellow-50 text-yellow-600",
          },
          {
            label: "Situação Crítica",
            value: stats.critical,
            icon: <AlertTriangle className="w-5 h-5" />,
            color: "from-[#EF4444] to-[#DC2626]",
            light: "bg-red-50 text-red-500",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.light} mb-3`}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-[#0F4C75]">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <h2 className="text-[#0F4C75] font-semibold text-lg">
            Pacientes Ativos
          </h2>
          <div className="flex items-center gap-3 ml-auto">
            <input
              type="text"
              placeholder="Buscar por nome ou CNS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF] bg-[#F9FBFF]"
            />
            <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm">
              {(["all", "active", "monitoring", "critical"] as const).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-2 transition-colors ${
                      filter === f
                        ? "bg-[#1B82BF] text-white"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {f === "all"
                      ? "Todos"
                      : f === "active"
                        ? "Estável"
                        : f === "monitoring"
                          ? "Atenção"
                          : "Crítico"}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FBFF] border-b border-gray-100">
                {[
                  "Paciente",
                  "Status",
                  "Humor (7 dias)",
                  "Sobriedade",
                  "Último Check-in",
                  "Hoje",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((patient, i) => {
                const latestMood =
                  patient.moodHistory[patient.moodHistory.length - 1];
                const checkedToday = patient.lastCheckIn === today;
                return (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-[#F9FBFF] transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(`/professional/raas?patient=${patient.id}`)
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B82BF] to-[#2A9D8F] flex items-center justify-center text-white text-xs font-bold">
                          {patient.name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium text-sm">
                            {patient.name}
                          </p>
                          <p className="text-gray-400 text-xs">
                            CNS: {patient.cns}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={patient.status} />
                    </td>
                    <td className="px-6 py-4">
                      <MoodSparkline data={patient.moodHistory} />
                    </td>
                    <td className="px-6 py-4">
                      <SobrietyBadge
                        days={patient.sobrietyDays}
                        type={patient.sobrietyType}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(
                          patient.lastCheckIn + "T12:00:00",
                        ).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {checkedToday ? (
                        <div className="flex items-center gap-1.5">
                          <MoodIcon mood={latestMood?.mood ?? 3} />
                          {latestMood?.reflection && (
                            <span className="text-xs text-gray-500 max-w-32 truncate">
                              "{latestMood.reflection}"
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Sem check-in
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#1B82BF] transition-colors" />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>Nenhum paciente encontrado</p>
          </div>
        )}
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-[#2A9D8F]" />
            <h3 className="text-sm font-semibold text-gray-700">
              Média de Humor Hoje
            </h3>
          </div>
          {(() => {
            const todayMoods = patients.flatMap((p) =>
              p.moodHistory.filter((m) => m.date === today).map((m) => m.mood),
            );
            const avg = todayMoods.length
              ? (
                  todayMoods.reduce((a, b) => a + b, 0) / todayMoods.length
                ).toFixed(1)
              : "–";
            return (
              <p className="text-4xl font-bold text-[#0F4C75]">
                {avg}{" "}
                <span className="text-base font-normal text-gray-400">/ 5</span>
              </p>
            );
          })()}
          <p className="text-xs text-gray-400 mt-1">
            {patients.filter((p) => p.lastCheckIn === today).length} de{" "}
            {patients.length} pacientes
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-[#1B82BF]" />
            <h3 className="text-sm font-semibold text-gray-700">
              Sobriedade Média
            </h3>
          </div>
          <p className="text-4xl font-bold text-[#0F4C75]">
            {Math.round(
              patients.reduce((acc, p) => acc + p.sobrietyDays, 0) /
                patients.length,
            )}{" "}
            <span className="text-base font-normal text-gray-400">dias</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Entre todos os pacientes ativos
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-700">
              Taxa de Check-in
            </h3>
          </div>
          <p className="text-4xl font-bold text-[#0F4C75]">
            {Math.round((checkedInToday / patients.length) * 100)}
            <span className="text-base font-normal text-gray-400">%</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Engajamento de hoje</p>
        </div>
      </div>
    </div>
  );
}
