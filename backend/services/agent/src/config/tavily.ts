import { TavilySearch } from "@langchain/tavily";

export const tavily = new TavilySearch({
  maxResults: 5,
  searchDepth: "advanced",
  topic: "general",
  includeAnswer: true,
  includeImages: true,
  excludeDomains: [
    "facebook.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "pinterest.com",
    "tiktok.com",
    "reddit.com",
  ],
});