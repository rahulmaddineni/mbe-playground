# MBE PlayGround

Production: https://mbe-playground-app.onrender.com/

[MBE Developer Docs](https://developers.facebook.com/docs/facebook-business-extension/fbe/get-started)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`HTTPS=true npm start` - runs HTTPS enabled localhost

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run server`

Runs the NodeJS - Express Server. \
Server will be running at [http://localhost:3002](http://localhost:3002)
- Run with --https arg to enable https for localhost testing

Proxy enabled at port 3000, any calls to server will flow through 3000

### `npm run dev`

Runs both React & Express (build & server)