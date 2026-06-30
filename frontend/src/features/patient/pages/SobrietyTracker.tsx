import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  Star,
  X,
} from "lucide-react";


import {
  getCurrentPatientId,
  getHumorHistory,
  type MoodEntry,
} from "../../../app/services/HumorHistoryService";


import {
  getPatientAchievements,
  type PatientAchievementResponse,
} from "../../../app/services/PatientAchievementService";



// ==========================
// MARCOS FIXOS
// ==========================

const milestones = [

{
days:7,
title:"Primeira semana",
icon:"🌱"
},

{
days:15,
title:"Duas semanas",
icon:"⭐"
},

{
days:30,
title:"Um mês",
icon:"🏆"
},

{
days:60,
title:"Dois meses",
icon:"🔥"
},

{
days:90,
title:"Três meses",
icon:"💎"
},

{
days:180,
title:"Seis meses",
icon:"👑"
},

{
days:365,
title:"Um ano",
icon:"🎖️"
}

];



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
"Dezembro",
];


const weekdayLabels=[
"D",
"S",
"T",
"Q",
"Q",
"S",
"S"
];



const motivationalQuotes=[

"Cada dia sóbrio é uma vitória.",

"O caminho da recuperação é feito de passos.",

"Continue evoluindo, você está indo bem."

];




// ==========================
// BADGE
// ==========================


function MilestoneBadge({

milestone,

earned,

current,

daysLeft


}:{

milestone:any;

earned:boolean;

current:boolean;

daysLeft?:number;

}){


return(

<motion.div

initial={{
opacity:0,
scale:0.8
}}

animate={{
opacity:1,
scale:1
}}


className={`

rounded-2xl
p-4
border-2
flex
flex-col
items-center
gap-2


${

current

?

"border-[#F4A261] bg-orange-50 shadow-lg"

:

earned

?

"border-green-200 bg-green-50"

:

"border-gray-100 bg-gray-50 opacity-60"

}


`}


>


<div className="relative">

<span

className={`text-3xl ${
earned ? "" : "grayscale opacity-50"
}`}

>

{milestone.icon}

</span>



{

earned &&

<div

className="
absolute
-top-1
-right-1
bg-green-500
rounded-full
w-4
h-4
flex
items-center
justify-center
"

>

<span className="text-white text-xs">

✓

</span>

</div>


}


</div>



<p className="text-xs font-bold text-center">

{milestone.title}

</p>


<p className={`
text-xs
${earned?"text-green-500":"text-gray-400"}
`}>

{milestone.days} dias

</p>



{

current &&

<p className="text-xs text-orange-500">

Faltam {daysLeft}d

</p>

}



{

earned &&

<p className="text-xs text-green-500 font-semibold">

Conquistado 🎉

</p>

}



</motion.div>


)

}




// ==========================
// CALENDARIO
// ==========================


function MonthCalendar({

year,

month,

markedDates,

onPrev,

onNext,

onSelectDay

}:any){


const first =
new Date(year,month,1).getDay();


const total =
new Date(year,month+1,0).getDate();


const cells:any[]=[];


for(let i=0;i<first;i++)
cells.push(null);


for(let i=1;i<=total;i++)
cells.push(i);



return(

<div className="
bg-white
rounded-3xl
p-5
shadow-sm
">


<div className="
flex
justify-between
mb-5
">

<button onClick={onPrev}>
<ChevronLeft/>
</button>


<h2 className="font-bold text-[#7C3826]">

{monthNames[month]} {year}

</h2>


<button onClick={onNext}>
<ChevronRight/>
</button>


</div>



<div className="
grid grid-cols-7 gap-2
">


{
cells.map((day,i)=>{


if(!day)
return <div key={i}/>;


const date=

`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;


const marked =
markedDates.has(date);



return(

<button

key={i}

disabled={!marked}

onClick={()=>marked && onSelectDay(date)}

className={`

aspect-square
rounded-full


${

marked

?

"bg-[#F4A261] text-white font-bold"

:

"border text-gray-400"

}

`}

>

{day}

</button>

)


})

}


</div>


</div>


)

}



// ==========================
// PAGE
// ==========================


export function SobrietyTracker(){


const [moodHistory,setMoodHistory]
=
useState<MoodEntry[]>([]);



const [achievements,setAchievements]
=
useState<PatientAchievementResponse[]>([]);



useEffect(()=>{


async function load(){


const patientId =
await getCurrentPatientId();


const history =
await getHumorHistory(patientId);



const ach =
await getPatientAchievements(patientId);



setMoodHistory(history);

setAchievements(ach);


}


load();


},[]);




const markedDates =
new Set(
moodHistory.map(m=>m.date)
);




const days = (() => {

  if (moodHistory.length === 0) {
    return 0;
  }


  const firstCheckin =
    new Date(
      moodHistory
        .sort(
          (a,b)=>
          new Date(a.date).getTime()
          -
          new Date(b.date).getTime()
        )[0]
        .date
    );


  const today = new Date();


  const diff =
    today.getTime()
    -
    firstCheckin.getTime();


  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  ) + 1;


})();




const earnedIds =

achievements.map(
a=>a.achievement.days
);



const next =

milestones.find(
m=>m.days > days
);




return(

<div className="
px-4
py-5
space-y-5
">



<MonthCalendar


year={new Date().getFullYear()}

month={new Date().getMonth()}

markedDates={markedDates}

onPrev={()=>{}}

onNext={()=>{}}

onSelectDay={()=>{}}


/>





<div className="
bg-gradient-to-r
from-[#2A9D8F]
to-[#1B82BF]
rounded-2xl
p-5
text-white
">

<Star/>

{motivationalQuotes[0]}

</div>





<div className="
grid grid-cols-3 gap-3
">


<div className="bg-white rounded-xl p-3 text-center">

<Star/>

<p className="font-bold">

{moodHistory.length}

</p>

<p className="text-xs">

Check-ins

</p>


</div>


<div className="bg-white rounded-xl p-3 text-center">

<Zap/>

<p className="font-bold">

{achievements.length}

</p>

<p className="text-xs">

Conquistas

</p>

</div>



<div className="bg-white rounded-xl p-3 text-center">

<Trophy/>

<p className="font-bold">

{days}

</p>

<p className="text-xs">

Dias

</p>


</div>


</div>





<div>


<h3 className="
font-bold
text-[#7C3826]
mb-3
">

Marcos de Conquista

</h3>



<div className="
grid grid-cols-3 md:grid-cols-5 gap-3
">


{

milestones.map(m=>{


const earned =
earnedIds.includes(m.days);



return(

<MilestoneBadge

key={m.days}

milestone={m}

earned={earned}

current={
next?.days===m.days
}

daysLeft={
next
?
next.days-days
:
undefined
}


/>

)


})


}


</div>


</div>



</div>


)

}