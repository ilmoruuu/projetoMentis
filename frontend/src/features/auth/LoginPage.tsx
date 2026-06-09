import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import logoPaciente from "../../assets/logo-paciente.png";
import logoProfissional from "../../assets/logo-profissional.png";

type Role = "paciente" | "profissional";

/**
 * Paletas por perfil:
 *  - profissional → azul (#1B82BF / #0F4C75) + logo com wordmark azul
 *  - paciente     → laranja (#F4A261) com apoio em verde-água (#279A96) + logo laranja
 * As classes de gradiente são strings literais completas para que o
 * Tailwind consiga detectá-las no build (interpolação dinâmica não funciona).
 */
const palettes: Record<
  Role,
  {
    label: string;
    icon: typeof Stethoscope;
    logo: string;
    panel: string;
    focusBorder: string;
    accent: string;
    accentDark: string;
  }
> = {
  profissional: {
    label: "Profissional",
    icon: Stethoscope,
    logo: logoProfissional,
    panel: "bg-gradient-to-br from-[#0F4C75] via-[#13609B] to-[#1B82BF]",
    focusBorder: "focus-within:border-[#1B82BF]",
    accent: "#1B82BF",
    accentDark: "#0F4C75",
  },
  paciente: {
    label: "Paciente",
    icon: HeartPulse,
    logo: logoPaciente,
    panel: "bg-gradient-to-br from-[#F4A261] via-[#EE8E5E] to-[#279A96]",
    focusBorder: "focus-within:border-[#F4A261]",
    accent: "#F4A261",
    accentDark: "#279A96",
  },
};

const roles: Role[] = ["paciente", "profissional"];

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<Role>(
    searchParams.get("role") === "profissional" ? "profissional" : "paciente",
  );
  const [showPassword, setShowPassword] = useState(false);

  const p = palettes[role];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Protótipo: encaminha para a área correspondente ao perfil escolhido.
    navigate(role === "profissional" ? "/professional" : "/patient");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Painel colorido com o seletor de perfil */}
      <div
        className={`relative ${p.panel} p-8 md:p-12 flex flex-col justify-center overflow-hidden transition-colors duration-500`}
      >
        {/* Formas decorativas */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rotate-45 bg-white/10 rounded-[3rem]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rotate-12 bg-black/5 rounded-[4rem]" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rotate-12 bg-white/5 rounded-[2.5rem]" />

        <div className="relative z-10 w-full max-w-md mx-auto">
          <h2 className="text-white text-3xl font-bold mb-2">Bem-vindo(a)</h2>
          <p className="text-white/80 text-sm mb-10">
            Escolha o seu tipo de acesso para continuar.
          </p>

          {/* Toggle Paciente / Profissional */}
          <div className="space-y-3">
            {roles.map((r) => {
              const item = palettes[r];
              const Icon = item.icon;
              const active = r === role;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={active}
                  className="relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="role-pill"
                      className="absolute inset-0 bg-white rounded-2xl shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: active
                        ? item.accent
                        : "rgba(255,255,255,0.18)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <span
                    className="relative z-10 text-base font-bold transition-colors"
                    style={{ color: active ? item.accentDark : "#fff" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel do formulário */}
      <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="flex justify-center mb-6">
            <img
              key={role}
              src={p.logo}
              alt="Projeto Mentis"
              className="h-12 w-auto object-contain"
            />
          </div>

          <h1 className="text-center text-xl font-bold text-gray-800 mb-1">
            Entrar como {p.label}
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            Informe suas credenciais de acesso
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* E-mail */}
            <div
              className={`flex items-center gap-3 border-b-2 border-gray-200 pb-2 transition-colors ${p.focusBorder}`}
            >
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="E-mail"
                autoComplete="email"
                className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Senha */}
            <div
              className={`flex items-center gap-3 border-b-2 border-gray-200 pb-2 transition-colors ${p.focusBorder}`}
            >
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Senha"
                autoComplete="current-password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: p.accent }}
              >
                Esqueceu a senha?
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-full shadow-lg transition-colors"
              style={{ backgroundColor: p.accent }}
            >
              Entrar
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
