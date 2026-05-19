import { Outlet, NavLink, useNavigate } from "react-router";
import { Home, Smile, Trophy, LogOut, Heart, ShieldCheck } from "lucide-react";
import { currentPatient } from "../../data/mockData";

export function PatientLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-md mx-auto relative">
      {/* Mobile status bar simulation */}
      <div className="bg-[#F4A261] h-1 w-full" />

      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#F4A261] to-[#E76F51] rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <p className="text-[#7C3826] font-bold text-sm">CAPS AD Connect</p>
            <p className="text-orange-400 text-xs">
              Sua Jornada de Recuperação
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-50 rounded-full px-2.5 py-1">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span className="text-green-600 text-xs">Seguro</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Patient greeting bar */}
      <div className="bg-gradient-to-r from-[#F4A261] to-[#E9C46A] px-6 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm">
          {currentPatient.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")}
        </div>
        <p className="text-white text-sm">
          Olá,{" "}
          <span className="font-bold">{currentPatient.name.split(" ")[0]}</span>
          ! 👋
        </p>
        <span className="ml-auto text-white/80 text-xs">
          {currentPatient.sobrietyDays} dias de conquista
        </span>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-2xl z-20">
        <div className="flex items-center justify-around px-4 py-3">
          <NavLink
            to="/patient"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                isActive ? "text-[#F4A261]" : "text-gray-400"
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </NavLink>
          <NavLink
            to="/patient/checkin"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                isActive ? "text-[#F4A261]" : "text-gray-400"
              }`
            }
          >
            <Smile className="w-5 h-5" />
            <span className="text-xs">Humor</span>
          </NavLink>
          <NavLink
            to="/patient/sobriety"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                isActive ? "text-[#F4A261]" : "text-gray-400"
              }`
            }
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Conquistas</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
