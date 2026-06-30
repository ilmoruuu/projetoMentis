import axios from 'axios';
import { getLoggedUser } from "./AuthStorage";

const BASE_URL = 'http://localhost:8080';

export interface HumorHistoryResponse {
  id: string;
  patientId: string;
  moodType: string;
  description: string;
  dateTime: string;
}

/**
 * Formato de humor usado pela UI (mesmo shape do mockData):
 * mood é um nível de 1 a 5 (1 = Muito Ruim ... 5 = Ótimo).
 */
export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: number; // 1-5
  reflection?: string;
}

/**
 * A tela tem 5 níveis de humor (índice 0..4, conforme o array `moods`
 * da tela de check-in). O back-end usa o enum MoodType (18 valores).
 * Aqui mapeamos os 5 níveis da UI para um valor representativo do enum.
 */
const LEVEL_TO_MOODTYPE: Record<number, string> = {
  0: 'TRISTE', // Muito Ruim
  1: 'DESANIMADO', // Ruim
  2: 'NEUTRO', // Neutro
  3: 'CALMO', // Bom
  4: 'FELIZ', // Ótimo
};

/**
 * Caminho inverso: traduz qualquer valor do enum MoodType do back-end
 * para o nível 1..5 que a UI sabe exibir (emoji/cor/label).
 */
const MOODTYPE_TO_LEVEL: Record<string, number> = {
  MOTIVADO: 5,
  ESPERANCOSO: 5,
  CONFIANTE: 5,
  FELIZ: 5,
  CALMO: 4,
  NEUTRO: 3,
  CANSADO: 3,
  DESANIMADO: 2,
  ANSIOSO: 2,
  ESTRESSADO: 2,
  INSEGURO: 2,
  SOLITARIO: 2,
  FRUSTRADO: 2,
  CULPADO: 2,
  IRRITADO: 1,
  TRISTE: 1,
  VONTADE_DE_USAR: 1,
  DESESPERANCOSO: 1,
};

export function moodTypeFromLevel(levelIndex: number): string {
  return LEVEL_TO_MOODTYPE[levelIndex] ?? 'NEUTRO';
}

export function levelFromMoodType(moodType: string): number {
  return MOODTYPE_TO_LEVEL[moodType] ?? 3;
}

/**
 * Resolve o paciente "logado".
 *
 * Temporário: enquanto o login é hardcoded e não devolve a identidade
 * do usuário, usamos o primeiro paciente cadastrado (GET /patients).
 */
export function getCurrentPatientId(): string {


 const user = getLoggedUser();


 if(!user){
    throw new Error("Paciente não autenticado");
 }


 if(user.patient?.id){
    return user.patient.id;
 }


 throw new Error(
   "Usuário logado não possui paciente"
 );


}

/**
 * Registra um humor para o paciente.
 * @param levelIndex índice 0..4 do humor selecionado na tela
 * @param reflection texto livre (opcional na UI; o back exige, então
 *                   enviamos um texto padrão quando vazio)
 */
export async function createHumorHistory(
  patientId: string,
  levelIndex: number,
  reflection: string,
): Promise<HumorHistoryResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/humor-history`, {
      patientId,
      moodType: moodTypeFromLevel(levelIndex),
      description: reflection.trim() || 'Sem reflexão registrada.',
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const mensagemErro =
        e.response?.data?.message || 'Não foi possível registrar o humor';

      throw new Error(mensagemErro);
    }

    throw new Error('Não foi possível conectar ao servidor, Tente novamente mais tarde');
  }
}

/**
 * Busca o histórico de humor do paciente já no formato da UI
 * (ordenado da data mais antiga para a mais recente).
 */
export async function getHumorHistory(patientId: string): Promise<MoodEntry[]> {
  try {
    const response = await axios.get(`${BASE_URL}/humor-history/patient/${patientId}`);
    const history: HumorHistoryResponse[] = response.data ?? [];

    return history
      .map((h) => ({
        date: h.dateTime.slice(0, 10),
        mood: levelFromMoodType(h.moodType),
        reflection: h.description,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const mensagemErro =
        e.response?.data?.message || 'Não foi possível carregar o histórico de humor';

      throw new Error(mensagemErro);
    }

    throw new Error('Não foi possível conectar ao servidor, Tente novamente mais tarde');
  }
}
