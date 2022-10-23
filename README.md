# shoppyhook
Really simple and lightweight shoppy webhook middleware for express.

## Install
```
npm i shoppyhook
```

## Usage
### Warning! You need to disable any parser for the webhook route, otherwise it will not work (requires raw unparsed body).
```js
//use this instead of just app.use(express.json())
app.use((req, res, next) => req.path != "/v1/shoppy/endpoint" ? express.json(req, res, next) : next())
//or just dont use json parser at all if youre using it on all the routes
```

```js
const shoppyhook = require("shoppyhook")

//single route
app.use("/v1/shoppy/endpoint", shoppyhook({ secret: "your secret" }))

//all routes
app.use(shoppyhook({ secret: "your secret" }))
```