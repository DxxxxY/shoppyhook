const crypto = require("crypto")

module.exports = secret => {
    return (req, res, next) => {
        req.rawBody = ""

        req.on("data", chunk => {
            req.rawBody += chunk
        })

        req.on("end", () => {
            try {
                req.body = JSON.parse(req.rawBody)

                if (!req.headers["x-shoppy-signature"]) return res.status(400).send("Missing signature header")

                const hmac = crypto.createHmac("sha512", secret)
                const signed = hmac.update(Buffer.from(req.rawBody, "utf-8")).digest("hex")

                if (signed !== req.headers["x-shoppy-signature"]) return res.status(401).send("Invalid signature")

                next() //valid signature
            } catch (err) { //something went wrong
                res.status(500).send("Error during signature verification")
            }
        })
    }
}