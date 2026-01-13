"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  Crown,
  Menu,
  X,
  Sparkles,
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth/AuthProvider";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

function NavLink({ href, icon, label, isActive = false, isCollapsed = false }: NavLinkProps) {
  return (
    <Link href={href} title={isCollapsed ? label : undefined}>
      <motion.div
        className={`group relative flex items-center rounded-xl py-3 transition-all ${
          isCollapsed ? "justify-center px-2" : "gap-3 px-4"
        } ${
          isActive
            ? "bg-gradient-to-r from-[#bd24df]/20 to-[#ff2b8f]/20 text-white"
            : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
        }`}
        whileHover={isCollapsed ? {} : { x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 h-8 w-1 rounded-r-full bg-gradient-to-b from-[#bd24df] to-[#ff2b8f]"
          />
        )}

        <span className={isActive ? "text-purple-400" : ""}>{icon}</span>
        {!isCollapsed && <span className="font-medium">{label}</span>}
      </motion.div>
    </Link>
  );
}

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sidebarContent = (
    <>
      {/* Header with Logo and Toggle */}
      <div className="relative mb-8 flex items-center px-4">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
          <Logo className="h-10 w-10 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
              MemoFlow
            </span>
          )}
        </div>
        
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3">
        <NavLink
          href="/dashboard"
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Tableau de bord"
          isActive={pathname === "/dashboard"}
          isCollapsed={isCollapsed}
        />
        <NavLink
          href="/dashboard/notes"
          icon={<FolderOpen className="h-5 w-5" />}
          label="Mes Notes"
          isActive={pathname?.startsWith("/dashboard/notes")}
          isCollapsed={isCollapsed}
        />
        <NavLink
          href="/dashboard/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Réglages"
          isActive={pathname === "/dashboard/settings"}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* CTA Button - Passer Premium */}
      <div className={`px-3 pb-6 ${isCollapsed ? "px-2" : ""}`}>
        <motion.button
          className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#bd24df] to-[#ff2b8f] text-white shadow-lg transition-all ${
            isCollapsed ? "p-3" : "p-4"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            boxShadow: "0 8px 32px rgba(189, 36, 223, 0.3), 0 0 64px rgba(255, 43, 143, 0.2)",
          }}
          title={isCollapsed ? "Passer Premium" : undefined}
        >
          <div className={`relative z-10 flex items-center ${isCollapsed ? "justify-center" : "justify-center gap-2"}`}>
            <Crown className="h-5 w-5" />
            {!isCollapsed && <span className="font-semibold">Passer Premium</span>}
          </div>
          
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.button>
      </div>

      {/* User Profile Mini-Card */}
      <div className="border-t border-zinc-800/50 p-4">
        <div className="space-y-3">
          <div className={`flex items-center rounded-xl bg-zinc-900/50 p-3 backdrop-blur-xl ${isCollapsed ? "justify-center" : "gap-3"}`}>
            {/* Avatar */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#bd24df] to-[#ff2b8f]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            
            {/* User Info */}
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">
                  {user?.email?.split('@')[0] || "User"}
                </p>
                <p className="truncate text-xs text-zinc-400">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <motion.button
            onClick={handleSignOut}
            className={`flex w-full items-center justify-center rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-sm font-medium text-zinc-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 ${
              isCollapsed ? "p-2" : "gap-2 px-4 py-2"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={isCollapsed ? "Déconnexion" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Déconnexion"}
          </motion.button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-white backdrop-blur-xl lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-full flex-col border-r border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:flex ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-zinc-800/50 bg-[#0a0a0a] lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

