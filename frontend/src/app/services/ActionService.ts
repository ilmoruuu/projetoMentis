import api from "./api";


export interface ActionResponse {
  id: string;
  name: string;
  description: string;
  points: number;
}


/**
 * Buscar todas as ações disponíveis
 */
export async function getActions(): Promise<ActionResponse[]> {

  try {

    const response =
      await api.get("/actions");


    return response.data;


  } catch (error: any) {


    throw new Error(
      error.response?.data?.message ??
      "Não foi possível carregar as ações"
    );

  }

}


/**
 * Buscar ação por ID
 */
export async function getActionById(
  id: string
): Promise<ActionResponse> {


  try {


    const response =
      await api.get(`/actions/${id}`);


    return response.data;


  } catch (error: any) {


    throw new Error(
      error.response?.data?.message ??
      "Ação não encontrada"
    );

  }

}


/**
 * Criar ação
 */
export async function createAction(
  data: {
    name: string;
    description: string;
    points: number;
  }

): Promise<ActionResponse> {


  try {


    const response =
      await api.post(
        "/actions",
        data
      );


    return response.data;


  } catch (error: any) {


    throw new Error(
      error.response?.data?.message ??
      "Não foi possível criar a ação"
    );

  }

}


/**
 * Atualizar ação
 */
export async function updateAction(
  id: string,
  data: {
    name: string;
    description: string;
    points: number;
  }

): Promise<ActionResponse> {


  try {


    const response =
      await api.put(
        `/actions/${id}`,
        data
      );


    return response.data;


  } catch (error: any) {


    throw new Error(
      error.response?.data?.message ??
      "Não foi possível atualizar a ação"
    );

  }

}


/**
 * Deletar ação
 */
export async function deleteAction(
  id: string
): Promise<void> {


  try {


    await api.delete(
      `/actions/${id}`
    );


  } catch (error: any) {


    throw new Error(
      error.response?.data?.message ??
      "Não foi possível excluir a ação"
    );

  }

}