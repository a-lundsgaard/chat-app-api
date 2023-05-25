declare module '*.gql' {
    import { DocumentNode } from 'graphql'
    // const Schema: DocumentNode
    const Schema: any
    export = Schema
}