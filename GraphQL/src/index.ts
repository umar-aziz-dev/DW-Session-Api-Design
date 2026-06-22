import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { expressMiddleware } from '@as-integrations/express5';

// | Part           | Meaning             |
// | -------------- | ------------------- |
// | Schema         | WHAT exists         |
// | Resolver       | HOW data is fetched |
// | Query/Mutation | WHAT client asks    |


async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.listen(3000, () => {
    console.log("🚀 GraphQL server running at http://localhost:3000/graphql");
  });
}



startServer();