// builder-registry.ts
import { Builder } from '@builder.io/react'
import dynamic from 'next/dynamic'

Builder.registerComponent(
  dynamic(() => import('~/components/builder/header')),
  {
    name: 'Header',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Hello, Builder!' },
      { name: 'description', type: 'string', defaultValue: 'This is a test component.' },
      { name: 'banner', type: 'string', defaultValue: 'This is a test banner.', options: { optional: true } }
    ]
  }
)

Builder.registerComponent(
  dynamic(() => import('~/components/builder/body')),
  {
    name: 'Body',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Hello, Builder!' },
      { name: 'description', type: 'string', defaultValue: 'This is a test component.' },
      { name: 'banner', type: 'string', defaultValue: 'This is a test banner.', options: { optional: true } }
    ]
  }
)