import { builder, type BuilderContent } from "@builder.io/sdk";
import { RenderBuilderContent } from "./builder";

import { notFound } from "next/navigation";
import { env } from "~/env";

// Initialize Builder with your Public API Key
const apiKey = env.NEXT_PUBLIC_BUILDER_API_KEY;
if (!apiKey) {
  throw new Error("Missing BUILDER_API_KEY environment variable.");
}
builder.init(apiKey);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function Page(props: PageProps) {
  const { params } = await Promise.resolve(props); // Ensure `params` is handled as a possible Promise
  const model = "page";

  const content: BuilderContent | null = await builder.get("page", {
    userAttributes: {
      urlPath: "/" + ((await props?.params)?.page?.join("/") ?? ""),
    },
    prerender: false,
  }) as BuilderContent | null;

  if (!content) {
    return notFound();
  }

  return <RenderBuilderContent content={content} model={model} />;
}