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
- SASS
- Babel

This is a full-stack, server-side rendered application.

## Roadmap

[X] Finish unit tests for Redux
[ ] Test the essentials in React components
[X] Optimize the production build with code splitting

This project will later be gutted into a boilerplate so I can hit the ground running for future larger-scale apps. It will be open sourced when it's ready [to add to the pile](http://andrewhfarmer.com/starter-project/), though create-react-app is amazing for small client side apps. The final important hurtle will be to replace the brittle custom coded jwt authentication strategy with Passport. Coding your own security features is a very bad idea.

After all of that, I'm very excited to finally try out [RethinkDB](https://www.rethinkdb.com/faq/) for future projects. They recently [joined the Linux Foundation](https://www.rethinkdb.com/blog/rethinkdb-joins-linux-foundation/) and their documentation, community, and [code](https://www.rethinkdb.com/docs/guide/javascript/) are fantastic. 

This has been the biggest challenge I've had yet and I can't express how much I've learned while building this.

If you have any critiques or feedback, please open an issue or send an email.

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