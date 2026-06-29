import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Smile,
  Calendar,
  TrendingUp,
  ChevronRight,
  Heart,
  Star,
} from "lucide-react";

import { currentPatient } from "../../../shared/data/mockData";
import { getAchievements, Achievement } from "../../../app/services/AchievementService";


const moodEmojis = ["", "😔", "😟", "😐", "🙂", "😊"];

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


function CircularProgress({
  current,
  total,
  color,
}: {
  current: number;
  total: number;
  color: string;
}) {


  const r = 54;

  const circ = 2 * Math.PI * r;

  const pct =
    total > 0
      ? Math.min(current / total, 1)
      : 0;


  const dash = circ * pct;



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
          r={r}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="10"
        />


        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />

      </svg>


      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-3xl font-bold text-[#7C3826]">

          {current}

          <span className="text-lg text-gray-400">
            /{total}
          </span>

        </span>


        <span className="text-xs text-gray-500">
          dias
        </span>

      </div>

    </div>

  );

}



function getMonthStats(dates: string[]) {


  if (dates.length === 0) {

    const now = new Date();


    return {

      year: now.getFullYear(),

      month: now.getMonth(),

      checkedIn: 0,

      daysInMonth:
        new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate()

    };

  }



  const sorted = [...dates].sort();


  const ref =
    new Date(
      sorted[sorted.length - 1] + "T12:00:00"
    );


  const year = ref.getFullYear();

  const month = ref.getMonth();



  const checkedIn =
    dates.filter(d => {

      const dt =
        new Date(d + "T12:00:00");


      return (

        dt.getFullYear() === year &&
        dt.getMonth() === month

      );


    }).length;



  return {

    year,

    month,

    checkedIn,

    daysInMonth:
      new Date(
        year,
        month + 1,
        0
      ).getDate()

  };


}




const monthNames = [

  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"

];



export function PatientHome() {


  const navigate = useNavigate();



  const [achievements, setAchievements]
    =
    useState<Achievement[]>([]);



  useEffect(() => {


    async function loadAchievements() {


      try {


        const data =
          await getAchievements();


        setAchievements(data);


      } catch (error) {

        console.error(error);

      }


    }



    loadAchievements();


  }, []);





  const today =
    new Date()
      .toISOString()
      .split("T")[0];



  const todayMood =
    currentPatient.moodHistory
      .find(
        (m) => m.date === today
      );



  const monthStats =
    getMonthStats(
      currentPatient.moodHistory.map(
        m => m.date
      )
    );



  const streak =
    currentPatient
      .moodHistory
      .filter(
        m => m.mood >= 3
      )
      .length;



  const earnedAchievements =
    achievements.filter(

      achievement =>
        achievement.days <=
        currentPatient.sobrietyDays

    );





  return (

    <div className="px-4 py-5 space-y-4">



      {todayMood ? (


        <motion.div

          className="
bg-white rounded-2xl p-5
shadow-sm border border-orange-100
"

        >

          <p className="
text-xs font-semibold
text-gray-400 uppercase mb-3
">

            Seu humor de hoje

          </p>



          <div className="flex items-center gap-4">

            <span className="text-5xl">

              {moodEmojis[todayMood.mood]}

            </span>



            <div>

              <p
                className="font-bold text-lg"
                style={{
                  color: moodColors[todayMood.mood]
                }}
              >

                {moodLabels[todayMood.mood]}

              </p>


            </div>


          </div>


        </motion.div>


      )

        : (


          <motion.button

            onClick={() => navigate("/patient/checkin")}

            className="
w-full bg-gradient-to-r
from-[#F4A261]
to-[#E9C46A]
rounded-2xl p-5
text-left shadow-lg
"

          >


            <div className="
flex items-center justify-between
">


              <div>

                <p className="
text-white font-bold
">

                  Como você está hoje? 💭

                </p>


                <p className="
text-white/80 text-sm
">

                  Registre seu humor diário

                </p>


              </div>



              <Smile className="
w-7 h-7 text-white
"/>



            </div>


          </motion.button>


        )}





      <div className="
bg-white rounded-2xl p-5
shadow-sm border border-gray-100
">


        <div className="
flex justify-between mb-4
">


          <p className="
text-xs font-semibold
text-gray-400 uppercase
">

            Check-ins de {monthNames[monthStats.month]}

          </p>



          <button

            onClick={() => navigate("/patient/sobriety")}

            className="
text-xs text-[#F4A261]
flex items-center
"

          >

            Ver calendário

            <ChevronRight
              className="w-3 h-3"
            />

          </button>


        </div>




        <div className="flex items-center">


          <CircularProgress

            current={monthStats.checkedIn}

            total={monthStats.daysInMonth}

            color="#F4A261"

          />



          <div className="pl-5">


            <p className="
text-2xl font-bold
text-[#7C3826]
">

              {monthStats.checkedIn}

              <span className="
text-gray-400 text-base
">

                / {monthStats.daysInMonth}

              </span>


            </p>



            <p className="
text-sm text-gray-500
">

              Dias com check-in

            </p>



          </div>


        </div>






        {
          earnedAchievements.length > 0 &&


          <div className="
flex gap-2 mt-4 pt-4
border-t
">


            <p className="text-xs text-gray-400">

              Conquistados:

            </p>



            <div className="flex gap-1">


              {
                earnedAchievements
                  .slice(-4)
                  .map(a => (


                    <span

                      key={a.id}

                      title={a.description}

                      className="text-lg"

                    >

                      {a.icon ?? "🏆"}

                    </span>


                  ))

              }


            </div>



          </div>

        }



      </div>






      <div className="grid grid-cols-2 gap-3">


        <div className="
bg-white rounded-2xl p-4
shadow-sm
">


          <Calendar
            className="w-4 h-4"
          />


          <p className="text-xs text-gray-400">

            Em tratamento

          </p>


          <p className="text-xl font-bold">

            {

              Math.floor(

                (
                  new Date().getTime()
                  -
                  new Date(
                    currentPatient.startDate
                  ).getTime()

                )

                /
                (1000 * 60 * 60 * 24)

              )

            }

            dias

          </p>


        </div>






        <div className="
bg-white rounded-2xl p-4
shadow-sm
">


          <Star className="w-4 h-4" />


          <p className="text-xs text-gray-400">

            Dias positivos

          </p>



          <p className="text-xl font-bold">

            {streak}

            <span className="text-sm text-gray-400">

              /
              {currentPatient.moodHistory.length}

            </span>


          </p>



        </div>



      </div>





    </div>


  );


}