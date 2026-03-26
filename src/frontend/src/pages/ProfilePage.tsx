import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "@/hooks/useQueries";
import { Loader2, LogOut, Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { loginStatus, identity, login, clear } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");

  useEffect(() => {
    if (profile?.name) setName(profile.name);
  }, [profile?.name]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1
            className="text-2xl font-extrabold mb-2"
            style={{ color: "oklch(var(--navy))" }}
          >
            Your Profile
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Login to manage your profile, track your goals, and join the
            community.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            style={{ background: "oklch(var(--cta))", color: "#fff" }}
            className="rounded-full px-10 font-bold"
            data-ocid="profile.primary_button"
          >
            Login / Sign Up
          </Button>
        </motion.div>
      </div>
    );
  }

  async function handleSave() {
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile.");
    }
  }

  const principal = identity?.getPrincipal().toString() ?? "";

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-extrabold"
              style={{ color: "oklch(var(--navy))" }}
            >
              {profile?.name || "Your Profile"}
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-1 truncate max-w-xs">
              {principal.slice(0, 30)}...
            </p>
          </div>
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-8"
            data-ocid="profile.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle style={{ color: "oklch(var(--navy))" }}>
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display Name</Label>
                <Input
                  id="profile-name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="profile.input"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={saveProfile.isPending}
                  style={{ background: "oklch(var(--cta))", color: "#fff" }}
                  className="rounded-full gap-2"
                  data-ocid="profile.save_button"
                >
                  {saveProfile.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => clear()}
                  className="rounded-full gap-2"
                  data-ocid="profile.delete_button"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
              {saveProfile.isSuccess && (
                <p
                  className="text-sm text-green-600"
                  data-ocid="profile.success_state"
                >
                  Profile saved successfully!
                </p>
              )}
              {saveProfile.isError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="profile.error_state"
                >
                  Failed to save profile. Try again.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
