const cors = require("cors")
const express = require("express")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const connectDB = require("./config/mongoDb")
const morgan = require("morgan")
const env = require("dotenv")
var bodyParser = require("body-parser")
const organization = require("./Routes/Organization")
const ItemCategories = require("./Routes/ItemCategories")
const Items = require("./Routes/Items")
const { putObjectURL, getObjectURL, deleteObject } = require("./s3")
env.config()
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

app.get("/s3/delete_object/:key", async (req, res) => {
	const { key } = req.params
	await deleteObject(key)
	res.send("Done")
})
app.get("/s3/object_url/:key", async (req, res) => {
	const { key } = req.params
	const url = await getObjectURL(key)
	res.send({ url })
})
app.get("/s3/upload_url", async (req, res) => {
	const { filename, contentType } = await req.body
	const url = await putObjectURL(filename, contentType)
	res.send({ url })
})

module.exports = app
