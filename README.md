# Vote
[![CircleCI](https://circleci.com/gh/itxchy/FCC-vote.svg?style=shield)](https://circleci.com/gh/itxchy/FCC-vote) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

Vote early and vote often!

Create and share polls. Vote in polls made by friends and strangers for the good of data pseudoscience.

### [Live Demo](https://fcc-vote.matttrifilo.com/)

A Full Stack project for [Free Code Camp](https://www.freecodecamp.com/).  
[User Stories](https://www.freecodecamp.com/challenges/build-a-voting-app)

## Technologies & Frameworks

- Standard JS
- React
- Redux
- Jest
- Enzyme
- Webpack 2
- Express
- MongoDB
- ESlint
- Bootstrap
- Babel

This is a full-stack, server-side rendered application.

## NPM Scripts

### Production

#### `npm build:prod`
Transpiles application code to ES5, and puts it in `public/production` for server-side rendering ease, and then builds new optimized and minified webpack bundles from the production configuration.

#### `npm start`
Starts up the server. The following environment variables are required for production: `NODE_ENV=production`, `JWT_SECRET=[pickasecret]`, and `MONGO_URI=[local or hosted MongoDB address with credentials]`.

### Development

#### `npm run watch`
Spins up `webpack --watch`, which will handle Webpack's compilation steps, and rebuild on every relevant file change. In addition to compiling the bundles, Webpack also handles the Babel transformations, and linting for the application code.

#### `npm run server` 
Starts the Express server with `nodemon`, which will restart the server on file changes. You can view the app in the browser at [http://localhost:4000](http://localhost:4000).

#### `npm run mongo`
Starts up MongoDB on port 27017 (make sure it's installed on your system)

#### `npm run test`
Runs Jest's test suite.

#### `npm run tdd`
Runs Jest's test suite and re-runs on every save of relevant files.

#### `npm run lint`
Lints files outside of the client side code, which webpack doesn't lint.

#### `npm run all`
> works ONLY if you're using XUbuntu and/or xfce4-terminal

If you happen to be using XUbunu (high-five!), you can open all of the terminals you need to run the development enronment with a single command. `npm run all` will run `watch`, `server`, `mongo`, `tdd` each in a new terminal window you can cascade across a workspace or monitor. 

If you're using a different OS or terminal and want to try this out, here's the command:
```bash
"xfce4-terminal -H -e \"npm run tdd\" & xfce4-terminal -H -e \"npm run server\" & xfce4-terminal -H -e \"npm run watch\" & xfce4-terminal -H -e \"mongod --port 27017 --dbpath=./data\""
```

just swap out each `xfce4-terminal -H -e` with your terminal's command to open a new terminal window running the command in quotes following. Every terminal should have similar flags.