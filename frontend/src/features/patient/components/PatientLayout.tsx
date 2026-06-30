import { Outlet, NavLink, useNavigate } from "react-router";
import { Home, Smile, Trophy, LogOut, ShieldCheck } from "lucide-react";

import logo from "../../../assets/logo-paciente.png";
import { getLoggedUser } from "../../../app/services/AuthStorage";


const navItems = [
  { to: "/patient", end: true, icon: Home, label: "Início" },
  { to: "/patient/checkin", end: false, icon: Smile, label: "Humor" },
  { to: "/patient/sobriety", end: false, icon: Trophy, label: "Conquistas" },
];


export function PatientLayout() {

  const navigate = useNavigate();


  // Usuário salvo após o login
  const user = getLoggedUser();


  const name = user?.name ?? "Paciente";


  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("");


  const firstName = name.split(" ")[0];



  return (

    <div className="min-h-screen bg-[#FFF8F0] md:flex">


      {/* Desktop sidebar */}

      <aside
        className="
        hidden md:flex 
        md:flex-col 
        md:w-64 
        md:h-screen 
        md:sticky 
        md:top-0 
        bg-white 
        border-r 
        border-gray-100 
        shadow-sm
        "
      >


        <div
          className="
          px-4 
          py-6 
          border-b 
          border-gray-100 
          flex 
          items-center 
          justify-center
          "
        >

          <img
            src={logo}
            alt="Projeto Mentis"
            className="h-24 w-auto object-contain"
          />

        </div>



        <nav className="flex-1 px-3 py-4 space-y-1">


          {navItems.map(({ to, end, icon: Icon, label }) => (


            <NavLink

              key={to}

              to={to}

              end={end}


              className={({ isActive }) =>

                `
                flex 
                items-center 
                gap-3 
                px-4 
                py-3 
                rounded-xl 
                transition-colors

                ${
                  isActive

                  ? 
                  "bg-orange-50 text-[#F4A261] font-semibold"

                  :

                  "text-gray-500 hover:bg-gray-50"

                }
                `

              }

            >

              <Icon className="w-5 h-5" />

              <span className="text-sm">
                {label}
              </span>


            </NavLink>


          ))}


        </nav>




        <div
          className="
          px-4 
          py-4 
          border-t 
          border-gray-100
          "
        >

          <button

            onClick={() => navigate("/")}

            className="
            flex 
            items-center 
            gap-2 
            text-gray-400 
            hover:text-gray-600 
            transition-colors 
            text-sm
            "

          >

            <LogOut className="w-4 h-4" />

            Sair


          </button>


        </div>


      </aside>






      {/* Conteúdo principal */}


      <div
        className="
        flex-1 
        flex 
        flex-col 
        max-w-md 
        mx-auto 
        md:max-w-none 
        md:mx-0 
        w-full 
        relative
        "
      >



        {/* Barra mobile */}

        <div className="md:hidden bg-[#F4A261] h-1 w-full" />




        {/* Header mobile */}


        <header
          className="
          md:hidden 
          bg-white 
          px-6 
          py-4 
          flex 
          items-center 
          justify-between 
          shadow-sm 
          sticky 
          top-0 
          z-10
          "
        >


          <img

            src={logo}

            alt="Projeto Mentis"

            className="h-9 w-auto object-contain"

          />



          <div className="flex items-center gap-2">


            <div
              className="
              flex 
              items-center 
              gap-1 
              bg-green-50 
              rounded-full 
              px-2.5 
              py-1
              "
            >


              <ShieldCheck
                className="
                w-3 
                h-3 
                text-green-500
                "
              />


              <span className="text-green-600 text-xs">

                Seguro

              </span>


            </div>




            <button

              onClick={() => navigate("/")}

              className="
              p-2 
              rounded-xl 
              text-gray-400 
              hover:bg-gray-100 
              transition-colors
              "

            >

              <LogOut className="w-4 h-4"/>


            </button>


          </div>



        </header>





        {/* Saudação */}


        <div
          className="
          bg-gradient-to-r 
          from-[#F4A261] 
          to-[#E9C46A]

          px-6 
          py-3 
          md:py-4 

          flex 
          items-center 
          gap-3
          "
        >



          <div
            className="
            w-8 
            h-8 
            md:w-10 
            md:h-10 

            rounded-full 

            bg-white/30 

            flex 
            items-center 
            justify-center 

            text-white 

            font-bold 

            text-sm
            "
          >

            {initials}


          </div>



          <p className="text-white text-sm md:text-base">


            Olá,

            <span className="font-bold ml-1">

              {firstName}

            </span>

            !


          </p>



        </div>






        {/* Página */}

        <main
          className="
          flex-1 
          overflow-y-auto 
          pb-24 
          md:pb-8
          "
        >

          <div className="max-w-4xl mx-auto w-full">

            <Outlet />

          </div>


        </main>







        {/* Navegação mobile */}


        <nav
          className="
          md:hidden 
          fixed 
          bottom-0 
          left-1/2 
          -translate-x-1/2 

          w-full 
          max-w-md 

          bg-white 

          border-t 

          border-gray-100 

          shadow-2xl 

          z-20
          "
        >


          <div
            className="
            flex 
            items-center 
            justify-around 
            px-4 
            py-3
            "
          >



            {navItems.map(({to,end,icon:Icon,label}) => (


              <NavLink

                key={to}

                to={to}

                end={end}


                className={({isActive}) =>

                `
                flex 
                flex-col 
                items-center 
                gap-1 
                px-4 
                py-1 
                rounded-xl 

                transition-all

                ${
                  isActive

                  ?

                  "text-[#F4A261]"

                  :

                  "text-gray-400"

                }

                `

                }

              >


                <Icon className="w-5 h-5"/>


                <span className="text-xs">

                  {label}

                </span>



              </NavLink>


            ))}



          </div>


        </nav>




      </div>



    </div>


  );

}