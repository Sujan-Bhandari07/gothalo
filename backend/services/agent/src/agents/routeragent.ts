import { HumanMessage } from "@langchain/core/messages";
import { getllm } from "./getllm.js";
import type { Statetype } from "./state.js";

const routeragent = async (state: Statetype) => {
  try {
    const llm = getllm("router");
    if (state.file && state.file !== undefined) {
      if (state.file.mimetype === "application/pdf") {
        return {
          ...state,
          agent: "pdfrag",
        };
      } else if (state.file.mimetype.startsWith("image/")) {
        return {
          ...state,
          agent: "image",
        };
      }
    }

    if (state.agent !== "auto") {
      return;
    }

    const prompt = `You are a routing agent. Your only job is to classify the user's request into exactly one category.

Available categories:
- chat: General conversation, greetings, explanations, brainstorming, writing, translation, math, and any question answerable from general knowledge or simple computation that does NOT require live/external data.
- coding: Programming, debugging, code generation, software engineering, algorithms, APIs, databases, frameworks, technical development, or requests to write/fix/explain code in any language.
- ppt: Creating, editing, improving, or summarizing content into PowerPoint presentations or slide decks.
- PDF / Documents: Reading, understanding, analyzing, summarizing, extracting information from, comparing, answering questions about, editing, converting, and creating professional documents.

- vision: Any request whose primary task is working with images. This includes generating images from text, editing existing images, analyzing photos, OCR, describing screenshots, identifying objects, extracting text, or answering questions about visual content.
- search: Requests that need up-to-date or real-world information that changes over time — including current events, news, live prices, sports scores, recent product releases, current time, current date, timezone lookups, weather, or any fact likely to have changed after the model's training cutoff.

Disambiguation rules (apply in order):
1. If the request mentions a file the user uploaded (PDF, image, slides), route to the matching file-type agent (pdf, vision, ppt) even if the request also involves writing or explaining.
2. If the request is about writing/fixing/explaining code, always route to coding, even if it mentions "current" library versions.
3. If the request asks for the current time, date, day of week, timezone conversion, weather, or any live/real-world fact, route to search.
4. If the request has multiple intents, pick the agent for the PRIMARY action the user wants performed.
5. If the request is a greeting, small talk, or too vague to classify, default to chat.

Output format:
- Respond with exactly one word from this list, nothing else: chat, coding, ppt, pdf, vision, search
- No punctuation, quotes, explanation, or extra whitespace.

Examples:
User: "What time is it in Nepal?" -> search
User: "What's the latest iPhone model?" -> search
User: "Fix this Python function for me" -> coding
User: "Summarize this PDF" -> pdf
User: "What's in this screenshot?" -> vision
User: "Make a 5-slide deck on climate change" -> ppt
User: "Hey, how are you?" -> chat
User: "Who won the match yesterday?" -> search

User request:
${state.prompt}`;

    const res = await llm.invoke([new HumanMessage(prompt)]);
    return { ...state, agent: res.content };
  } catch (error: any) {
    }
};
export { routeragent };
