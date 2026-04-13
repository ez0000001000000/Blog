"use client";

import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getMarketQuotes } from "@/lib/stock-actions";

const DEFAULT_SYMBOLS = ["NVDA", "PLTR", "MSFT", "GOOGL", "AAPL", "TSLA", "META", "AMZN", "SOXX", "BTC-USD"];

export function StockTicker() {
  const [stocks, setStocks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStocks() {
      const data = await getMarketQuotes(DEFAULT_SYMBOLS);
      if (data && data.length > 0) {
        setStocks(data);
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (stocks.length === 0) {
     return (
        <div className="w-full bg-background border-b border-border overflow-hidden h-9 flex items-center px-6">
           <span className="text-[10px] font-mono text-muted-foreground animate-pulse uppercase">Syncing_Realtime_Market_Data...</span>
        </div>
     );
  }

  return (
    <div className="w-full bg-background border-b border-border overflow-hidden h-9 flex items-center relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex whitespace-nowrap gap-12 px-12"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...stocks, ...stocks, ...stocks].map((stock, i) => (
          <div key={`${stock.symbol}-${i}`} className="flex items-center gap-2 text-[10px] font-mono tracking-tight font-medium uppercase">
            <span className="text-muted-foreground">{stock.symbol}</span>
            <span>{stock.price}</span>
            <span className={stock.up ? "text-emerald-500" : "text-rose-500"}>
              {stock.up ? <TrendingUp className="inline w-3 h-3 mr-1" /> : <TrendingDown className="inline w-3 h-3 mr-1" />}
              {stock.changePercent}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

