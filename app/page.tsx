import { docs, meta } from "@/.source/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import { Suspense } from "react";
import { TagFilter } from "@/components/tag-filter";
import { StockTicker } from "@/components/stock-ticker";
import { MarketTerminal } from "@/components/market-terminal";
import { NewsFeed } from "@/components/news-feed";

interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(docs, meta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = blogSource.getPages() as BlogPage[];
  const sortedBlogs = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedBlogs.length;
    } else {
      acc[tag] = sortedBlogs.filter((blog) =>
        blog.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Top Level News Ticker */}
      <StockTicker />

      <div className="flex flex-1 relative overflow-hidden divide-x divide-border h-[calc(100vh-56px-36px)]">
        {/* Main Center Section: Intelligence Feed */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="p-6 border-b border-border bg-muted/10">
            <div className="max-w-4xl flex flex-col gap-1">
              <h1 className="font-bold text-2xl tracking-tighter uppercase font-mono">
                Intelligence_Feed // 0.1
              </h1>
              <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                Curating the frontier of AI, coding, and market shifts.
              </p>
            </div>
           
            {allTags.length > 0 && (
              <div className="mt-6">
                <TagFilter
                  tags={allTags}
                  selectedTag={selectedTag}
                  tagCounts={tagCounts}
                />
              </div>
            )}
          </div>

          <Suspense fallback={<div className="p-10 font-mono text-[10px] animate-pulse">BOOTING_CORE_INDEX...</div>}>
             <NewsFeed 
               key={selectedTag}
               blogs={filteredBlogs.map(blog => ({
                 url: blog.url,
                 data: {
                   title: blog.data.title,
                   description: blog.data.description,
                   date: blog.data.date,
                   thumbnail: blog.data.thumbnail,
                   featured: blog.data.featured,
                 }
               }))} 
             />
          </Suspense>
    
        </main>

        {/* Right Section: Market Terminal Sidebar */}
        <div className="hidden lg:block w-[320px] 2xl:w-[380px] shrink-0 h-full overflow-hidden">
           <MarketTerminal />
        </div>
      </div>
    </div>
  );
}


