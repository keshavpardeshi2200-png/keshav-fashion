import type { Post } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCreatePost,
  useGetAllPosts,
  useUpvotePost,
} from "@/hooks/useQueries";
import { Loader2, Plus, ThumbsUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Creative Ideas",
  "Management Tips",
  "Startup Guidance",
  "Personal Growth",
  "General",
];

const categoryColors: Record<string, string> = {
  "Creative Ideas": "oklch(var(--tile-blue))",
  "Management Tips": "oklch(var(--tile-teal))",
  "Startup Guidance": "oklch(var(--tile-orange))",
  "Personal Growth": "oklch(var(--tile-purple))",
  General: "oklch(var(--tile-green))",
};

function PostCard({
  post,
  onUpvote,
  index,
}: { post: Post; onUpvote: () => void; index: number }) {
  const bg = categoryColors[post.category] ?? "oklch(var(--navy))";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`community.item.${index + 1}`}
    >
      <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
        <div className="h-1.5 rounded-t-2xl" style={{ background: bg }} />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle
              className="text-base font-bold leading-snug"
              style={{ color: "oklch(var(--navy))" }}
            >
              {post.title}
            </CardTitle>
            <Badge
              className="shrink-0 text-xs"
              style={{ background: bg, color: "#fff" }}
            >
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 gap-3">
          <p className="text-sm text-muted-foreground line-clamp-4 flex-1">
            {post.body}
          </p>
          <button
            type="button"
            onClick={onUpvote}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors self-start"
            data-ocid={`community.toggle.${index + 1}`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="font-medium">{Number(post.upvotes)}</span>
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CommunityPage() {
  const { data: posts = [], isLoading } = useGetAllPosts();
  const createPost = useCreatePost();
  const upvotePost = useUpvotePost();
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sorted = [...posts].sort(
    (a, b) => Number(b.upvotes) - Number(a.upvotes),
  );

  async function handleCreate() {
    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await createPost.mutateAsync({ title, body, category });
      toast.success("Post shared with the community!");
      setTitle("");
      setBody("");
      setCategory(CATEGORIES[0]);
      setOpen(false);
    } catch {
      toast.error("Failed to create post.");
    }
  }

  return (
    <div>
      <div className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-white" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Community
              </h1>
            </div>
            <p className="text-white/80 text-lg max-w-xl">
              Share ideas, upvote the best content, and learn from fellow
              creators and entrepreneurs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="font-bold text-xl"
              style={{ color: "oklch(var(--navy))" }}
            >
              All Posts
            </h2>
            <p className="text-sm text-muted-foreground">
              {posts.length} post{posts.length !== 1 ? "s" : ""} sorted by
              upvotes
            </p>
          </div>
          {isLoggedIn ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="rounded-full gap-1 gradient-hero text-white hover:opacity-90"
                  data-ocid="community.open_modal_button"
                >
                  <Plus className="w-4 h-4" /> Share Post
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="community.dialog">
                <DialogHeader>
                  <DialogTitle>Share with the Community</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    data-ocid="community.input"
                  />
                  <Textarea
                    placeholder="Share your ideas, tips, or questions..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={5}
                    data-ocid="community.textarea"
                  />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger data-ocid="community.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      data-ocid="community.cancel_button"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      disabled={createPost.isPending}
                      data-ocid="community.submit_button"
                    >
                      {createPost.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Share Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => login()}
              data-ocid="community.primary_button"
            >
              Login to Share
            </Button>
          )}
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-12"
            data-ocid="community.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-16" data-ocid="community.empty_state">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-bold text-lg mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share something with the community!
            </p>
            {!isLoggedIn && (
              <Button
                onClick={() => login()}
                data-ocid="community.secondary_button"
              >
                Login to Post
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((post, i) => (
              <PostCard
                key={`${post.title}-${i}`}
                post={post}
                index={i}
                onUpvote={() => {
                  if (!isLoggedIn) {
                    login();
                    return;
                  }
                  upvotePost.mutate(BigInt(i));
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
