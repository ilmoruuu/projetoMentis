export interface MoodEntry {
  date: string;
  mood: number; // 1-5
  reflection?: string;
}

export interface Patient {
  id: string;
  name: string;
  cns: string;
  dob: string;
  sex: string;
  race: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  primaryCID: string;
  secondaryCID?: string;
  moodHistory: MoodEntry[];
  sobrietyDays: number;
  sobrietyType: string;
  lastCheckIn: string;
  status: "active" | "monitoring" | "critical";
  psychologist: string;
  startDate: string;
}

export interface Professional {
  id: string;
  name: string;
  crp: string;
  cbo: string;
  cnes: string;
  establishment: string;
  city: string;
  state: string;
}

export interface ProcedureCode {
  code: string;
  description: string;
  category: string;
  maxPerMonth: number;
}

export const currentProfessional: Professional = {
  id: "P001",
  name: "Dra. Ana Lima",
  crp: "06/123456",
  cbo: "251510",
  cnes: "2345678",
  establishment: "CAPS AD – Centro de Atenção Psicossocial Álcool e Drogas",
  city: "São Paulo",
  state: "SP",
};

export const currentPatient: Patient = {
  id: "PAC001",
  name: "João Carlos da Silva",
  cns: "707 5056 1822 5471",
  dob: "1985-03-14",
  sex: "Masculino",
  race: "Parda",
  address: "Rua das Palmeiras, 342, Apto 12",
  neighborhood: "Vila Esperança",
  city: "São Paulo",
  state: "SP",
  cep: "03456-789",
  phone: "(11) 99874-3210",
  primaryCID: "F10.2",
  secondaryCID: "F17.1",
  moodHistory: [
    {
      date: "2026-04-14",
      mood: 2,
      reflection: "Dia difícil, muita ansiedade.",
    },
    {
      date: "2026-04-15",
      mood: 3,
      reflection: "Um pouco melhor. Saí para caminhar.",
    },
    {
      date: "2026-04-16",
      mood: 4,
      reflection: "Consegui passar o dia tranquilo.",
    },
    { date: "2026-04-17", mood: 3, reflection: "Senti fissura mas resisti." },
    {
      date: "2026-04-18",
      mood: 4,
      reflection: "Fui ao grupo de apoio, ajudou muito.",
    },
    {
      date: "2026-04-19",
      mood: 5,
      reflection: "Completei 30 dias! Me sinto orgulhoso.",
    },
    { date: "2026-04-20", mood: 4, reflection: "" },
  ],
  sobrietyDays: 30,
  sobrietyType: "álcool",
  lastCheckIn: "2026-04-20",
  status: "active",
  psychologist: "Dra. Ana Lima",
  startDate: "2026-01-10",
};

