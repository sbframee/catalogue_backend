require("dotenv").config()

const cors = require("cors")
const express = require("express")
const morgan = require("morgan")
const connectDB = require("./config/mongoDb")

const bodyParser = require("body-parser")
const organization = require("./Routes/Organization")
const ItemCategories = require("./Routes/ItemCategories")
const Items = require("./Routes/Items")
const { putObjectURL, getObjectURL, deleteObject } = require("./s3")

connectDB()
app = express()
app.use(
	cors({
		origin: "*",
		credentials: true
	})
)

// app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }))
app.use(
	bodyParser.urlencoded({
		limit: "100mb",
		extended: true,
		parameterLimit: 50000
	})
)
app.use(morgan("dev"))
app.use("/Organization", organization)
app.use("/ItemCategories", ItemCategories)
app.use("/Items", Items)

app.delete("/s3/delete_object/:key", async (req, res) => {
	const { key } = req.params
	await deleteObject(key)
	res.send("Done")
})
app.get("/s3/object_url/:key", async (req, res) => {
	const { key } = req.params
	const url = await getObjectURL(key)
	res.redirect(url)
})
app.post("/s3/upload_url", async (req, res) => {
	const { filename, contentType } = await req.body
	const url = await putObjectURL(filename, contentType)
	res.send({ url })
})

module.exports = app
