# shoppyhook
A really simple and lightweight shoppy webhook middleware for express. It will only let webhook requests pass that have a valid signature, meaning that faking purchase webhooks is not possible (provided that you do not leak your secret). The body will then be available as a JSON object in `req.body`.

## Install
```
npm i shoppyhook
```

## Usage
```js
const shoppyhook = require("shoppyhook")

//single route
app.use("/v1/shoppy/endpoint", shoppyhook("your secret"))

//all routes
app.use(shoppyhook("your secret"))
```

## Parser problems
You need to disable any parser for the webhook route, otherwise it will not work (requires raw unparsed body).
```js
//use this instead of just app.use(express.json())
app.use((req, res, next) => req.path != "/v1/shoppy/endpoint" ? express.json(req, res, next) : next())
//or just dont use json parser at all if youre using it on all the routes
```