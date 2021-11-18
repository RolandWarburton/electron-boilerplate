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

Parcel `npm run start:parcel` looks at `./src/index.html` which requires `./src/app/index.tsx` and compiles the react-typescript into `./dist`.

`./src/electron/*` contains scripts to run the electron app. This also needs to be compiled, but is not required for hot-reload of the electron-react app.
You only need to recompile this when you change some electron specific code/behaviour.

`./src/electron/main.ts` also references `src/index.html`, electron loads the compiled react code from `dist/index.js` as its requested by the html.
Thats how when you run the electron app you see react components!

Even though in `src/index.html` appears to have a script tag that loads `./src/index.tsx`, this is actually compiled (handled) by parcel.
Behind the scenes, parcel is actually placing `src/index.html -> dist/index.html` and it changes its script tags to point to the compiled react code.

**WAIT!!!** How does Electron know where to get to `dist`, when our script for `start:electron` is calling `electron .`.
This is because inside `package.json` there is a `{ main: "dist-electron/main.js" }`, remember back to 3 paragraphs ago when we mentioned `./src/electron/main.js` and that this needs to be compiled. This is compiled with `npm run build-electron-scripts` which just happens to place the compiled code in `./dist-electron/main.js`. Now we know how electron finds the right (compiled) code to run when we call it.

So with that said, we can run these npm scripts in a particular order and get development up and running.

1. Run `npm run build-electron-scripts` to compile the electron main.js file from TS to JS so that we can call it in the next command.
2. Run `npm run start:parcel` to start compiling and watching for changes in our **react** code
3. Run `npm run start:electron` to start the electron app, which runs dist-electron/main.js.

## Logging

Logging in `src/electron/main.js` logs to the terminal console. This is known as the "main" process.

Logging in `src/index.html` (and subsequent react components) logs to the browser console. This is known as the "renderer" process.
