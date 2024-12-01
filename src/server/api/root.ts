// Core
import { likeRouter } from "./routers/core/like";
import { dislikeRouter } from "./routers/core/dislike";
import { favoriteRouter } from "./routers/core/favorite";
import { saveRouter } from "./routers/core/save";
import { archiveRouter } from "./routers/core/archive";
import { pinRouter } from "./routers/core/pin";
import { businessRouter } from "./routers/business";
import { profileRouter } from "~/server/api/routers/profile";
// Services
import { openAIRouter } from "./routers/services/openai";
// TODO: Add services here
// Custom
// TODO: Add custom routes here
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // Core
  like: likeRouter,
  dislike: dislikeRouter,
  favorite: favoriteRouter,
  save: saveRouter,
  archive: archiveRouter,
  pin: pinRouter,
  business: businessRouter,
  profile: profileRouter,
  // Services
  openai: openAIRouter,
  // TODO: Add services here
  // Custom
  // TODO: Add custom routes here
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
