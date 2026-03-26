import type { BusinessIdea } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAddBusinessIdea,
  useCompleteTask,
  useCreateGoal,
  useCreateTask,
  useGetAllBusinessIdeas,
  useGetCallerGoals,
  useGetCallerTasks,
  useGetRandomBusinessIdea,
  useUpdateGoalProgress,
} from "@/hooks/useQueries";
import {
  Calendar,
  CheckSquare,
  ChevronRight,
  Loader2,
  Plus,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Idea Generator ─────────────────────────────────────────────────────────
function IdeaGenerator() {
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: allIdeas = [] } = useGetAllBusinessIdeas();
  const randomIdea = useGetRandomBusinessIdea();
  const addIdea = useAddBusinessIdea();
  const [newIdea, setNewIdea] = useState("");
  const [randomResult, setRandomResult] = useState<BusinessIdea | null>(null);

  async function handleRandom() {
    const result = await randomIdea.mutateAsync();
    setRandomResult(result ?? null);
  }

  async function handleAdd() {
    if (!newIdea.trim()) return;
    if (!isLoggedIn) {
      login();
      return;
    }
    try {
      await addIdea.mutateAsync(newIdea.trim());
      toast.success("Idea added!");
      setNewIdea("");
    } catch {
      toast.error("Failed to add idea.");
    }
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-card">
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{ color: "oklch(var(--navy))" }}
          >
            <Zap className="w-5 h-5" style={{ color: "oklch(var(--cta))" }} />
            Random Idea Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleRandom}
            disabled={randomIdea.isPending}
            style={{ background: "oklch(var(--cta))", color: "#fff" }}
            className="rounded-full gap-2"
            data-ocid="idea.primary_button"
          >
            {randomIdea.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Generate Idea
          </Button>
          {randomResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border-2 border-primary/30 bg-primary/5"
              data-ocid="idea.card"
            >
              <p className="font-semibold text-foreground">
                {randomResult.idea}
              </p>
            </motion.div>
          )}
          {!randomResult && !randomIdea.isPending && (
            <p className="text-muted-foreground text-sm">
              Hit the button to discover your next big idea!
            </p>
          )}
        </CardContent>
      </Card>

      {isLoggedIn && (
        <Card className="rounded-2xl shadow-card">
          <CardHeader>
            <CardTitle
              className="text-base"
              style={{ color: "oklch(var(--navy))" }}
            >
              Submit an Idea
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Your business idea..."
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              data-ocid="idea.input"
            />
            <Button
              onClick={handleAdd}
              disabled={addIdea.isPending}
              data-ocid="idea.submit_button"
            >
              {addIdea.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <h3
          className="font-bold text-lg mb-4"
          style={{ color: "oklch(var(--navy))" }}
        >
          Community Ideas ({allIdeas.length})
        </h3>
        {allIdeas.length === 0 ? (
          <div
            className="text-center py-8 text-muted-foreground"
            data-ocid="idea.empty_state"
          >
            No ideas yet. Be the first to add one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allIdeas.map((idea) => (
              <motion.div
                key={idea.idea}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="idea.item.1"
              >
                <Card className="rounded-xl shadow-xs">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Zap
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(var(--tile-orange))" }}
                    />
                    <span className="text-sm">{idea.idea}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Goal Tracker ────────────────────────────────────────────────────────────
function GoalTracker() {
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: goals = [], isLoading } = useGetCallerGoals();
  const createGoal = useCreateGoal();
  const updateProgress = useUpdateGoalProgress();
  const [newGoal, setNewGoal] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="text-center py-16" data-ocid="goals.empty_state">
        <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-bold text-lg mb-2">Track Your Goals</h3>
        <p className="text-muted-foreground mb-6">
          Login to start tracking your goals and progress.
        </p>
        <Button onClick={() => login()} data-ocid="goals.primary_button">
          Login to Get Started
        </Button>
      </div>
    );
  }

  async function handleCreate() {
    if (!newGoal.trim()) return;
    try {
      await createGoal.mutateAsync(newGoal.trim());
      toast.success("Goal created!");
      setNewGoal("");
    } catch {
      toast.error("Failed to create goal.");
    }
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-card">
        <CardHeader>
          <CardTitle style={{ color: "oklch(var(--navy))" }}>
            Add New Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="e.g. Launch my first product"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            data-ocid="goals.input"
          />
          <Button
            onClick={handleCreate}
            disabled={createGoal.isPending}
            data-ocid="goals.submit_button"
          >
            {createGoal.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="flex justify-center py-8"
          data-ocid="goals.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : goals.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="goals.empty_state"
        >
          No goals yet. Add your first goal above!
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`goals.item.${i + 1}`}
            >
              <Card className="rounded-xl shadow-card">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(var(--navy))" }}
                    >
                      {goal.title}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "oklch(var(--teal))" }}
                    >
                      {Number(goal.progress)}%
                    </span>
                  </div>
                  <Progress value={Number(goal.progress)} className="h-2" />
                  <Slider
                    defaultValue={[Number(goal.progress)]}
                    max={100}
                    step={5}
                    onValueCommit={(val) => {
                      updateProgress.mutate({
                        goalTitle: goal.title,
                        progress: BigInt(val[0]),
                      });
                    }}
                    className="mt-1"
                    data-ocid={`goals.toggle.${i + 1}`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Daily Planner ───────────────────────────────────────────────────────────
function DailyPlanner() {
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: tasks = [], isLoading } = useGetCallerTasks();
  const createTask = useCreateTask();
  const completeTask = useCompleteTask();
  const [newTask, setNewTask] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="text-center py-16" data-ocid="tasks.empty_state">
        <CheckSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-bold text-lg mb-2">Your Daily Planner</h3>
        <p className="text-muted-foreground mb-6">
          Login to manage your daily tasks.
        </p>
        <Button onClick={() => login()} data-ocid="tasks.primary_button">
          Login to Get Started
        </Button>
      </div>
    );
  }

  async function handleCreate() {
    if (!newTask.trim()) return;
    try {
      await createTask.mutateAsync(newTask.trim());
      toast.success("Task added!");
      setNewTask("");
    } catch {
      toast.error("Failed to add task.");
    }
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-card">
        <CardHeader>
          <CardTitle style={{ color: "oklch(var(--navy))" }}>
            Add Task
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="e.g. Write 500 words for blog post"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            data-ocid="tasks.input"
          />
          <Button
            onClick={handleCreate}
            disabled={createTask.isPending}
            data-ocid="tasks.submit_button"
          >
            {createTask.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="flex justify-center py-8"
          data-ocid="tasks.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : tasks.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="tasks.empty_state"
        >
          Your planner is empty. Add your first task!
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <motion.div
              key={task.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              data-ocid={`tasks.item.${i + 1}`}
            >
              <Card className="rounded-xl shadow-xs">
                <CardContent className="p-4 flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => {
                      if (!task.completed) completeTask.mutate(task.title);
                    }}
                    data-ocid={`tasks.checkbox.${i + 1}`}
                  />
                  <span
                    className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="text-xs text-green-600 font-medium">
                      Done ✓
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Content Calendar ────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type CalendarEntry = { day: string; content: string };

function ContentCalendar() {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const [input, setInput] = useState("");

  function addEntry(day: string) {
    if (!input.trim()) {
      setAdding(null);
      return;
    }
    setEntries((prev) => [...prev, { day, content: input.trim() }]);
    setInput("");
    setAdding(null);
  }

  function removeEntry(entryIdx: number) {
    setEntries((prev) => prev.filter((_, i) => i !== entryIdx));
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {DAYS.map((day) => {
          const dayEntries = entries
            .map((e, idx) => ({ ...e, idx }))
            .filter((e) => e.day === day);
          return (
            <div
              key={day}
              className="rounded-xl border border-border bg-white p-3 min-h-[120px] flex flex-col"
              data-ocid="calendar.panel"
            >
              <div
                className="font-bold text-sm mb-2"
                style={{ color: "oklch(var(--navy))" }}
              >
                {day}
              </div>
              <div className="flex-1 space-y-1">
                {dayEntries.map((e) => (
                  <div
                    key={e.idx}
                    className="text-xs bg-primary/10 text-primary rounded px-2 py-1 flex items-center justify-between gap-1"
                    data-ocid="calendar.item.1"
                  >
                    <span className="truncate">{e.content}</span>
                    <button
                      type="button"
                      onClick={() => removeEntry(e.idx)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      data-ocid="calendar.delete_button.1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {adding === day ? (
                <div className="mt-2 flex gap-1">
                  <Input
                    className="h-7 text-xs px-2"
                    placeholder="Add entry..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addEntry(day);
                      if (e.key === "Escape") setAdding(null);
                    }}
                    autoFocus
                    data-ocid="calendar.input"
                  />
                  <Button
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => addEntry(day)}
                    data-ocid="calendar.submit_button"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAdding(day)}
                  className="mt-2 text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  data-ocid="calendar.open_modal_button"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Tools Page ─────────────────────────────────────────────────────────
export default function ToolsPage() {
  return (
    <div>
      <div className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Productivity Tools
            </h1>
            <p className="text-white/80 text-lg">
              Everything you need to stay focused and build momentum.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="ideas">
          <TabsList
            className="rounded-full mb-8 h-auto p-1 flex flex-wrap gap-1"
            data-ocid="tools.tab"
          >
            <TabsTrigger
              value="ideas"
              className="rounded-full gap-1.5"
              data-ocid="tools.tab"
            >
              <Zap className="w-4 h-4" /> Idea Generator
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-full gap-1.5"
              data-ocid="tools.tab"
            >
              <Target className="w-4 h-4" /> Goal Tracker
            </TabsTrigger>
            <TabsTrigger
              value="planner"
              className="rounded-full gap-1.5"
              data-ocid="tools.tab"
            >
              <CheckSquare className="w-4 h-4" /> Daily Planner
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="rounded-full gap-1.5"
              data-ocid="tools.tab"
            >
              <Calendar className="w-4 h-4" /> Content Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ideas">
            <IdeaGenerator />
          </TabsContent>
          <TabsContent value="goals">
            <GoalTracker />
          </TabsContent>
          <TabsContent value="planner">
            <DailyPlanner />
          </TabsContent>
          <TabsContent value="calendar">
            <ContentCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
