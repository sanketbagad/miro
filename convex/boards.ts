import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    if (args.favourites) {
      const favouritedBoards = await ctx.db
        .query("userFaVourites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .collect();

      const ids = favouritedBoards.map((favourite) => favourite.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        isFavourite: true,
        }));
    }


    const title = args.search as string;

    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    }

    boards = await ctx.db
      .query("boards")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardWithFavouriteRelation = boards.map(async (board) => {
      return ctx.db
        .query("userFaVourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favourite) => {
          return {
            ...board,
            isFavourite: !!favourite,
          };
        });
    });
    const boardWithFavouriteBoolean = await Promise.all(
      boardWithFavouriteRelation
    );

    return boardWithFavouriteBoolean;
  },
});
