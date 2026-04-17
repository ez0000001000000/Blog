"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initialize the widget
  useEffect(() => {
    if (!container.current) return;
    
    // Clear container explicitly on remounts or symbol changes
    container.current.innerHTML = '';
    
    const divWidget = document.createElement("div");
    divWidget.className = "tradingview-widget-container__widget";
    divWidget.style.height = "calc(100% - 32px)";
    divWidget.style.width = "100%";
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": false,
        "save_image": false,
        "allow_symbol_change": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "container_id": "tradingview_widget_${symbol}",
        "support_host": "https://www.tradingview.com"
      }`;
      
    container.current.appendChild(divWidget);
    container.current.appendChild(script);
  }, [symbol]);

  // Autocomplete fetcher
  useEffect(() => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(inputValue)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
          setIsDropdownOpen(true);
        }
      } catch (e) {
        console.error("Autocomplete failed", e);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSelect = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    setInputValue(""); // clear input or set to symbol
    setIsDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    if (suggestions.length > 0) {
      handleSelect(`${suggestions[0].exchange}:${suggestions[0].symbol}`);
    } else {
      const formattedSymbol = inputValue.includes(":") ? inputValue.toUpperCase() : `NASDAQ:${inputValue.toUpperCase()}`;
      handleSelect(formattedSymbol);
    }
  };

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      {/* Floating Search Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-xs z-50">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsDropdownOpen(false), 200);
            }}
            placeholder="Search symbol..."
            className="w-full bg-background/80 backdrop-blur-md border border-border shadow-2xl rounded-full px-4 py-2 text-sm outline-none transition-all focus:bg-background focus:ring-1 focus:ring-primary/20"
          />
          
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto z-50">
              {suggestions.map((s, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 hover:bg-primary/5 cursor-pointer flex justify-between items-center border-b border-border/50 last:border-0 transition-colors"
                  onClick={() => handleSelect(`${s.exchange}:${s.symbol}`)}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">{s.symbol}</span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{s.name}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-muted px-1.5 py-0.5 rounded border border-border tracking-wider">{s.exchange}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Chart Container */}
      <div className="absolute inset-0 z-0">
        <div className="tradingview-widget-container h-full w-full" ref={container} />
      </div>
    </div>
  );
}

export default TradingViewWidget;
