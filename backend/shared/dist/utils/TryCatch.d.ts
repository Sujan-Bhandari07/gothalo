import type { RequestHandler } from "express";
declare const tryCatch: (handler: RequestHandler) => RequestHandler;
export { tryCatch };
