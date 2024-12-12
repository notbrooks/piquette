// components/builder.tsx
"use client";
import "./builder-registry";

import { type ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react"; 
import { builder } from '@builder.io/sdk';
import DefaultErrorPage from "next/error";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Replace with your Public API Key
const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (!apiKey) {
  throw new Error("Missing BUILDER_API_KEY environment variable.");
}
builder.init(apiKey);

export function RenderBuilderContent(props: BuilderPageProps) { 
  // Call the useIsPreviewing hook to determine if 
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing(); 
  // If `content` has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (props.content || isPreviewing) {
    return <BuilderComponent {...props} />;
  }
  // If the `content` is falsy and the page is 
  // not being previewed in Builder, render the 
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />; 
}
