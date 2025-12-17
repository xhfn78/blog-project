import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="flex flex-col items-center gap-8 px-8 py-16 text-center max-w-3xl">
        <h1 className="text-6xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Vlog</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Your modern blogging platform built with Next.js 15, TypeScript, and Tailwind CSS.
          Start writing and sharing your stories today.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="/blog">View Blog Posts</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/blog/write">Write New Post</Link>
          </Button>
        </div>
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Built with Next.js 15 • TypeScript • Tailwind CSS • Zustand • ShadCN/ui</p>
        </div>
      </main>
    </div>
  );
}
