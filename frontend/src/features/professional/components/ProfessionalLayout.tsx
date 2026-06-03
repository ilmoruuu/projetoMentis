import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Heart,
  ShieldCheck,
  Bell,
} from "lucide-react";
import { currentProfessional } from "../../../shared/data/mockData";

export function ProfessionalLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F4C75] flex flex-col shadow-xl">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#1B82BF]" fill="#1B82BF" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">CAPS AD Connect</p>
              <p className="text-blue-300 text-xs">Área Profissional</p>
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A9D8F] to-[#1B82BF] flex items-center justify-center text-white font-bold text-sm">
              AL
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                {currentProfessional.name}
              </p>
              <p className="text-blue-300 text-xs">
                CRP {currentProfessional.crp}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink
            to="/professional"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/8 hover:text-white"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/professional/raas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/8 hover:text-white"
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Formulário RAAS</span>
          </NavLink>
        </nav>

        {/* Trust Badge */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 bg-green-900/30 rounded-lg px-3 py-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-xs">SUS Integrado · LGPD</span>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-300 hover:bg-white/8 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-[#0F4C75] font-semibold text-sm">
              {currentProfessional.establishment}
            </p>
            <p className="text-gray-400 text-xs">
              CNES: {currentProfessional.cnes} · {currentProfessional.city}/
              {currentProfessional.state}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 bg-[#F0F7FF] rounded-xl flex items-center justify-center hover:bg-[#E0EFFF] transition-colors">
              <Bell className="w-5 h-5 text-[#1B82BF]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="text-right">
              <p className="text-gray-700 text-sm font-medium">
                Seg, 20 de Abril
              </p>
              <p className="text-gray-400 text-xs">2026</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
