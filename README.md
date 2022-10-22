# shoppyhook
Really simple and lightweight shoppy webhook middleware for express.

## Install
```
npm i shoppyhook
```

## Usage
```js
const shoppyhook = require("shoppyhook")

//single route
app.use("/v1/shoppy/endpoint", shoppyhook({ secret: "your secret" }))

//all routes
app.use(shoppyhook({ secret: "your secret" }))
```