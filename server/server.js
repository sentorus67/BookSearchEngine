// testing server Apollo
  // const express = require('express');
  // const { ApolloServer } = require('@apollo/server');
  // const { expressMiddleware } = require('@apollo/server/express4');
  // const path = require('path');
  // const { authMiddleware } = require('./utils/auth');

  // const {typeDefs, resolvers}=require('./schemas');
  // const db = require('./config/connection');


  // const PORT = process.env.PORT || 3211;

  // const server= new ApolloServer({
  //   typeDefs,
  //   resolvers
  // });

  // const app = express();


  // // if we're in production, serve client/build as static assets


  // //app.use(routes);

  // // db.once('open', () => {
  // //   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  // // });

  // const startApolloServer = async () => {
  //   await server.start();

  //   app.use(express.urlencoded({ extended: true }));
  //   app.use(express.json());

  //   app.use('/graphql', expressMiddleware(server, {
  //     context: authMiddleware
  //   }));


  //   if (process.env.NODE_ENV === 'production') {
  //     app.use(express.static(path.join(__dirname, '../client/build')));

  //     app.get('*', (req, res) => {
  //       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //     });
  //   }

  //   db.once('open', () => {
  //     app.listen(PORT, () => {
  //       console.log(`API server running on port ${PORT}!`);
  //       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  //     });
  //   });

  // };

  // startApolloServer();

  ////-----------------------

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3210;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
