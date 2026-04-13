"use client";

import { useState } from "react";
import { CompactNewsCard } from "./compact-news-card";

interface NewsFeedProps {
  blogs: any[];
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function NewsFeed({ blogs }: NewsFeedProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleBlogs = blogs.slice(0, visibleCount);
  const hasMore = visibleCount < blogs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {/* Strictly enforce visibility limit in the render loop */}
        {visibleBlogs.slice(0, visibleCount).map((blog) => {
          const date = new Date(blog.data.date);
          const formattedDate = formatDate(date);

          return (
            <CompactNewsCard
              key={blog.url}
              url={blog.url}
              title={blog.data.title}
              description={blog.data.description}
              date={formattedDate}
              thumbnail={blog.data.thumbnail}
              featured={blog.data.featured}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="p-8 border-t border-border bg-muted/5 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-none border border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Load_More_Intelligence // [+2]
          </button>
        </div>
      )}
      
      {!hasMore && blogs.length > 5 && (
        <div className="p-10 text-center border-t border-border bg-muted/5">
           <p className="text-[10px] font-mono text-muted-foreground uppercase opacity-50">
              END_OF_TRANSMISSION // ALL_INTEL_LOADED
           </p>
        </div>
      )}
    </div>
  );
}