export const patients: Patient[] = [
  {
    id: "PAC001",
    name: "João Carlos da Silva",
    cns: "707 5056 1822 5471",
    dob: "1985-03-14",
    sex: "Masculino",
    race: "Parda",
    address: "Rua das Palmeiras, 342, Apto 12",
    neighborhood: "Vila Esperança",
    city: "São Paulo",
    state: "SP",
    cep: "03456-789",
    phone: "(11) 99874-3210",
    primaryCID: "F10.2",
    secondaryCID: "F17.1",
    moodHistory: [
      { date: "2026-04-14", mood: 2 },
      { date: "2026-04-15", mood: 3 },
      { date: "2026-04-16", mood: 4 },
      { date: "2026-04-17", mood: 3 },
      { date: "2026-04-18", mood: 4 },
      { date: "2026-04-19", mood: 5 },
      { date: "2026-04-20", mood: 4 },
    ],
    sobrietyDays: 30,
    sobrietyType: "álcool",
    lastCheckIn: "2026-04-20",
    status: "active",
    psychologist: "Dra. Ana Lima",
    startDate: "2026-01-10",
  },
  {
    id: "PAC002",
    name: "Maria Fernanda Costa",
    cns: "708 9012 3456 7891",
    dob: "1992-07-22",
    sex: "Feminino",
    race: "Branca",
    address: "Av. Independência, 1200",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    cep: "01234-567",
    phone: "(11) 98765-4321",
    primaryCID: "F14.1",
    moodHistory: [
      { date: "2026-04-14", mood: 1 },
      { date: "2026-04-15", mood: 2 },
      { date: "2026-04-16", mood: 2 },
      { date: "2026-04-17", mood: 3 },
      { date: "2026-04-18", mood: 2 },
      { date: "2026-04-19", mood: 3 },
      { date: "2026-04-20", mood: 3 },
    ],
    sobrietyDays: 7,
    sobrietyType: "cocaína",
    lastCheckIn: "2026-04-20",
    status: "monitoring",
    psychologist: "Dra. Ana Lima",
    startDate: "2026-02-15",
  },
  {
    id: "PAC003",
    name: "Roberto Almeida Santos",
    cns: "709 1234 5678 9012",
    dob: "1978-11-05",
    sex: "Masculino",
    race: "Preta",
    address: "Rua Boa Vista, 88",
    neighborhood: "Jardim América",
    city: "São Paulo",
    state: "SP",
    cep: "04321-098",
    phone: "(11) 97654-3210",
    primaryCID: "F10.2",
    secondaryCID: "F19.1",
    moodHistory: [
      { date: "2026-04-14", mood: 3 },
      { date: "2026-04-15", mood: 4 },
      { date: "2026-04-16", mood: 5 },
      { date: "2026-04-17", mood: 4 },
      { date: "2026-04-18", mood: 4 },
      { date: "2026-04-19", mood: 5 },
      { date: "2026-04-20", mood: 5 },
    ],
    sobrietyDays: 90,
    sobrietyType: "álcool",
    lastCheckIn: "2026-04-20",
    status: "active",
    psychologist: "Dra. Ana Lima",
    startDate: "2025-11-01",
  },
  {
    id: "PAC004",
    name: "Luciana Pereira Gomes",
    cns: "710 2345 6789 0123",
    dob: "2001-04-18",
    sex: "Feminino",
    race: "Branca",
    address: "Rua Marechal Deodoro, 55",
    neighborhood: "Vila Nova",
    city: "São Paulo",
    state: "SP",
    cep: "05678-901",
    phone: "(11) 96543-2109",
    primaryCID: "F12.1",
    moodHistory: [
      { date: "2026-04-14", mood: 2 },
      { date: "2026-04-15", mood: 1 },
      { date: "2026-04-16", mood: 2 },
      { date: "2026-04-17", mood: 1 },
      { date: "2026-04-18", mood: 2 },
      { date: "2026-04-19", mood: 2 },
      { date: "2026-04-20", mood: 3 },
    ],
    sobrietyDays: 3,
    sobrietyType: "cannabis",
    lastCheckIn: "2026-04-20",
    status: "critical",
    psychologist: "Dra. Ana Lima",
    startDate: "2026-03-20",
  },
  {
    id: "PAC005",
    name: "Carlos Eduardo Ramos",
    cns: "711 3456 7890 1234",
    dob: "1970-09-30",
    sex: "Masculino",
    race: "Amarela",
    address: "Av. Paulista, 900, Conj. 74",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    cep: "01310-100",
    phone: "(11) 95432-1098",
    primaryCID: "F17.2",
    moodHistory: [
      { date: "2026-04-14", mood: 4 },
      { date: "2026-04-15", mood: 4 },
      { date: "2026-04-16", mood: 5 },
      { date: "2026-04-17", mood: 4 },
      { date: "2026-04-18", mood: 5 },
      { date: "2026-04-19", mood: 4 },
      { date: "2026-04-20", mood: 5 },
    ],
    sobrietyDays: 180,
    sobrietyType: "tabaco",
    lastCheckIn: "2026-04-19",
    status: "active",
    psychologist: "Dra. Ana Lima",
    startDate: "2025-07-01",
  },
  {
    id: "PAC006",
    name: "Beatriz Oliveira Nunes",
    cns: "712 4567 8901 2345",
    dob: "1996-12-03",
    sex: "Feminino",
    race: "Parda",
    address: "Rua Conselheiro Ramalho, 120",
    neighborhood: "Paraíso",
    city: "São Paulo",
    state: "SP",
    cep: "01325-010",
    phone: "(11) 94321-0987",
    primaryCID: "F15.1",
    moodHistory: [
      { date: "2026-04-14", mood: 3 },
      { date: "2026-04-15", mood: 3 },
      { date: "2026-04-16", mood: 4 },
      { date: "2026-04-17", mood: 3 },
      { date: "2026-04-18", mood: 4 },
      { date: "2026-04-19", mood: 4 },
      { date: "2026-04-20", mood: 4 },
    ],
    sobrietyDays: 45,
    sobrietyType: "estimulantes",
    lastCheckIn: "2026-04-20",
    status: "active",
    psychologist: "Dra. Ana Lima",
    startDate: "2026-01-28",
  },
];

