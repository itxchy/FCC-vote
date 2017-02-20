# Vote
[![CircleCI](https://circleci.com/gh/itxchy/FCC-vote.svg?style=shield)](https://circleci.com/gh/itxchy/FCC-vote) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

Vote early and vote often!

Create and share polls. Vote in polls made by friends and strangers for the good of data pseudoscience.

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
- Babel

This is a full-stack, server-side rendered application.

## Roadmap

The user stories are completed, though I have a lot of unit tests and documentation to finish. In between chipping away at that, the other essential step will be to optimize the production build of this app to shink the main bundle, use the production build of React (or switch to Preact entirely), and look into code-splitting and treeshaking if either won't require a massive refactor. The development build is currently deployed to Heroku, but the production build will replace it within days.

This project will later be gutted into a boilerplate so I can hit the ground running for future apps. It will be open sourced when it's ready [to add to the pile](http://andrewhfarmer.com/starter-project/). The final important hurtle will be to replace the brittle custom coded jwt authentication scheme with something built by security professionals, most likely Passport. Coding your own security features for a production app is a very bad idea. 

After all of that, I'm very excited to finally try out [RethinkDB](https://www.rethinkdb.com/faq/) for future projects. They recently [joined the Linux Foundation](https://www.rethinkdb.com/blog/rethinkdb-joins-linux-foundation/) and their documentation, community, and [code](https://www.rethinkdb.com/docs/guide/javascript/) are fantastic. 

This has been the biggest challenge I've had yet and I can't express how much I've learned while building this.

If you have any critiques or feedback, please open an issue or send an email (it's in my profile). I'll buy you a beer.

## NPM Scripts

### `npm run watch`
Spins up `webpack --watch`, which will create an initial webpack bundle file, and re-pack everything on every relevant file change. In addition to compiling the bundle, Webpack also handles the Babel transformations, and linting of the .js(x) files it bundles. This project uses StandardJS style.

### `npm run server` 
Starts the Express server with `nodemon`, which will restart the server on file changes. You can view the app in the browser at [http://localhost:4000](http://localhost:4000).

### `npm run mongo`
Starts up MongoDB on port 27017 (make sure it's installed on your system)

### `npm run test`
Runs Jest's test suite.

### `npm run tdd`
Runs Jest's test suite and re-runs on every save of relevant files.

### `npm run lint`
Lints files outside of the client side code, which webpack doesn't lint.

### `npm run all`
> works ONLY if you're using XUbuntu and/or xfce4-terminal

If you happen to be using XUbunu (high-five!), you can open all of the terminals you need to run the development enronment with a single command. `npm run all` will run `watch`, `server`, `mongo`, `tdd` each in a new terminal window you can cascade across a workspace or monitor. 

If you're using a different OS or terminal and want to try this out, here's the command:
```bash
"xfce4-terminal -H -e \"npm run tdd\" & xfce4-terminal -H -e \"npm run server\" & xfce4-terminal -H -e \"npm run watch\" & xfce4-terminal -H -e \"mongod --port 27017 --dbpath=./data\""
```

just swap out each `xfce4-terminal -H -e` with your terminal's command to open a new terminal window running the command in quotes following. Every terminal should have similar flags.