import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link } from "@tanstack/react-router";
import { Lightbulb, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Creative Hub", to: "/creative-ideas" },
  { label: "Management", to: "/management-tips" },
  { label: "Startup Guide", to: "/startup-guidance" },
  { label: "Tools", to: "/tools" },
  { label: "Community", to: "/community" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  return (
    <header className="sticky top-0 z-50 gradient-cta-band shadow-lg">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            Keshav Fashion
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 gap-1.5"
                  data-ocid="nav.link"
                >
                  <User className="w-4 h-4" /> Profile
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() => clear()}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-full"
                data-ocid="nav.secondary_button"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                onClick={() => login()}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-full"
                data-ocid="nav.secondary_button"
              >
                Log In
              </Button>
              <Button
                size="sm"
                onClick={() => login()}
                style={{ background: "oklch(var(--cta))", color: "#fff" }}
                className="rounded-full font-semibold hover:opacity-90"
                data-ocid="nav.primary_button"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden gradient-cta-band border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-white/10">
                {isLoggedIn ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                    className="bg-white/15 text-white rounded-full flex-1"
                    data-ocid="nav.secondary_button"
                  >
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      className="bg-white/15 text-white rounded-full flex-1"
                      data-ocid="nav.secondary_button"
                    >
                      Log In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      style={{ background: "oklch(var(--cta))", color: "#fff" }}
                      className="rounded-full flex-1"
                      data-ocid="nav.primary_button"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
