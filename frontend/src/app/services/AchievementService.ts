import api from "./api";

export interface Achievement {
  id: string;
  description: string;
  goalInDays: number;
  patientAchievements: PatientAchievement[];
}

export interface PatientAchievement {
  patientId: string;
  achievementId: string;
  acquisitionDate: string;
}


export async function getAchievements(): Promise<Achievement[]> {
  try {
    const response = await api.get<Achievement[]>("/achievements");

    return response.data;

  } catch (error) {
    throw new Error(
      "Não foi possível carregar as conquistas"
    );
  }
}


export async function getAchievementById(
  id: string
): Promise<Achievement> {

  try {

    const response =
      await api.get<Achievement>(
        `/achievements/${id}`
      );

    return response.data;


  } catch(error){

    throw new Error(
      "Conquista não encontrada"
    );

  }
}