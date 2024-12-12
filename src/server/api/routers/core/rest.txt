// import contentful from "contentful";

// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// const client = contentful.createClient({
//     space: '3lo7q5ucxiwp',
//     accessToken: 'qXLJSqiXVc7TT-XiIYKMDdHTE77LhbZmTooj3M-shEU',
// });


// console.log
  
// export const contentfulRouter = createTRPCRouter({
//   hello: publicProcedure
//     .query(() => {
//       return {
//         greeting: `Hello - you have reached the contentful router`,
//       };
//     }),

//   getPage: publicProcedure
//     .query(() => {
//         void client.getEntry('1wIAnTvZaIj4KXikSW06rd').then(function (entry) {
//             return entry;
//           });
//     }),

//   getLatest: publicProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.query.posts.findFirst({
//       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
//     });

//     return post ?? null;
//   }),
// });

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const restRouter = createTRPCRouter({

// GET
get: publicProcedure
    .input(z.object({ url: z.string(), headers: z.record(z.string().optional()) }))
    .query(async ({ input }) => {
      try {
        const headers = new Headers();
        Object.entries(input.headers ?? {}).forEach(([key, value]): void => {
          if (value !== undefined) {
            headers.append(key, value);
          }
        });
        const response = await fetch(input.url, {
            method: "GET",
            headers: headers,
          });
        const data: unknown = await response.json();
        return data;
      }
      catch (error) {
        console.error(error);
        return { error: (error as Error).message };
      }
    }),

// @todo POST
// PUT
// PATCH
// DELETE

});

// export const fetchRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

  
// });

