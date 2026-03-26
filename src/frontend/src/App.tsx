import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import CategoryPage from "@/pages/CategoryPage";
import CommunityPage from "@/pages/CommunityPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import ToolsPage from "@/pages/ToolsPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const creativeIdeasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/creative-ideas",
  component: () => (
    <CategoryPage
      category="Creative Ideas"
      title="Creative Ideas Hub"
      description="Discover innovative digital and physical product ideas to spark your next big venture."
      color="tile-blue"
      seedItems={[
        {
          title: "Launch a Digital Product",
          body: "Create and sell ebooks, courses, or templates. Digital products scale infinitely with near-zero marginal cost — the ultimate passive income vehicle.",
        },
        {
          title: "Start a Niche Newsletter",
          body: "Build an engaged audience around a specific topic. Newsletters with 1,000 true fans can generate $5K+/month through sponsorships and paid tiers.",
        },
        {
          title: "Create a Course on Your Expertise",
          body: "Package your knowledge into a structured online course. Platforms like Gumroad or Teachable make it simple to launch in a weekend.",
        },
        {
          title: "Build a Notion Template Pack",
          body: "Productivity-obsessed professionals pay for well-designed Notion templates. Bundle 5-10 templates into a pack and sell on Gumroad or your own site.",
        },
        {
          title: "Design Print-on-Demand Products",
          body: "Use Printful or Redbubble to sell custom-designed apparel, mugs, and posters without holding any inventory.",
        },
      ]}
    />
  ),
});

const managementTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/management-tips",
  component: () => (
    <CategoryPage
      category="Management Tips"
      title="Management Tips"
      description="Proven techniques to manage your time, team, and projects more effectively."
      color="tile-teal"
      seedItems={[
        {
          title: "Time Blocking Technique",
          body: "Divide your day into dedicated blocks for deep work, meetings, and admin. Time blocking reduces context switching and helps you accomplish 3x more.",
        },
        {
          title: "Eisenhower Matrix for Priorities",
          body: "Categorize tasks by urgency and importance. Focus on important-not-urgent tasks to prevent constant firefighting and build long-term success.",
        },
        {
          title: "Weekly Team Standups",
          body: "15-minute weekly syncs keep teams aligned without meeting fatigue. Use a consistent format: What did you do? What will you do? Any blockers?",
        },
        {
          title: "OKR Goal Setting",
          body: "Objectives and Key Results link daily work to company strategy. Set 3 objectives per quarter with 3-5 measurable key results each.",
        },
        {
          title: "Delegate with Clear Ownership",
          body: "Effective delegation requires clear outcomes, deadlines, and authority. Use the RACI framework to eliminate confusion about who's responsible.",
        },
      ]}
    />
  ),
});

const startupGuidanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/startup-guidance",
  component: () => (
    <CategoryPage
      category="Startup Guidance"
      title="Startup Guidance"
      description="Battle-tested advice for launching, growing, and sustaining your business."
      color="tile-orange"
      seedItems={[
        {
          title: "Validate Before You Build",
          body: "Talk to 20 potential customers before writing a single line of code. Validation saves months of wasted effort building something nobody wants.",
        },
        {
          title: "Build Your MVP First",
          body: "A Minimum Viable Product tests your core hypothesis with minimal investment. Launch in weeks, not months — then iterate based on real user feedback.",
        },
        {
          title: "Find Your First 10 Customers",
          body: "Your first customers define your product. Reach out personally, offer deep discounts, and learn everything about their pain points and workflow.",
        },
        {
          title: "Create a One-Page Business Plan",
          body: "A one-pager covers problem, solution, market size, revenue model, and next milestones. Keep it concise and update it monthly as you learn.",
        },
        {
          title: "Leverage Free Marketing Channels",
          body: "SEO, social media, content marketing, and referral programs cost time, not money. Master one free channel before investing in paid acquisition.",
        },
      ]}
    />
  ),
});

const personalGrowthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/personal-growth",
  component: () => (
    <CategoryPage
      category="Personal Growth"
      title="Personal Growth"
      description="Daily habits and mindset shifts that compound into extraordinary results over time."
      color="tile-green"
      seedItems={[
        {
          title: "Morning Routine for Productivity",
          body: "The first 90 minutes of your day set the tone for everything that follows. Exercise, journaling, and focused work before checking messages transforms output.",
        },
        {
          title: "Read 10 Pages Daily",
          body: "10 pages a day equals 12-15 books per year. Compound learning through consistent reading is the most reliable edge successful people share.",
        },
        {
          title: "Practice Gratitude Journaling",
          body: "Writing 3 specific things you're grateful for daily rewires your brain toward positivity. This simple habit measurably reduces stress and increases resilience.",
        },
        {
          title: "Learn One New Skill Monthly",
          body: "Dedicate 30 minutes daily to a new skill each month. After a year, you'll have 12 new capabilities that compound in unexpected, valuable combinations.",
        },
        {
          title: "Track Your Energy Levels",
          body: "Not all hours are equal. Log your energy and focus at different times for one week, then schedule deep work during your natural peak hours.",
        },
      ]}
    />
  ),
});

const toolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools",
  component: ToolsPage,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: CommunityPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  creativeIdeasRoute,
  managementTipsRoute,
  startupGuidanceRoute,
  personalGrowthRoute,
  toolsRoute,
  communityRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
