import { Suspense } from "react";
import { StockTicker } from "@/components/stock-ticker";
import { MarketTerminal } from "@/components/market-terminal";
import TradingViewWidget from "@/components/trading-view-widget";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Top Level News Ticker */}
      <StockTicker />

      <div className="flex flex-1 relative overflow-hidden divide-x divide-border h-[calc(100vh-56px-36px)]">
        {/* Main Center Section: Trading Terminal */}
        <main className="flex-1 relative overflow-hidden bg-background">
          <div className="absolute inset-0">
             <TradingViewWidget />
          </div>
        </main>

        {/* Right Section: Market Terminal Sidebar */}
        <div className="hidden lg:block w-[320px] 2xl:w-[380px] shrink-0 h-full overflow-hidden">
           <MarketTerminal />
        </div>
      </div>
    </div>
  );
}

