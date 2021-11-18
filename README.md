# Notes

## Scripts

### For development

* **"start:parcel"** - Start parcel watching for changes.
* **"start:electron"** - Start electron (see the visual application).

### For production

* **"build"** - Use parcel to build a production version of the react code.
* **"make"** - Build a distributable version of the application.

## Structure

`src/app/*` - Contains react components.

Parcel `npm run start:parcel` looks at `src/app/*` and compiles the react-typescript into `dist`.

`src/electron/*` contains scripts to run the electron app.
`src/electron/main.js` loads `src/index.html` which loads the compiled react code from `dist/index.js`.

## Logging

Logging in `src/electron/main.js` logs to the terminal console. This is known as the "main" process.

Logging in `src/index.html` logs to the browser console. This is known as the "renderer" process.
