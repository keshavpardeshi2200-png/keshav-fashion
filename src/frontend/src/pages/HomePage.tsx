import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  ChevronRight,
  Lightbulb,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Lightbulb,
    label: "Creative Ideas",
    sub: "Digital & physical products",
    color: "oklch(var(--tile-blue))",
    to: "/creative-ideas",
  },
  {
    icon: BarChart2,
    label: "Management Tips",
    sub: "Time, team & projects",
    color: "oklch(var(--tile-teal))",
    to: "/management-tips",
  },
  {
    icon: Rocket,
    label: "Startup Guidance",
    sub: "Launch & grow your business",
    color: "oklch(var(--tile-orange))",
    to: "/startup-guidance",
  },
  {
    icon: TrendingUp,
    label: "Personal Growth",
    sub: "Habits & mindset",
    color: "oklch(var(--tile-purple))",
    to: "/personal-growth",
  },
  {
    icon: Users,
    label: "Community",
    sub: "Connect & collaborate",
    color: "oklch(var(--tile-green))",
    to: "/community",
  },
];

const tools = [
  {
    icon: Zap,
    title: "Idea Generator",
    desc: "Stuck? Generate a random business idea in seconds. Powered by a growing community-curated database.",
    cta: "Try Now",
  },
  {
    icon: Target,
    title: "Goal Tracker",
    desc: "Set ambitious goals and track your progress with a simple slider. Visualize momentum and stay accountable.",
    cta: "Try Now",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    desc: "Plan your content strategy with a weekly visual grid. Never run out of things to publish.",
    cta: "Try Now",
  },
];

const testimonials = [
  {
    quote:
      "Keshav Fashion helped me launch my first digital product in just 2 weeks. The startup guidance is gold!",
    name: "Priya Sharma",
    role: "Course Creator",
    avatar: "PS",
  },
  {
    quote:
      "The Goal Tracker keeps me accountable every single day. My productivity has tripled since I started using it.",
    name: "Rahul Mehta",
    role: "Indie Founder",
    avatar: "RM",
  },
  {
    quote:
      "I discovered my niche through the Idea Generator. Now I run a thriving newsletter with 5,000 subscribers!",
    name: "Anita Patel",
    role: "Newsletter Writer",
    avatar: "AP",
  },
];

const resources = [
  {
    title: "How to Validate Your Business Idea in 7 Days",
    date: "March 20, 2026",
    category: "Startup Guidance",
    categoryTo: "/startup-guidance",
    bg: "from-blue-900 to-teal-700",
  },
  {
    title: "The Morning Routine That 10x'd My Output",
    date: "March 15, 2026",
    category: "Personal Growth",
    categoryTo: "/personal-growth",
    bg: "from-purple-900 to-indigo-700",
  },
  {
    title: "5 Digital Products You Can Launch This Weekend",
    date: "March 10, 2026",
    category: "Creative Ideas",
    categoryTo: "/creative-ideas",
    bg: "from-orange-800 to-amber-600",
  },
];

export default function HomePage() {
  const { login } = useInternetIdentity();

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[90vh]">
          <div className="gradient-hero flex flex-col justify-center px-8 md:px-16 py-20 relative overflow-hidden">
            <img
              src="/assets/generated/hero-doodles-transparent.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                Creator + Entrepreneur Toolkit
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Build. Grow.
                <br />
                <span className="text-gradient">Succeed Together.</span>
              </h1>
              <p className="text-white/80 text-lg max-w-lg mb-8 leading-relaxed">
                Keshav Fashion gives creators and entrepreneurs the ideas,
                tools, and community to turn their vision into a thriving
                business.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => login()}
                  style={{ background: "oklch(var(--cta))", color: "#fff" }}
                  className="rounded-full font-bold text-base px-8 hover:opacity-90"
                  data-ocid="hero.primary_button"
                >
                  Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full font-semibold text-base px-8 bg-transparent border-white/40 text-white hover:bg-white/10"
                  data-ocid="hero.secondary_button"
                >
                  <Link to="/community">Explore Community</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src="/assets/generated/hero-entrepreneur.dim_800x600.jpg"
              alt="Entrepreneur collaborating"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3"
              style={{ color: "oklch(var(--navy))" }}
            >
              Core Pillars
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to build, manage, and grow — all in one place.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link to={p.to} data-ocid="home.link">
                  <div
                    className="rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
                    style={{ background: p.color }}
                  >
                    <p.icon className="w-8 h-8 text-white" />
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">
                        {p.label}
                      </div>
                      <div className="text-white/75 text-xs mt-0.5">
                        {p.sub}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-20" style={{ background: "oklch(var(--cream))" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3"
              style={{ color: "oklch(var(--navy))" }}
            >
              Unlock Your Potential
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful tools designed to accelerate your progress every single
              day.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
                  <div className="h-28 gradient-hero flex items-center justify-center">
                    <tool.icon className="w-12 h-12 text-white/80" />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: "oklch(var(--navy))" }}
                    >
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-4">
                      {tool.desc}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full self-start"
                      style={{ background: "oklch(var(--cta))", color: "#fff" }}
                      data-ocid="home.primary_button"
                    >
                      <Link to="/tools">
                        {tool.cta} <ChevronRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: "oklch(0.93 0.025 35)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3"
              style={{ color: "oklch(var(--navy))" }}
            >
              What Our Community Says
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl shadow-card p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic text-sm leading-relaxed flex-1">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "oklch(var(--navy))" }}
                      >
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Resources */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3"
              style={{ color: "oklch(var(--navy))" }}
            >
              Latest Resources
            </h2>
            <p className="text-muted-foreground">
              Fresh ideas and guides to keep you moving forward.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {resources.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={r.categoryTo} data-ocid="home.link">
                  <Card className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                    <div
                      className={`h-36 bg-gradient-to-br ${r.bg} flex items-end p-4`}
                    >
                      <span className="text-xs font-semibold bg-white/20 text-white rounded-full px-3 py-1">
                        {r.category}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {r.date}
                      </p>
                      <h3
                        className="font-bold text-sm leading-snug"
                        style={{ color: "oklch(var(--navy))" }}
                      >
                        {r.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="gradient-cta-band py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Join Keshav Fashion Today
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
            Thousands of creators and entrepreneurs are already building their
            dreams. It's your turn.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            style={{ background: "oklch(var(--cta))", color: "#fff" }}
            className="rounded-full font-bold text-base px-10 hover:opacity-90"
            data-ocid="cta.primary_button"
          >
            Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
