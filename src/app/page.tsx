import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem-3rem)] items-center justify-center px-4 py-8">
      <main className="flex flex-col items-center gap-4 text-center w-full max-w-sm">
        <div className="flex flex-col gap-3 w-full">
          <Button asChild size="lg" className="w-full">
            <Link href="/tools">도구 사용하러 가기</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/blog">블로그 보러 가기</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

