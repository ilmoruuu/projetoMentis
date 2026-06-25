import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Heart, Send } from "lucide-react";
import { createHumorHistory, getCurrentPatientId } from "../../../app/services/HumorHistoryService";

const moods = [
  {
    emoji: "😔",
    label: "Muito Ruim",
    description: "Estou me sentindo mal, ansioso ou triste",
    color: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
  },
  {
    emoji: "😟",
    label: "Ruim",
    description: "Não estou tão bem, mas consigo continuar",
    color: "#F97316",
    bg: "#FFF7ED",
    border: "#FED7AA",
  },
  {
    emoji: "😐",
    label: "Neutro",
    description: "Estou ok, nem bem nem mal",
    color: "#EAB308",
    bg: "#FEFCE8",
    border: "#FEF08A",
  },
  {
    emoji: "🙂",
    label: "Bom",
    description: "Me sinto bem e tranquilo hoje",
    color: "#22C55E",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  {
    emoji: "😊",
    label: "Ótimo",
    description: "Estou me sentindo muito bem e motivado!",
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
];

export function CheckIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"mood" | "reflection" | "done">("mood");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleMoodSelect = (idx: number) => {
    setSelectedMood(idx);
  };

  const handleNext = () => {
    if (selectedMood !== null) {
      setStep("reflection");
    }
  };

  const handleSubmit = async () => {
    if (selectedMood === null) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const patientId = await getCurrentPatientId();
      await createHumorHistory(patientId, selectedMood, reflection);

      setStep("done");
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(String(e));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selected = selectedMood !== null ? moods[selectedMood] : null;

  if (step === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <div className="text-8xl mb-6">{selected?.emoji}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-[#7C3826] text-2xl font-bold mb-2">
            Check-in Enviado!
          </h2>
          <p className="text-gray-500 text-sm mb-1">
            Seu registro de hoje foi compartilhado
          </p>
          <p className="text-gray-400 text-xs mb-8">
            com sua equipe de cuidado.
          </p>

          {reflection && (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs text-orange-400 font-semibold mb-1">
                Sua reflexão:
              </p>
              <p className="text-gray-700 text-sm italic">"{reflection}"</p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => navigate("/patient/sobriety")}
              className="w-full bg-gradient-to-r from-[#F4A261] to-[#E9C46A] text-white py-4 rounded-2xl font-bold text-base"
            >
              Ver Minhas Conquistas
            </button>
            <button
              onClick={() => navigate("/patient")}
              className="w-full bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-medium text-sm"
            >
              Voltar ao Início
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`h-1.5 flex-1 rounded-full ${step === "mood" || step === "reflection" ? "bg-[#F4A261]" : "bg-gray-200"}`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full ${step === "reflection" ? "bg-[#F4A261]" : "bg-gray-200"}`}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === "mood" && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">💭</div>
              <h1 className="text-[#7C3826] text-2xl font-bold mb-2">
                Como você está hoje?
              </h1>
              <p className="text-gray-500 text-sm">
                Selecione o emoji que melhor descreve seu humor agora
              </p>
            </div>

            <div className="space-y-3">
              {moods.map((mood, idx) => (
                <motion.button
                  key={mood.label}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleMoodSelect(idx)}
                  className="w-full rounded-2xl border-2 p-4 flex items-center gap-4 transition-all duration-200"
                  style={{
                    backgroundColor: selectedMood === idx ? mood.bg : "white",
                    borderColor: selectedMood === idx ? mood.color : "#F3F4F6",
                  }}
                >
                  <span className="text-4xl flex-shrink-0">{mood.emoji}</span>
                  <div className="text-left flex-1">
                    <p
                      className="font-bold text-base"
                      style={{
                        color: selectedMood === idx ? mood.color : "#374151",
                      }}
                    >
                      {mood.label}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {mood.description}
                    </p>
                  </div>
                  {selectedMood === idx && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: mood.color }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              disabled={selectedMood === null}
              className="w-full mt-6 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background:
                  selectedMood !== null
                    ? `linear-gradient(135deg, ${moods[selectedMood].color}, ${moods[selectedMood].color}CC)`
                    : "#E5E7EB",
                color: selectedMood !== null ? "white" : "#9CA3AF",
              }}
            >
              Continuar <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === "reflection" && selected && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="text-center mb-6">
              <span className="text-6xl">{selected.emoji}</span>
              <p
                className="font-bold text-xl mt-2"
                style={{ color: selected.color }}
              >
                {selected.label}
              </p>
            </div>

            <div
              className="rounded-2xl p-5 mb-5"
              style={{
                backgroundColor: selected.bg,
                border: `1px solid ${selected.border}`,
              }}
            >
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                📝 Reflexão do Dia (opcional)
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="O que está em sua mente hoje? Pode escrever livremente — isso é só seu e do seu terapeuta..."
                rows={5}
                maxLength={300}
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 placeholder-gray-400"
                style={{ focusRingColor: selected.color }}
              />
              <p className="text-right text-xs text-gray-400 mt-1">
                {reflection.length}/300
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 mb-5 border border-gray-100">
              <div className="flex items-start gap-3">
                <Heart className="w-4 h-4 text-[#F4A261] mt-0.5 flex-shrink-0" />
                <p className="text-gray-500 text-xs leading-relaxed">
                  Sua reflexão é compartilhada de forma segura com seu
                  psicólogo(a) no CAPS AD, que poderá acompanhar sua jornada com
                  mais cuidado. 🔐
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center font-medium border border-red-200 mb-4">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("mood")}
                className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-medium text-sm"
              >
                Voltar
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-2 flex-grow-[2] py-3.5 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}, ${selected.color}CC)`,
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Check-in
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
