import axios from "axios";

const BASE_URL = "http://localhost:8080";

export interface CheckInResponse {
  id: string;
  status: boolean;
  date: string;
  patientId: string;
}

export async function getCurrentPatientId(): Promise<string> {
  try {
    const response = await axios.get(`${BASE_URL}/patients`);
    const patients = response.data;

    if (!Array.isArray(patients) || patients.length === 0) {
      throw new Error("Nenhum paciente cadastrado no sistema.");
    }

    return patients[0].id;
  } catch (e) {
    if (
      e instanceof Error &&
      e.message === "Nenhum paciente cadastrado no sistema."
    ) {
      throw e;
    }

    throw new Error(
      "Não foi possível identificar o paciente. Tente novamente mais tarde.",
    );
  }
}

export async function createCheckIn(
  patientId: string,
): Promise<CheckInResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/checkins`, {
      status: true,
      patientId,
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const mensagemErro =
        e.response?.data?.message || "Não foi possível enviar o check-in";

      throw new Error(mensagemErro);
    }

    throw new Error(
      "Não foi possível conectar ao servidor, Tente novamente mais tarde",
    );
  }
}
