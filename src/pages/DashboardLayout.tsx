import React from "react";
import {
  LayoutDashboard,
  User,
  University,
  Users,
  BookOpen,
  Settings,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { to: "/dashboard/school", label: "Student", icon: User },
  { to: "/dashboard/college", label: "College", icon: University },
  { to: "/dashboard/volunteer", label: "Volunteer", icon: Users },
  { to: "/dashboard/knowledge", label: "Knowledge Hub", icon: BookOpen },
  { to: "/dashboard/admin", label: "Admin Panel", icon: Settings },
];

const pageVariants = {
  initial: { y: "10%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-5%", opacity: 0 },
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" /> Dashboard
        </h1>
        <nav className="space-y-3">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md w-full text-left transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardLayout;
