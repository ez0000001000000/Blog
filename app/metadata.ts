import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadataKeywords = [
    "Blog",
    "HackerMouse",
    "AI",
    "Artificial Intelligence",
    "AI Agents",
    "Autonomous AI",
    "Technology",
    "Innovation",
    "Digital Transformation",
    "Tech News",
    "AI Tools",
    "Machine Learning",
    "Future Tech",
    "HackerMouse Blog",
]

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: metadataKeywords,
    authors: [
        {
            name: "HackerMouse",
            url: siteConfig.url,
        },
    ],
    creator: "HackerMouse",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: "@hackermouse",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};