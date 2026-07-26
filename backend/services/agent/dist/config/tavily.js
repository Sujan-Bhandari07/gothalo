import { TavilySearch } from "@langchain/tavily";
export const tavily = new TavilySearch({
    maxResults: 5,
    searchDepth: "advanced",
    topic: "general",
    includeAnswer: true
});
