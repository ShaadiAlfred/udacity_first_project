# Image Processing API

An API that uses [sharp](https://github.com/lovell/sharp) to generate thumbnails.

## Usage

`GET /api/images?filename={filename}&width={width}&height={height}`

### Notes

- >If the `filename` doesn't include an extension, `.jpg` will be assumed.

- >The API caches the first generated thumbnail only, and if the requested dimensions are different than the cached image, the response will have the correct dimensions, but the cached image will be the same with the old dimensions. Caching happens only once for each image.

## npm scripts

- ### `npm run start`

Starts the server, intended to be run in production

- ### `npm run dev`

Starts nodemon with ts-node support, so it updates whenever any `*.ts` files are modified

- ### `npm run build`

Builds the files in the `src` directory, and outputs the transpiled `JavaScript` code into the `dist` directory

- ### `npm run jasmine`

Runs jasmine.

#### Note

>Doesn't build the project before running the tests, it just runs the tests directly

- ### `npm run test`

Builds the project, and then runs the jasmine tests

- ### `npm run lint`

Lints the project (just the `src` folder and its subdirectories) and shows the linting results

#### Note

>ESLint is configured to use Prettier rules as linting rules too

- ### `npm run lintf`

Lints and fixes any issues found in the code