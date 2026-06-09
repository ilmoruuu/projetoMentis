import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Stethoscope,
  Heart,
  Lock,
  CheckCircle2,
} from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F4C75] via-[#1B82BF] to-[#2A9D8F] flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-[#1B82BF]" fill="#1B82BF" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              CAPS AD Connect
            </h1>
            <p className="text-blue-200 text-xs">Sistema Integrado SUS</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <ShieldCheck className="w-4 h-4 text-green-300" />
          <span className="text-white text-sm">Dados Seguros</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-300" />
            <span className="text-white text-sm">
              Integrado ao Ministério da Saúde
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            Cuidado Psicossocial
            <br />
            <span className="text-[#A8EDEA]">Inteligente e Humanizado</span>
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Plataforma integrada para profissionais de saúde e pacientes em
            recuperação nos CAPS AD.
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Professional Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login?role=profissional")}
            className="group bg-white rounded-2xl p-8 shadow-2xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F4F8] rounded-full -translate-y-16 translate-x-16" />
            <div className="relative">
              <div className="w-14 h-14 bg-[#E8F4F8] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#1B82BF] transition-colors duration-300">
                <Stethoscope className="w-7 h-7 text-[#1B82BF] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[#0F4C75] text-xl font-bold mb-2">
                Área do Profissional
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Acesse o formulário RAAS digital, monitore pacientes em tempo
                real e gerencie prontuários.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "Formulário RAAS Inteligente",
                  "Dashboard de Monitoramento",
                  "Tabela de Códigos SIGTAP",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                    <span className="text-gray-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-[#1B82BF] font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                <span>Entrar como Profissional</span>
                <span>→</span>
              </div>
            </div>
          </motion.button>

          {/* Patient Card */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login?role=paciente")}
            className="group bg-white rounded-2xl p-8 shadow-2xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF8F0] rounded-full -translate-y-16 translate-x-16" />
            <div className="relative">
              <div className="w-14 h-14 bg-[#FFF0E5] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#F4A261] transition-colors duration-300">
                <Heart className="w-7 h-7 text-[#F4A261] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[#7C3826] text-xl font-bold mb-2">
                Área do Paciente
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Registre seu humor diário, acompanhe sua recuperação e celebre
                cada conquista.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "Diário de Humor Diário",
                  "Contador de Sobriedade",
                  "Marcos de Conquistas",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
                    <span className="text-gray-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-[#F4A261] font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                <span>Entrar como Paciente</span>
                <span>→</span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {[
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              text: "LGPD Conformidade",
            },
            { icon: <Lock className="w-4 h-4" />, text: "Criptografia SSL" },
            {
              icon: <CheckCircle2 className="w-4 h-4" />,
              text: "RNDS Integrado",
            },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <span className="text-green-300">{badge.icon}</span>
              <span className="text-white text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="text-center pb-6 text-blue-200 text-xs">
        © 2026 CAPS AD Connect — Sistema Único de Saúde (SUS) · Ministério da
        Saúde
      </footer>
    </div>
  );
}
