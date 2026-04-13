import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock, TrendingUp } from "lucide-react";

interface CompactNewsCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  featured?: boolean;
}

export function CompactNewsCard({
  url,
  title,
  description,
  date,
  thumbnail,
  featured,
}: CompactNewsCardProps) {
  return (
    <Link
      href={url}
      className="group block relative border-b border-border bg-background transition-colors hover:bg-muted/30 p-4"
    >
      <div className="flex gap-4">
        {thumbnail && (
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm border border-border">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="80px"
            />
          </div>
        )}
        
        <div className="flex flex-col flex-1 justify-between py-0.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {featured && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  <TrendingUp className="w-2.5 h-2.5" />
                  Flash
                </span>
              )}
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-none">
                Intelligence Update // {date}
              </span>
            </div>
            
            <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
              <Clock className="w-3 h-3" />
              READ_TIME: 4M
            </div>
             <div className="flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
              SOURCE: @HACKERMOUSE
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
