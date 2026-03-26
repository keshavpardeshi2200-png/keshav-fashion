import { Link } from "@tanstack/react-router";
import { Heart, Lightbulb } from "lucide-react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="gradient-cta-band text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg">Keshav Fashion</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Your all-in-one creator &amp; entrepreneur toolkit. Ideas, tools,
              and community to build your dreams.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiX size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/90 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/creative-ideas"
                  className="hover:text-white transition-colors"
                >
                  Creative Ideas Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/management-tips"
                  className="hover:text-white transition-colors"
                >
                  Management Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/startup-guidance"
                  className="hover:text-white transition-colors"
                >
                  Startup Guidance
                </Link>
              </li>
              <li>
                <Link
                  to="/personal-growth"
                  className="hover:text-white transition-colors"
                >
                  Personal Growth
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/90 uppercase tracking-wider">
              Tools
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/tools"
                  className="hover:text-white transition-colors"
                >
                  Idea Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="hover:text-white transition-colors"
                >
                  Goal Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="hover:text-white transition-colors"
                >
                  Daily Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="hover:text-white transition-colors"
                >
                  Content Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/90 uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/community"
                  className="hover:text-white transition-colors"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors"
                >
                  Your Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>&copy; {year} Keshav Fashion. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
