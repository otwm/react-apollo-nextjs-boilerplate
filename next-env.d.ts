/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'

  export default typeof DocumentNode
}

declare module '*.yml'
