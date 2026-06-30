import api from "./api";


export interface PatientAchievement {

  patientId:string;

  achievementId:string;

  acquisitionDate:string;

}



export interface CreatePatientAchievementDTO{

  patientId:string;

  achievementId:string;

}



export async function assignAchievement(
  dto:CreatePatientAchievementDTO
):Promise<PatientAchievement>{


  try{

    const response =
      await api.post<PatientAchievement>(
        "/patient-achievements",
        dto
      );


    return response.data;


  }catch(error){

    throw new Error(
      "Não foi possível liberar conquista"
    );

  }

}




export async function getPatientAchievements(
  patientId:string
):Promise<PatientAchievement[]>{


  try{


    const response =
      await api.get<PatientAchievement[]>(
        `/patient-achievements/patient/${patientId}`
      );


    return response.data;



  }catch(error){


    throw new Error(
      "Não foi possível buscar conquistas do paciente"
    );


  }


}





export async function hasAchievement(
  patientId:string,
  achievementId:string
):Promise<boolean>{


  try{


    const response =
      await api.get<boolean>(
        "/patient-achievements/check",
        {
          params:{
            patientId,
            achievementId
          }
        }
      );


    return response.data;



  }catch(error){

    return false;

  }


}





export async function countPatientAchievements(
  patientId:string
):Promise<number>{


  const response =
    await api.get<number>(
      `/patient-achievements/patient/${patientId}/count`
    );


  return response.data;

}