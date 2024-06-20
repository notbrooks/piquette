// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "~/components/builder";
import { env } from "~/env";



export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {

  if (!env.NEXT_PUBLIC_BUILDER_API_KEY) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Builder API key is not set</h1>
            <p className="mt-2">
              Please set the <code>NEXT_PUBLIC_BUILDER_API_KEY</code> environment variable to your Builder.io API key.
            </p>
          </div>
        </div>
    );
  } else {
    // Replace with your Public API Key
    builder.init(env.NEXT_PUBLIC_BUILDER_API_KEY ?? "");

   

    const content: unknown = await builder
      // Get the page content from Builder with the specified options
      .get("page", {
        userAttributes: {
          // Use the page path specified in the URL to fetch the content
          urlPath: "/" + (props?.params?.page?.join("/") || ""),
        },
        // Set prerender to false to return JSON instead of HTML
        prerender: false,
      })
      // Convert the result to a promise
      .toPromise();

    return (
      <RenderBuilderContent content={content ? content : {}} />
    );
  }
}