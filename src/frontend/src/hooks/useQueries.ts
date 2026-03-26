import type { BusinessIdea, Goal, Post, Task, UserProfile } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTopPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "top"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      body,
      category,
    }: { title: string; body: string; category: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPost(title, body, category);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpvotePost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.upvotePost(postId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useGetAllBusinessIdeas() {
  const { actor, isFetching } = useActor();
  return useQuery<BusinessIdea[]>({
    queryKey: ["businessIdeas"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBusinessIdeas();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRandomBusinessIdea() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getRandomBusinessIdea();
    },
  });
}

export function useAddBusinessIdea() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (idea: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBusinessIdea(idea);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["businessIdeas"] }),
  });
}

export function useGetCallerGoals() {
  const { actor, isFetching } = useActor();
  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerGoals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateGoal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.createGoal(title);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useUpdateGoalProgress() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      goalTitle,
      progress,
    }: { goalTitle: string; progress: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateGoalProgress(goalTitle, progress);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useGetCallerTasks() {
  const { actor, isFetching } = useActor();
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTask(title);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useCompleteTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (taskTitle: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.completeTask(taskTitle);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}
