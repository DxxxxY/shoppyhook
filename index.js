const crypto = require("crypto")

module.exports = options => {
    return (req, res, next) => {
        req.rawBody = ""

        req.on("data", (chunk) => {
            req.rawBody += chunk
        })

        req.on("end", () => {
            try {
                req.body = JSON.parse(req.rawBody)

                if (!req.headers["x-shoppy-signature"]) return res.status(400).send("Missing signature header")

                const hmac = crypto.createHmac("sha512", options.secret)
                const signed = hmac.update(Buffer.from(req.rawBody, "utf-8")).digest("hex")

                if (signed !== req.headers["x-shoppy-signature"]) return res.status(401).send("Invalid signature")

                // console.log("Valid signature")

                next()
            } catch (err) {
                // console.log("Error parsing body")
                next()
            }
        })
    }
}