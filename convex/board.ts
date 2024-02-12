import { v } from "convex/values";
import {mutation} from "./_generated/server";

const images = [
    "elements.svg",
    "next.svg",
    "logo.svg",
]

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
    }

})

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthenticated");
        }

        await ctx.db.delete(args.id);
    }
})
