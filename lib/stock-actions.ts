"use server";

export async function getStockQuote(symbol: string) {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );
    
    if (!response.ok) {
        throw new Error(`Failed to fetch ${symbol}`);
    }

    const data = await response.json();
    const result = data.chart.result[0];
    const meta = result.meta;
    
    // Calculate change
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose || meta.previousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      symbol: meta.symbol,
      price: currentPrice.toFixed(2),
      change: (change >= 0 ? "+" : "") + change.toFixed(2),
      changePercent: (change >= 0 ? "+" : "") + changePercent.toFixed(2) + "%",
      up: change >= 0,
      name: meta.longName || meta.shortName || meta.symbol,
      history: result.indicators.quote[0].close || []
    };
  } catch (error) {
    console.error(`Error fetching stock ${symbol}:`, error);
    return null;
  }
}

export async function getMarketQuotes(symbols: string[]) {
  const quotes = await Promise.all(symbols.map(s => getStockQuote(s)));
  return quotes.filter(q => q !== null);
}
