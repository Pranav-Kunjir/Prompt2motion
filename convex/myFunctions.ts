import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const userData = query({
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const userId = await getAuthUserId(ctx);
    const user = userId === null ? null : await ctx.db.get(userId);
    return {
      viewer: user?._id ?? null,
      viewerName: user?.name ?? null,
      viewerImage: user?.image ?? null,
      viewerEmail: user?.email ?? null,
    };
  },
});

export const createChat = mutation({
  args: {
    userID: v.string(),
    chatName: v.string()
  },
  handler: async (ctx, args) => {
    const newChatId = await  ctx.db.insert("chats", {
      userID: args.userID,
      chatName: args.chatName,
      createdAT: Date.now()
    });
    return newChatId;
  },
})

export const sendMessage = mutation({
  args: {
    chatID: v.string(),
    text: v.string(),
    isLLM: v.boolean()
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("message", {
      chatID: args.chatID,
      text: args.text,
      isLLM: args.isLLM,
      createdAT: Date.now()
    })
  }
})

export const createCode = mutation({
  args: {
    chatID: v.string(),
    pythonCode: v.string(),
    prompt: v.string()
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("code", {
      chatID: args.chatID,
      pythonCode: args.pythonCode,
      prompt: args.prompt,
      createdAT: Date.now()
    })
  }
})
export const displayCode = query({
  args:{chatId : v.string()},
  handler: async(ctx, args) =>{
    // const messages = await ctx.db
    // .query("message")
    // .filter((q) => q.eq(q.field("chatID"), args.chatId))
    // .order("desc")
    const messages = await ctx.db
    .query("code")
    .withIndex("by_chat", (q) => q.eq("chatID", args.chatId))
    .order("desc")
    .take(1)
  return messages;
  }
})
export const readMessage = query({
  args:{chatId : v.string()},
  handler: async(ctx, args) =>{
    // const messages = await ctx.db
    // .query("message")
    // .filter((q) => q.eq(q.field("chatID"), args.chatId))
    // .order("desc")
    const messages = await ctx.db
    .query("message")
    .withIndex("by_chat", (q) => q.eq("chatID", args.chatId))
    .collect()
  return messages;
  }
})

export const getUserChats = query({
  args:{userId : v.optional(v.string())},
  handler: async(ctx, args) =>{
    const chats = await ctx.db
    .query("chats")
    .withIndex("by_userID", (q) => q.eq("userID", (args.userId || "")))
    .order("desc")
    .collect()
  return chats;
  }
})