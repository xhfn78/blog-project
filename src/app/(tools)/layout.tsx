import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools - Your Toolbox",
  description: "A collection of useful development tools.",
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background py-4">
        <nav className="container mx-auto flex max-w-5xl items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Tools</h1>
          {/* TODO: Add ToolNavigation component here */}
        </nav>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}