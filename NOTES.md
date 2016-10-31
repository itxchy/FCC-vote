# TODOS

- Fix Server Side Rendering

- Build out the NewPollTitle component. Use the Laanding component from the React course as a guide. The title should initially be an input reading "New Poll Title". After editing, the field should turn into an h2 when focus leaves the input field. A pencil icon will toggle the text back to an editable input. either shifting focus away, or clicking a diskette icon will save the new title, and turn it into an h2, again with a pencil icon to allow editing.




## UI

Bootstrap will be used for responsiveness and quick iteration. 

## Authentication 

[https://github.com/mjrussell/redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)

https://davidwalsh.name/react-authentication

!!! --> https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

https://scotch.io/tutorials/build-a-react-flux-app-with-user-authentication

https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.gfbriyquy

https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

Authentication will be handled with JWT and 0auth, which will allow the user to sign up and authenticate with an email address and password, or login using Gmail or Github.

## Webpack Headaches

Right now, the gotchas I need to fix are:

- **Separating the bundle** into app and vendor chunks
- Create **separate configs** for dev-build versus production build. React's minified production code should be used instead of the full development or minified development versions.
- figure out whether to use the official **min.jquery.js file or minify the uncompressed version** through Webpack.
- 

## API

Endpoints:

- /api/create-poll
- /api/login
- /api/signup
- /api/logout
- /api/get-polls?recent=20