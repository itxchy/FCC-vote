# Vote
[![CircleCI](https://circleci.com/gh/itxchy/FCC-vote.svg?style=shield)](https://circleci.com/gh/itxchy/FCC-vote)  
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Vote early and vote often!

Create and share polls. Vote in polls made by friends and strangers for the good of data pseudo-science.

### [Live Demo](http://itxchy-vote.herokuapp.com/)
> Note: This is hosted on Heroku, so give it a moment to wake up

A Full Stack project for [Free Code Camp](https://www.freecodecamp.com/).  
[User Stories](https://www.freecodecamp.com/challenges/build-a-voting-app)

## Technologies & Frameworks

- StandardJS ES6
- React
- Redux
- Webpack 1
- Express
- MongoDB
- ESlint
- Jest
- Bootstrap
- SASS

This is a full-stack, server-side rendered application 

## NPM Scripts

### `npm run watch`
Spins up `webpack --watch`, which will create an initial webpack bundle file, and re-pack everything on every relevant file change. In addition to compiling the bundle, Webpack also handles the Babel transformations, and linting. This project uses StandardJS style. No more semi-colons!

### `npm run server` 
Starts the Express server with `nodemon`. `nodemon` will watch `server.js` and webpack's bundle file for changes and will restart the server whenever something changes. You can view the app in the browser at [http://localhost:4000](http://localhost:4000) if there is no `process.env.PORT` defined. If the port is something other than 4000, the console will let you know what the server is listening to.

### `npm run test`
Runs Jest's test suite.

### `npm run tdd`
Runs Jest's test suite and re-runs on every save of relevant files.

