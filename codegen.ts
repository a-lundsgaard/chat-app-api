
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/schemas/schem.gql",
  generates: {
    "src/graphql/generated/graphql.ts": {
      config: {
        // contextType: "../@types/graphql#GraphQLContextApi",
        contextType: "../context/index#ContextManager",

        // // contextTypeImport: "import type { Context } from '../@types/graphql'",
        // contextType: "Context",
      },
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
