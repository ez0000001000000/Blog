/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Radio } from "lucide-react";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[100vw] mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center space-x-3 font-bold text-xl tracking-tighter"
          >
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground overflow-hidden">
               <img
                src="/logo.png"
                alt="H"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:inline uppercase font-mono text-base tracking-widest">HackerMouse // Ops</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6 text-sm font-medium">
             <Link href="/" className="hover:text-primary transition-colors uppercase font-mono text-[11px] tracking-widest border-b-2 border-primary pb-0.5">Terminal</Link>
          </nav>
          <div className="h-4 w-px bg-border mx-2" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

