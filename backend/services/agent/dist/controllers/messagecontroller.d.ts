declare const createconversation: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare const getallconversations: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare const sendprompt: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare const getconversationbyid: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export { createconversation, getallconversations, sendprompt, getconversationbyid, };
