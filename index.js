const crypto = require("crypto")

module.exports = options => {
    return (req, res, next) => {
        console.log("log")

        req.rawBody = ""

        req.on("data", (chunk) => {
            console.log("chunk")

            req.rawBody += chunk
        })

        req.on("end", () => {
            try {
                req.body = JSON.parse(req.rawBody)

                console.log(req.rawBody)

                if (!req.headers["x-shoppy-signature"]) return

                const hmac = crypto.createHmac("sha512", options.secret)
                const signed = hmac.update(Buffer.from(req.rawBody, "utf-8")).digest("hex")

                if (signed !== req.headers["x-shoppy-signature"]) return

                next()
            } catch (err) {
                console.log("Error parsing body")
                next()
            }
        })

        res.send("ok")
    }
}