export const procedureCodes: ProcedureCode[] = [
  {
    code: "03.01.08.020-8",
    description: "Atendimento Individual – Psicologia",
    category: "Individual",
    maxPerMonth: 4,
  },
  {
    code: "03.01.08.021-6",
    description: "Atendimento em Grupo – Psicologia",
    category: "Grupo",
    maxPerMonth: 12,
  },
  {
    code: "03.01.08.022-4",
    description: "Atendimento em Família",
    category: "Família",
    maxPerMonth: 4,
  },
  {
    code: "03.01.08.023-2",
    description: "Visita Domiciliar",
    category: "Visita",
    maxPerMonth: 2,
  },
  {
    code: "03.01.08.024-0",
    description: "Atividade Comunitária e/ou Grupal",
    category: "Comunitário",
    maxPerMonth: 8,
  },
  {
    code: "03.01.08.025-9",
    description: "Atendimento à Família – CAPS AD",
    category: "Família",
    maxPerMonth: 4,
  },
  {
    code: "03.01.08.026-7",
    description: "Acolhimento Inicial com Classificação de Risco",
    category: "Acolhimento",
    maxPerMonth: 1,
  },
  {
    code: "03.01.08.027-5",
    description: "Elaboração de Projeto Terapêutico Singular (PTS)",
    category: "PTS",
    maxPerMonth: 1,
  },
  {
    code: "03.01.08.028-3",
    description: "Atendimento de Urgência/Crise CAPS",
    category: "Urgência",
    maxPerMonth: 2,
  },
  {
    code: "03.01.08.029-1",
    description: "Escuta Qualificada e Orientação",
    category: "Escuta",
    maxPerMonth: 8,
  },
  {
    code: "03.01.08.030-5",
    description: "Oficina Terapêutica I (Cognição)",
    category: "Oficina",
    maxPerMonth: 16,
  },
  {
    code: "03.01.08.031-3",
    description: "Oficina Terapêutica II (Expressão)",
    category: "Oficina",
    maxPerMonth: 16,
  },
  {
    code: "03.01.08.032-1",
    description: "Redução de Danos – Individual",
    category: "Redução de Danos",
    maxPerMonth: 4,
  },
  {
    code: "03.01.08.033-0",
    description: "Redução de Danos – Grupal",
    category: "Redução de Danos",
    maxPerMonth: 8,
  },
  {
    code: "03.01.08.034-8",
    description: "Coordenação de Cuidados – Matriciamento",
    category: "Gestão",
    maxPerMonth: 2,
  },
];

export const cidCodes: { code: string; description: string }[] = [
  { code: "F10.0", description: "Intoxicação aguda por álcool" },
  { code: "F10.1", description: "Uso nocivo de álcool" },
  { code: "F10.2", description: "Dependência de álcool" },
  { code: "F10.3", description: "Abstinência de álcool" },
  { code: "F11.1", description: "Uso nocivo de opioides" },
  { code: "F11.2", description: "Dependência de opioides" },
  { code: "F12.1", description: "Uso nocivo de canabinoides" },
  { code: "F12.2", description: "Dependência de canabinoides" },
  { code: "F13.2", description: "Dependência de sedativos/hipnóticos" },
  { code: "F14.1", description: "Uso nocivo de cocaína" },
  { code: "F14.2", description: "Dependência de cocaína" },
  { code: "F15.1", description: "Uso nocivo de outros estimulantes" },
  { code: "F15.2", description: "Dependência de outros estimulantes" },
  { code: "F17.1", description: "Uso nocivo de tabaco" },
  { code: "F17.2", description: "Dependência de tabaco" },
  { code: "F19.1", description: "Uso nocivo de múltiplas drogas" },
  { code: "F19.2", description: "Dependência de múltiplas drogas" },
  { code: "F32.0", description: "Episódio depressivo leve" },
  { code: "F32.1", description: "Episódio depressivo moderado" },
  { code: "F41.1", description: "Transtorno de ansiedade generalizada" },
];

export const milestones = [
  { days: 1, label: "24 Horas", icon: "⭐", color: "#F59E0B" },
  { days: 3, label: "3 Dias", icon: "🌟", color: "#F59E0B" },
  { days: 7, label: "1 Semana", icon: "🏅", color: "#6B7280" },
  { days: 14, label: "2 Semanas", icon: "🥉", color: "#92400E" },
  { days: 30, label: "1 Mês", icon: "🥈", color: "#9CA3AF" },
  { days: 60, label: "2 Meses", icon: "🥇", color: "#D97706" },
  { days: 90, label: "3 Meses", icon: "🏆", color: "#059669" },
  { days: 180, label: "6 Meses", icon: "💎", color: "#7C3AED" },
  { days: 365, label: "1 Ano", icon: "👑", color: "#DC2626" },
];
