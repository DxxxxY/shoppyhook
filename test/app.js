const express = require("express")
const app = express()
const shoppyhook = require("../index")

app.use(shoppyhook("qzHAkNaKmeOaNKK8"))

app.get("/", (req, res) => {
    res.send(req.body)
})

app.listen(3000)