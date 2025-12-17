
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createToolSchema } from "@/entities/content/model/schemas";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { ToolCategory, TOOL_CATEGORIES } from "@/entities/content/model/tool-category";
import { Checkbox } from "@/shared/ui/checkbox";

interface ToolFormProps {
  initialData?: z.infer<typeof createToolSchema>;
  onSubmit: (data: z.infer<typeof createToolSchema>) => void;
  isLoading?: boolean;
}

export function ToolForm({ initialData, onSubmit, isLoading }: ToolFormProps) {
  const form = useForm<z.infer<typeof createToolSchema>>({
    resolver: zodResolver(createToolSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      category: "utility",
      tags: [],
      author: "",
      published: false,
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Tool Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")} />
        {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          {...register("category")}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {TOOL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          {...register("tags", {
            setValueAs: (value) => value.split(',').map((tag: string) => tag.trim()).filter(Boolean),
          })}
        />
        {errors.tags && <p className="text-destructive text-sm mt-1">{errors.tags.message}</p>}
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" {...register("author")} />
        {errors.author && <p className="text-destructive text-sm mt-1">{errors.author.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="published" {...register("published")} />
        <Label htmlFor="published">Published</Label>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Tool"}
      </Button>
    </form>
  );
}
