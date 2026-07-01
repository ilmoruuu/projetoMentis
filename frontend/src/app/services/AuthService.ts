import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface LoginDto {
  email: string;
  password: string;
}

export async function login(cretendials: LoginDto) {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, cretendials);

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const mensagemErro =
        e.response?.data?.message || "O Email ou senha estão incorretos";

      throw new Error(mensagemErro);
    }

    throw new Error(
      "Não foi possível conectar ao servidor, Tente novamente mais tarde",
    );
  }
}
