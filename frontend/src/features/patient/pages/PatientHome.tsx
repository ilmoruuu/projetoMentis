import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getLoggedUser } from "../../../app/services/AuthStorage";

import {
  Smile,
  Calendar,
  ChevronRight,
  Star,
} from "lucide-react";

import { motion } from "motion/react";

import {
  getCurrentPatientId,
} from "../../../app/services/HumorHistoryService";

import api from "../../../app/services/api";


interface Patient {
  id: string;
  name: string;
  sobriety: string;
  lastCheckin: string | null;
}


interface Checkin {

  id: string;

  status: boolean;

  date: string;

}


interface Achievement {

  achievementId: string;

  acquisitionDate: string;

}


// =============================
// EMOJIS
// =============================


const moodEmojis = [
  "",
  "😔",
  "😟",
  "😐",
  "🙂",
  "😊",
];


const moodLabels = [
  "",
  "Muito Ruim",
  "Ruim",
  "Neutro",
  "Bom",
  "Ótimo",
];


const moodColors = [
  "",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#10B981",
];




// =============================
// PROGRESSO
// =============================


function CircularProgress({
  current,
  total
}: {
  current: number;
  total: number;
}) {


  const radius = 54;

  const circumference =
    2 * Math.PI * radius;


  const percent =
    total > 0
      ? Math.min(current / total, 1)
      : 0;



  return (

    <div className="relative w-36 h-36">


      <svg
        width="144"
        height="144"
        className="-rotate-90"
      >


        <circle

          cx="72"
          cy="72"
          r={radius}

          fill="none"

          stroke="#eee"

          strokeWidth="10"

        />



        <circle

          cx="72"
          cy="72"
          r={radius}

          fill="none"

          stroke="#F4A261"

          strokeWidth="10"

          strokeDasharray={
            `${circumference * percent} ${circumference}`
          }

          strokeLinecap="round"

        />


      </svg>



      <div className="
absolute inset-0
flex flex-col
items-center
justify-center
">


        <span className="
text-3xl
font-bold
text-[#7C3826]
">


          {current}

          <span className="
text-lg text-gray-400
">

            /{total}

          </span>


        </span>


        <span className="
text-xs text-gray-500
">

          dias

        </span>


      </div>


    </div>

  )

}





// =============================
// HOME
// =============================


export function PatientHome() {


  const navigate = useNavigate();



  const [patient, setPatient]
    =
    useState<Patient | null>(null);



  const [checkins, setCheckins]
    =
    useState<Checkin[]>([]);



  const [achievements, setAchievements]
    =
    useState<Achievement[]>([]);



  const [loading, setLoading]
    =
    useState(true);




  // =============================
  // BUSCAR DADOS
  // =============================


  useEffect(() => {


    async function load() {


      try {


        const id =
          getCurrentPatientId();



        const patientResponse =
          await api.get(`/patients/${id}`);



        const checkinResponse =
          await api.get(`/checkins/patient/${id}`);



        const achievementResponse =
          await api.get(
            `/patient-achievements/patient/${id}`
          );



        setPatient(
          patientResponse.data
        );



        setCheckins(
          checkinResponse.data
        );



        setAchievements(
          achievementResponse.data
        );



      } catch (error) {

        console.error(
          "Erro carregando paciente",
          error
        );


      }
      finally {

        setLoading(false);

      }



    }



    load();



  }, []);





  if (loading) {


    return (

      <div className="
flex
justify-center
items-center
h-screen
">

        Carregando...

      </div>


    )

  }



  if (!patient) {


    return (

      <div className="
p-6
text-center
">

        Paciente não encontrado

      </div>

    )

  }

 const user = getLoggedUser();

const name = user?.name ?? "Paciente";


const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("");

    console.log(getLoggedUser());

const firstName = name.split(" ")[0];

  const totalDays =
    Number(patient.sobriety ?? 0);



  const lastCheckin =
    checkins.length
      ?
      checkins[checkins.length - 1]
      : null;



  return (


    <div className="
px-5
py-6
space-y-6
">
      {/* CHECKIN */}


      <div className="
bg-white

rounded-3xl

p-5

shadow-sm
">


        <div className="
flex
items-center
gap-3
mb-4
">


          <Smile
            className="
text-[#F4A261]
"
          />


          <h2 className="
font-bold
text-[#7C3826]
">

            Humor de hoje

          </h2>


        </div>



        {


          lastCheckin

            ?


            <div className="
text-center
">

              <p className="text-5xl">

                😊

              </p>


              <p className="
text-gray-500
mt-2
">

                Check-in realizado

              </p>


            </div>



            :


            <button

              onClick={() => navigate("/patient/checkin")}

              className="
w-full

bg-[#F4A261]

text-white

py-4

rounded-2xl

font-bold
"

            >

              Fazer Check-in

            </button>


        }




      </div>








      {/* SOBRIEDADE */}


      <div className="
bg-white

rounded-3xl

p-5

flex

items-center

justify-between

shadow-sm
">


        <div>

          <h2 className="
font-bold
text-[#7C3826]
">

            Minha jornada

          </h2>


          <p className="
text-sm
text-gray-500
">

            Dias de evolução

          </p>


        </div>



        <CircularProgress

          current={totalDays}

          total={90}

        />


      </div>










      {/* CONQUISTAS */}


      <div className="
bg-white

rounded-3xl

p-5

shadow-sm
">


        <div className="
flex
justify-between

items-center
mb-4
">


          <h2 className="
font-bold

text-[#7C3826]
">

            Conquistas

          </h2>



          <button

            onClick={() => navigate("/patient/sobriety")}

          >

            <ChevronRight />

          </button>



        </div>



        <div className="
flex
items-center
gap-3
">


          <div className="
bg-yellow-100
rounded-full

p-3
">

            <Star
              className="
text-yellow-500
"
            />


          </div>



          <div>


            <p className="
font-bold
">

              {achievements.length}

            </p>


            <p className="
text-sm
text-gray-500
">

              conquistas desbloqueadas

            </p>


          </div>


        </div>


      </div>







      {/* ÚLTIMO CHECKIN */}


      <div className="
bg-orange-50

rounded-3xl

p-5
">


        <div className="
flex
gap-3
items-center
">


          <Calendar
            className="
text-[#F4A261]
"
          />


          <div>


            <p className="
text-sm
text-gray-500
">

              Último check-in

            </p>


            <p className="
font-bold
text-[#7C3826]
">

              {
                lastCheckin
                  ?
                  new Date(lastCheckin.date)
                    .toLocaleDateString()
                  :
                  "Nenhum"
              }


            </p>


          </div>


        </div>


      </div>




    </div>


  )

}