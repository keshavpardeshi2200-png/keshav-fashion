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
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCreatePost,
  useGetPostsByCategory,
  useUpvotePost,
} from "@/hooks/useQueries";
import { Loader2, Plus, ThumbsUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type ColorKey =
  | "tile-blue"
  | "tile-teal"
  | "tile-orange"
  | "tile-purple"
  | "tile-green";

interface SeedItem {
  title: string;
  body: string;
}

interface Props {
  category: string;
  title: string;
  description: string;
  color: ColorKey;
  seedItems: SeedItem[];
}

const colorMap: Record<ColorKey, string> = {
  "tile-blue": "oklch(var(--tile-blue))",
  "tile-teal": "oklch(var(--tile-teal))",
  "tile-orange": "oklch(var(--tile-orange))",
  "tile-purple": "oklch(var(--tile-purple))",
  "tile-green": "oklch(var(--tile-green))",
};

function PostCard({
  post,
  onUpvote,
  index,
}: { post: Post; onUpvote: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`posts.item.${index + 1}`}
    >
      <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle
            className="text-base font-bold leading-snug"
            style={{ color: "oklch(var(--navy))" }}
          >
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 gap-3">
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {post.body}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <button
              type="button"
              onClick={onUpvote}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              data-ocid={`posts.toggle.${index + 1}`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              {Number(post.upvotes)}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SeedCard({
  item,
  index,
  categoryColor,
}: { item: SeedItem; index: number; categoryColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`seed.item.${index + 1}`}
    >
      <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
        <div
          className="h-2 rounded-t-2xl"
          style={{ background: categoryColor }}
        />
        <CardHeader className="pb-2">
          <CardTitle
            className="text-base font-bold leading-snug"
            style={{ color: "oklch(var(--navy))" }}
          >
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <p className="text-sm text-muted-foreground line-clamp-4 flex-1">
            {item.body}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CategoryPage({
  category,
  title,
  description,
  color,
  seedItems,
}: Props) {
  const { data: posts = [], isLoading } = useGetPostsByCategory(category);
  const createPost = useCreatePost();
  const upvotePost = useUpvotePost();
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const categoryColor = colorMap[color];

  async function handleCreate() {
    if (!newTitle.trim() || !newBody.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await createPost.mutateAsync({
        title: newTitle,
        body: newBody,
        category,
      });
      toast.success("Post created!");
      setNewTitle("");
      setNewBody("");
      setOpen(false);
    } catch {
      toast.error("Failed to create post.");
    }
  }

  return (
    <div>
      <div className="py-16" style={{ background: categoryColor }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              {title}
            </h1>
            <p className="text-white/80 text-lg max-w-xl">{description}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="font-bold text-xl"
            style={{ color: "oklch(var(--navy))" }}
          >
            Community Posts
          </h2>
          {isLoggedIn ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="rounded-full gap-1"
                  style={{ background: categoryColor, color: "#fff" }}
                  data-ocid="category.open_modal_button"
                >
                  <Plus className="w-4 h-4" /> Share Your Idea
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="category.dialog">
                <DialogHeader>
                  <DialogTitle>Share an Idea</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    data-ocid="category.input"
                  />
                  <Textarea
                    placeholder="Describe your idea..."
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    rows={4}
                    data-ocid="category.textarea"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      data-ocid="category.cancel_button"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      disabled={createPost.isPending}
                      data-ocid="category.submit_button"
                    >
                      {createPost.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Post Idea
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => login()}
              data-ocid="category.primary_button"
            >
              Login to share
            </Button>
          )}
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-8"
            data-ocid="posts.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {posts.map((post, i) => (
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
        ) : null}

        <div className="mb-4">
          <h2
            className="font-bold text-xl mb-6"
            style={{ color: "oklch(var(--navy))" }}
          >
            Featured Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seedItems.map((item, i) => (
              <SeedCard
                key={item.title}
                item={item}
                index={i}
                categoryColor={categoryColor}
              />
            ))}
          </div>
        </div>

        {posts.length === 0 && !isLoading && (
          <div
            className="text-center py-8 text-muted-foreground"
            data-ocid="posts.empty_state"
          >
            No community posts yet. Be the first to share!
          </div>
        )}
      </div>
    </div>
  );
}
