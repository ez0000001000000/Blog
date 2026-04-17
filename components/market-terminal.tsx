"use client";

import { motion } from "motion/react";
import { 
  Globe,
  Zap,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useEffect, useState } from "react";
import { getMarketQuotes } from "@/lib/stock-actions";

const WATCHLIST_SYMBOLS = [
  "NVDA", "PLTR", "MSFT", "AAPL", "AMZN", 
  "META", "BTC-USD"
];

export function MarketTerminal() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    async function updateMarketData() {
      const data = await getMarketQuotes(WATCHLIST_SYMBOLS);
      if (data && data.length > 0) {
        setWatchlist(data);
      }
    }

    updateMarketData();
    const interval = setInterval(updateMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-full flex flex-col h-full bg-background/50 backdrop-blur-sm border-l border-border sticky top-0 overflow-hidden">
      <div className="flex-1 overflow-auto divide-y divide-border scrollbar-hide">
        {/* Strategic Watchlist */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary animate-pulse" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Strategic_Intelligence_Stream</h3>
            </div>
            <div className="px-1.5 py-0.5 border border-primary/20 bg-primary/5 rounded-[2px] text-[8px] font-mono text-primary uppercase">
              Live_Feed
            </div>
          </div>
          
          <div className="space-y-1">
            {watchlist.length > 0 ? watchlist.map((item) => (
              <div key={item.symbol} className="flex flex-col gap-1 p-2 rounded hover:bg-muted/30 transition-colors border border-transparent hover:border-border cursor-pointer group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono group-hover:text-primary transition-colors">{item.symbol}</span>
                  <span className="text-xs font-mono tracking-tighter font-medium">${item.price}</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex h-4 w-32 bg-muted/20 items-end gap-0.5 px-0.5 mt-1 border-l border-border/20">
                    {(item.history && item.history.length > 0 ? item.history.slice(-20) : Array.from({ length: 20 })).map((h: any, i: number) => (
                      <div 
                        key={i} 
                        className={item.up ? "bg-emerald-500/40 w-full" : "bg-rose-500/40 w-full"} 
                        style={{ 
                          height: h 
                            ? `${((h - Math.min(...item.history)) / (Math.max(...item.history) - Math.min(...item.history))) * 100}%` 
                            : `${Math.random() * 60 + 20}%` 
                        }} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {item.up ? <TrendingUp className="w-2 h-2 text-emerald-500" /> : <TrendingDown className="w-2 h-2 text-rose-500" />}
                    <span className={item.up ? "text-[9px] font-mono text-emerald-500 uppercase font-bold" : "text-[9px] font-mono text-rose-500 uppercase font-bold"}>
                      {item.changePercent}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                 <div className="w-12 h-12 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
                 <span className="text-[9px] font-mono text-muted-foreground animate-pulse uppercase tracking-widest">Awaiting_Data_Bursts...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border bg-black/50 h-10 flex items-center justify-center">
         <p className="text-[8px] font-mono text-muted-foreground uppercase opacity-70 flex items-center gap-2">
            <Globe className="w-3 h-3 animate-spin-slow" />
            Connected_HackerMouse_Intell // v4.6
         </p>
      </div>
    </aside>
  );
}



