# Auto-complete product list with basic filtering

The general idea of this coding challenge is to implement a basic auto-complete list which will be updated dynamically while the user types in a search box. The result will be comprised of products containing information like title, price and a couple of images.

## Used Packages

- [Create React App](create-react-app.dev): For bootstrapping the react project.
- [Material-UI](https://material-ui.com/): For Theming and design system.
- [Redux/Redux Toolkit](https://redux-toolkit.js.org/): For creating store and slices, reducers and action.
- [PapaParse](https://www.papaparse.com/): For parsing product csv file.
- [comlink-loader](https://github.com/GoogleChromeLabs/comlink-loader): For creating web worker to do filtering process on background thread and context without ejecting app.
- [workbox](https://developers.google.com/web/tools/workbox/): For creating service worker and caching system without ejecting app.
- [Cypress](https://www.cypress.io/): For End-To-End tests.
- [Jest](https://jestjs.io/): For Unit tests.
- [Testing Library](https://testing-library.com/): For Test utilities.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the unit test runner in the interactive watch mode uding jest.

### `yarn cypress:open`

Launches the end-to-end test runner in browser using cypress.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

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

## Attribution

cloth placehoder icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
