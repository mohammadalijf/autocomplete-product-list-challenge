# Auto-complete product list with basic filtering

The general idea of this coding challenge is to implement a basic auto-complete list which will be updated dynamically while the user types in a search box. The result will be comprised of products containing information like title, price and a couple of images.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn cypress:open`

Launches the end-to-end test runner in browser
See [cypress](https://www.cypress.io/) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running the production build on HTTPS localhost

service workers are only available in production builds on **HTTPS**. To run app with service worker:

1. First use `yarn build` to create production build.
2. Create self signed certificate and key for localhost. [This tutorial](https://web.dev/how-to-use-local-https/) shows an easy way to create self signed cert and key.
3. Install **[serve](https://github.com/vercel/serve)** packge to serve your production static files:

   ```bash
   yarn global add serve
   ```

4. serve build folder with created cert and key:
   ```bash
   serve build --ssl-cert /path/to/cert.pem --ssl-key /path/to/key.pem
   ```
5. visit https://localhost:5000

## Image Caches

This projects uses service workers for caching app bundle and product images. if you run app in HTTPS production mode the image cache will to its magic. please refer to [this section](#running-the-production-build-on-https-localhost) on how to run production on localhost using https.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
