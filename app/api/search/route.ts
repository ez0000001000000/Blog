import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  if (!q) return NextResponse.json([]);

  try {
    const res = await fetch(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=6&newsCount=0`);
    const data = await res.json();
    
    // Format the Yahoo Finance response to standard ticker info
    const results = (data.quotes || [])
      .filter((item: any) => item.quoteType === "EQUITY" || item.quoteType === "CRYPTOCURRENCY" || item.quoteType === "ETF")
      .map((item: any) => ({
        symbol: item.symbol,
        name: item.shortname || item.longname,
        exchange: item.exchDisp || item.exchange
     }));
     
    return NextResponse.json(results);
  } catch (error) {
    console.error("Stock search API error:", error);
    return NextResponse.json([]);
  }
}
