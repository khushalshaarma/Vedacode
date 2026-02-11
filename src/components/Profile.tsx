import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggle = () => setOpen((v) => !v);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div className="fixed top-2 right-3 z-50">
      {/* Hamburger/X button */}
      <button
        ref={btnRef}
        onClick={toggle}
        title="Profile Menu"
        className="relative flex flex-col justify-between w-10 h-8 p-2 rounded-xl
                   bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500
                   shadow-md hover:scale-110 hover:brightness-110 transition"
      >
        {open ? (
          <>
            {/* Top line */}
            <motion.span
              initial={false}
              animate={{ rotate: 45, y: 6 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            {/* Middle line */}
            <motion.span
              initial={false}
              animate={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            {/* Bottom line */}
            <motion.span
              initial={false}
              animate={{ rotate: -45, y: -6 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="block h-0.5 w-full bg-white rounded"
            />
          </>
        ) : (
          <>
            {/* Top line */}
            <motion.span
              initial={false}
              animate={{ rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            {/* Middle line */}
            <motion.span
              initial={false}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            {/* Bottom line */}
            <motion.span
              initial={false}
              animate={{ rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="block h-0.5 w-full bg-white rounded"
            />
          </>
        )}
      </button>

      {/* Glass dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-1 w-44 rounded-xl border border-white/20
                       bg-black/70 backdrop-blur-xl shadow-lg p-2"
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg text-white font-medium
                         hover:bg-white/10 transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
