# Vote

Create and share polls. Vote in polls made by friends and strangers.

A Full Stack project for Free Code Camp.

## Technologies & Frameworks

- React
- Redux
- Bootstrap
- SASS
- Babel
- ESlint
- Webpack
- NodeJS
- Express
- Jest
- CouchDB

This app is server-side rendered. 

## NPM Scripts

`npm run watch` : Spins up `webpack --watch`, which will create an initial webpack bundle file, and re-pack everything on every relevant file change. In addition to compiling the bundle, Webpack also handles the Babel transformations, and linting. This project uses StandardJS style. No more semi-colons!

`npm run server` : Starts the Express server with `nodemon`. `nodemon` will watch `server.js` and webpack's bundle file for changes and will restart the server whenever something changes. You can view the app in the browser at [localhost:4000] if there is no `process.env.PORT` defined. If the port is something other than 4000, the console will let you know what the server is listening to.

`npm run test` : Runs Jest's test suite.

`npm run tdd` : Runs Jest's test suite and re-runs on every save of relevant files.

