import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'node:path';

const definitionsFactory: GraphQLDefinitionsFactory =
  new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'src/graphql-types.ts'),
  outputAs: 'class',
  watch: true,
  emitTypenameField: true,
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number',
  }
});
