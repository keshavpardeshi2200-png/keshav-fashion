import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Post {
    upvotes: bigint;
    title: string;
    body: string;
    createdAt: Time;
    author: Principal;
    category: string;
}
export interface BusinessIdea {
    creator: Principal;
    idea: string;
    createdAt: Time;
}
export interface Task {
    title: string;
    owner: Principal;
    completed: boolean;
}
export interface UserProfile {
    name: string;
}
export interface Goal {
    title: string;
    owner: Principal;
    createdAt: Time;
    progress: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBusinessIdea(idea: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeTask(taskTitle: string): Promise<void>;
    createGoal(title: string): Promise<void>;
    createPost(title: string, body: string, category: string): Promise<bigint>;
    createTask(title: string): Promise<void>;
    getAllBusinessIdeas(): Promise<Array<BusinessIdea>>;
    getAllPosts(): Promise<Array<Post>>;
    getCallerGoals(): Promise<Array<Goal>>;
    getCallerTasks(): Promise<Array<Task>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPostsByCategory(category: string): Promise<Array<Post>>;
    getRandomBusinessIdea(): Promise<BusinessIdea | null>;
    getTopPosts(): Promise<Array<Post>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateGoalProgress(goalTitle: string, progress: bigint): Promise<void>;
    upvotePost(postId: bigint): Promise<void>;
}
