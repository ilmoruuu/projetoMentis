import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  Info,
  FileText,
  User,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
  X,
  BookOpen,
  Printer,
} from "lucide-react";
import {
  currentProfessional,
  patients,
  procedureCodes,
  cidCodes,
  ProcedureCode,
} from "../../../shared/data/mockData";
import { createDiagnosis } from "../../../app/services/DiagnosisService";

interface ActionRow {
  id: string;
  procedureCode: string;
  procedureDesc: string;
  quantity: number;
  cbo: string;
  competencia: string;
}

const sections = [
  {
    id: "estabelecimento",
    label: "Estabelecimento de Saúde",
    icon: <Stethoscope className="w-4 h-4" />,
  },
  {
    id: "paciente",
    label: "Dados do Paciente",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "diagnostico",
    label: "Diagnóstico CID-10",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "acoes",
    label: "Ações Realizadas",
    icon: <ClipboardList className="w-4 h-4" />,
  },
];

function SectionCard({
  title,
  icon,
  children,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="raas-section bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-[#F9FBFF]">
        <div className="w-8 h-8 bg-[#E0EFFF] rounded-lg flex items-center justify-center text-[#1B82BF]">
          {icon}
        </div>
        <h3 className="font-semibold text-[#0F4C75] text-sm">{title}</h3>
        {badge && (
          <span className="ml-auto flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            {badge}
          </span>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function FormField({
  label,
  value,
  readOnly = false,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
          readOnly
            ? "bg-[#F0F7FF] border-blue-100 text-[#0F4C75] font-medium cursor-not-allowed"
            : "bg-white border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF] hover:border-gray-300"
        }`}
      />
      {readOnly && (
        <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Preenchido automaticamente pelo
          perfil do paciente
        </p>
      )}
    </div>
  );
}

export function RAASForm() {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("patient") ?? "PAC001";
  const [selectedPatientId, setSelectedPatientId] = useState(preselectedId);
  const [showCodeHelper, setShowCodeHelper] = useState(false);
  const [codeSearch, setCodeSearch] = useState("");
  const [cidSearch, setCidSearch] = useState("");
  const [showCIDHelper, setShowCIDHelper] = useState<
    "primary" | "secondary" | null
  >(null);
  const [primaryCID, setPrimaryCID] = useState("");
  const [secondaryCID, setSecondaryCID] = useState("");

  const [observations, setObservations] = useState("");
  const [broadCIDObservation, setBroadCIDObservation] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [sexuality, setSexuality] = useState("");
  const [religion, setReligion] = useState("");

  const [actions, setActions] = useState<ActionRow[]>([
    {
      id: "1",
      procedureCode: "",
      procedureDesc: "",
      quantity: 1,
      cbo: currentProfessional.cbo,
      competencia: "04/2026",
    },
  ]);

  const patient =
    patients.find((p) => p.id === selectedPatientId) ?? patients[0];

  // Set CID from patient on selection
  useEffect(() => {
    setPrimaryCID(patient.primaryCID);
    setSecondaryCID(patient.secondaryCID ?? "");
  }, [selectedPatientId]);

  const filteredCodes = procedureCodes.filter(
    (c) =>
      c.code.includes(codeSearch) ||
      c.description.toLowerCase().includes(codeSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(codeSearch.toLowerCase()),
  );

  const filteredCIDs = cidCodes.filter(
    (c) =>
      c.code.toLowerCase().includes(cidSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(cidSearch.toLowerCase()),
  );

  const addProcedure = (code: ProcedureCode) => {
    setActions((prev) =>
      prev.map((a, i) =>
        i === prev.length - 1 && !a.procedureCode
          ? { ...a, procedureCode: code.code, procedureDesc: code.description }
          : a,
      ),
    );
    // If last row already filled, add new
    if (actions[actions.length - 1].procedureCode !== "") {
      setActions((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          procedureCode: code.code,
          procedureDesc: code.description,
          quantity: 1,
          cbo: currentProfessional.cbo,
          competencia: "04/2026",
        },
      ]);
    }
    setShowCodeHelper(false);
    setCodeSearch("");
  };

  const addRow = () => {
    setActions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        procedureCode: "",
        procedureDesc: "",
        quantity: 1,
        cbo: currentProfessional.cbo,
        competencia: "04/2026",
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (actions.length === 1) return;
    setActions((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await createDiagnosis(primaryCID, secondaryCID, broadCIDObservation);

      setSubmitted(true);
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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#0F4C75] mb-2">
          RAAS Enviado com Sucesso!
        </h2>
        <p className="text-gray-500 mb-2">
          O formulário foi registrado no sistema SUS.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Protocolo: RAAS-{new Date().getFullYear()}-
          {Math.floor(Math.random() * 90000) + 10000}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-[#1B82BF] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1670A8] transition-colors"
        >
          Novo Formulário RAAS
        </button>
      </motion.div>
    );
  }

  return (
    <>
    <div className="flex gap-6">
      {/* Main Form */}
      <div id="raas-print" className="flex-1 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0F4C75] text-2xl font-bold">
              Formulário RAAS Digital
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Registro das Ações Ambulatoriais de Saúde — CAPS AD
            </p>
          </div>
          <div className="no-print flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1B82BF] bg-white text-[#1B82BF] text-sm font-medium hover:bg-blue-50 transition-all"
            >
              <Printer className="w-4 h-4" />
              Exportar PDF
            </button>
            <button
              onClick={() => setShowCodeHelper(!showCodeHelper)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showCodeHelper
                  ? "bg-[#1B82BF] text-white border-[#1B82BF]"
                  : "bg-white text-[#1B82BF] border-[#1B82BF] hover:bg-blue-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Tabela de Códigos
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3 py-2.5">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              SUS Integrado
            </div>
          </div>
        </div>

        {/* Patient Selector */}
        <div className="no-print bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              Selecionar Paciente:
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF] bg-[#F9FBFF]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — CNS: {p.cns}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-2 rounded-lg text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Dados carregados
            </div>
          </div>
        </div>

        {/* Section 1: Estabelecimento */}
        <SectionCard
          title="1. Identificação do Estabelecimento de Saúde"
          icon={<Stethoscope className="w-4 h-4" />}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CNES" value={currentProfessional.cnes} readOnly />
            <FormField
              label="Nome do Estabelecimento"
              value={currentProfessional.establishment}
              readOnly
            />
            <FormField
              label="Município"
              value={currentProfessional.city}
              readOnly
            />
            <FormField label="UF" value={currentProfessional.state} readOnly />
            <FormField
              label="CBO do Profissional"
              value={currentProfessional.cbo}
              readOnly
            />
            <FormField
              label="Nome do Profissional"
              value={currentProfessional.name}
              readOnly
            />
          </div>
        </SectionCard>

        {/* Section 2: Paciente - Auto-populated */}
        <SectionCard
          title="2. Identificação do Usuário do SUS"
          icon={<User className="w-4 h-4" />}
          badge="Auto-preenchido"
        >
          <div className="flex items-start gap-3 mb-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-[#1B82BF] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700">
              Os dados abaixo são preenchidos automaticamente a partir do
              prontuário do paciente vinculado ao CNS, eliminando erros de
              digitação e agilizando o processo de registro.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormField
                label="Nome Completo do Usuário"
                value={patient.name}
                readOnly
              />
            </div>
            <FormField
              label="Cartão Nacional de Saúde (CNS)"
              value={patient.cns}
              readOnly
            />
            <FormField
              label="Data de Nascimento"
              value={new Date(patient.dob + "T12:00:00").toLocaleDateString(
                "pt-BR",
              )}
              readOnly
            />
            <FormField label="Sexo" value={patient.sex} readOnly />
            <FormField label="Raça/Cor" value={patient.race} readOnly />
            <div className="col-span-2">
              <FormField
                label="Endereço Completo"
                value={`${patient.address}, ${patient.neighborhood}`}
                readOnly
              />
            </div>
            <FormField label="Município" value={patient.city} readOnly />
            <FormField label="UF" value={patient.state} readOnly />
            <FormField label="CEP" value={patient.cep} readOnly />
            <FormField label="Telefone" value={patient.phone} readOnly />
            <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Observações do Paciente
                </label>

                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={4}
                  placeholder="Ex.: Sexualidade, religião, informações culturais, preferências do usuário ou outras observações relevantes."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Campo opcional para informações complementares do usuário.
                </p>
            </div>
          </div>
        </SectionCard>

        {/* Section 3: CID-10 */}
        <SectionCard
          title="3. Diagnóstico Clínico (CID-10)"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Primary CID */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                CID-10 Principal <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  value={primaryCID}
                  onChange={(e) => setPrimaryCID(e.target.value)}
                  placeholder="Ex: F10.2"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                />
                <button
                  onClick={() =>
                    setShowCIDHelper(
                      showCIDHelper === "primary" ? null : "primary",
                    )
                  }
                  className="px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] hover:bg-blue-50 transition-colors"
                >
                  <Search className="w-4 h-4 text-[#1B82BF]" />
                </button>
              </div>
              {primaryCID && (
                <p className="text-xs text-gray-500 mt-1">
                  {cidCodes.find((c) => c.code === primaryCID)?.description ??
                    ""}
                </p>
              )}
              <AnimatePresence>
                {showCIDHelper === "primary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute z-20 top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <input
                        autoFocus
                        value={cidSearch}
                        onChange={(e) => setCidSearch(e.target.value)}
                        placeholder="Buscar CID-10..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCIDs.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setPrimaryCID(c.code);
                            setShowCIDHelper(null);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 border-b border-gray-50"
                        >
                          <span className="text-[#1B82BF] font-mono text-xs font-bold w-12 flex-shrink-0">
                            {c.code}
                          </span>
                          <span className="text-gray-700 text-sm">
                            {c.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary CID */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                CID-10 Secundário
              </label>
              <div className="flex gap-2">
                <input
                  value={secondaryCID}
                  onChange={(e) => setSecondaryCID(e.target.value)}
                  placeholder="Ex: F17.1 (opcional)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                />
                <button
                  onClick={() =>
                    setShowCIDHelper(
                      showCIDHelper === "secondary" ? null : "secondary",
                    )
                  }
                  className="px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] hover:bg-blue-50 transition-colors"
                >
                  <Search className="w-4 h-4 text-[#1B82BF]" />
                </button>
              </div>
              {secondaryCID && (
                <p className="text-xs text-gray-500 mt-1">
                  {cidCodes.find((c) => c.code === secondaryCID)?.description ??
                    ""}
                </p>
              )}
              <AnimatePresence>
                {showCIDHelper === "secondary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute z-20 top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <input
                        autoFocus
                        value={cidSearch}
                        onChange={(e) => setCidSearch(e.target.value)}
                        placeholder="Buscar CID-10..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCIDs.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSecondaryCID(c.code);
                            setShowCIDHelper(null);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 border-b border-gray-50"
                        >
                          <span className="text-[#1B82BF] font-mono text-xs font-bold w-12 flex-shrink-0">
                            {c.code}
                          </span>
                          <span className="text-gray-700 text-sm">
                            {c.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="col-span-2 mt-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                CID Ampliado / Observação Clínica
              </label>

              <textarea
                value={broadCIDObservation}
                onChange={(e) => setBroadCIDObservation(e.target.value)}
                rows={5}
                placeholder="Descreva informações clínicas complementares..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
              />

              <p className="text-xs text-gray-400 mt-2">
                Campo complementar ao CID-10 para contextualização clínica do paciente.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Section 4: Actions */}
        <SectionCard
          title="4. Ações Realizadas"
          icon={<ClipboardList className="w-4 h-4" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FBFF] rounded-xl">
                  {[
                    "Competência",
                    "Código do Procedimento",
                    "Descrição",
                    "Qtd.",
                    "CBO",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {actions.map((action, idx) => (
                  <tr key={action.id} className="group">
                    <td className="px-3 py-2">
                      <input
                        value={action.competencia}
                        onChange={(e) =>
                          setActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? { ...a, competencia: e.target.value }
                                : a,
                            ),
                          )
                        }
                        className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <input
                          value={action.procedureCode}
                          onChange={(e) =>
                            setActions((prev) =>
                              prev.map((a) =>
                                a.id === action.id
                                  ? {
                                      ...a,
                                      procedureCode: e.target.value,
                                      procedureDesc:
                                        procedureCodes.find(
                                          (c) => c.code === e.target.value,
                                        )?.description ?? a.procedureDesc,
                                    }
                                  : a,
                              ),
                            )
                          }
                          placeholder="00.00.00.000-0"
                          className="w-36 font-mono px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                        />
                        <button
                          onClick={() => setShowCodeHelper(true)}
                          className="p-2 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
                          title="Abrir tabela de códigos"
                        >
                          <Search className="w-3.5 h-3.5 text-[#1B82BF]" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={action.procedureDesc}
                        onChange={(e) =>
                          setActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? { ...a, procedureDesc: e.target.value }
                                : a,
                            ),
                          )
                        }
                        placeholder="Descrição do procedimento"
                        className="w-full min-w-48 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={action.quantity}
                        onChange={(e) =>
                          setActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? {
                                    ...a,
                                    quantity: parseInt(e.target.value) || 1,
                                  }
                                : a,
                            ),
                          )
                        }
                        className="w-16 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={action.cbo}
                        onChange={(e) =>
                          setActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? { ...a, cbo: e.target.value }
                                : a,
                            ),
                          )
                        }
                        className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeRow(action.id)}
                        disabled={actions.length === 1}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={addRow}
              className="flex items-center gap-2 text-[#1B82BF] text-sm font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Ação
            </button>
            <button
              onClick={() => setShowCodeHelper(true)}
              className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Consultar Tabela de Procedimentos
            </button>
          </div>
        </SectionCard>

        {/* Submit */}
        <div className="pb-8">
          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center font-medium border border-red-200 mb-4">
              {errorMessage}
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <button className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
              Salvar Rascunho
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-[#1B82BF] to-[#2A9D8F] hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? "Enviando..." : "Enviar RAAS ao SUS"}
            </button>
          </div>
        </div>
      </div>

      {/* Code Helper Side Panel */}
      <AnimatePresence>
        {showCodeHelper && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-6">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#F9FBFF] rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1B82BF]" />
                  <h3 className="text-sm font-semibold text-[#0F4C75]">
                    Tabela SIGTAP
                  </h3>
                </div>
                <button
                  onClick={() => setShowCodeHelper(false)}
                  className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    value={codeSearch}
                    onChange={(e) => setCodeSearch(e.target.value)}
                    placeholder="Buscar procedimento..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B82BF]/30 focus:border-[#1B82BF]"
                  />
                </div>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {[
                  "Individual",
                  "Grupo",
                  "Família",
                  "Visita",
                  "Acolhimento",
                  "PTS",
                  "Urgência",
                  "Escuta",
                  "Oficina",
                  "Redução de Danos",
                  "Comunitário",
                  "Gestão",
                ].map((cat) => {
                  const catCodes = filteredCodes.filter(
                    (c) => c.category === cat,
                  );
                  if (catCodes.length === 0) return null;
                  return (
                    <div key={cat}>
                      <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          {cat}
                        </p>
                      </div>
                      {catCodes.map((code) => (
                        <button
                          key={code.code}
                          onClick={() => addProcedure(code)}
                          className="w-full text-left px-5 py-3 hover:bg-blue-50 border-b border-gray-50 group transition-colors"
                        >
                          <p className="font-mono text-xs text-[#1B82BF] font-bold mb-0.5 group-hover:text-[#0F4C75]">
                            {code.code}
                          </p>
                          <p className="text-gray-700 text-xs leading-tight">
                            {code.description}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Máx: {code.maxPerMonth}×/mês
                          </p>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-3 bg-blue-50 rounded-b-2xl">
                <p className="text-xs text-blue-600 text-center">
                  Clique em um procedimento para adicionar à tabela de ações
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
</>
  );
}
