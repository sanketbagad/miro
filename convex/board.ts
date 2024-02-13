import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = ["elements.svg", "next.svg", "logo.svg"];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUri: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const title = args.title.trim();
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 100) {
      throw new Error("Title is too long");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favourite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFaVourites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavourite) {
      throw new Error("Board already favourited");
    }

    await ctx.db.insert("userFaVourites", {
      orgId: args.orgId,
      userId: userId,
      boardId: board._id,
    });

    return board;
  },
});

export const unfavourite = mutation({
    args: {
      id: v.id("boards"),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Unauthenticated");
      }
  
      const board = await ctx.db.get(args.id);
  
      if (!board) {
        throw new Error("Board not found");
      }
  
      const userId = identity.subject;
  
      const existingFavourite = await ctx.db
        .query("userFaVourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();
  
      if (!existingFavourite) {
        throw new Error("Board not favourited");
      }
  
      await ctx.db.delete(existingFavourite._id);
  
      return board;
    },
  });
