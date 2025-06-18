import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  chats: defineTable({
    userID: v.string(),
    chatName: v.string(),
    createdAT: v.number()
  }).index("by_userID", ['userID']),
  code: defineTable({
    chatID: v.string(),
    pythonCode: v.string(),
    prompt: v.string(),
    createdAT: v.number()
  }).index('by_chat', ['chatID']),
  message: defineTable({
    chatID: v.string(),
    text: v.string(),
    isLLM: v.boolean(),
    createdAT: v.number()
  }).index('by_chat', ['chatID'])
});
