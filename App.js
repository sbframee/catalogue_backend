const cors = require("cors");
const express = require("express");
const connectDB = require("./config/mongoDb");
const morgan = require("morgan");
const env = require("dotenv");
var bodyParser = require("body-parser");
const organization = require("./Routes/Organization");
const ItemCategories = require("./Routes/ItemCategories");
const Items = require("./Routes/Items");
const generateUploadURL= require("./s3")
env.config()
connectDB();
app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(morgan("dev"));
app.use("/Organization", organization);
app.use("/ItemCategories", ItemCategories);
app.use("/Items", Items);
app.get('/s3Url',async(req,res)=>{
  const url = await generateUploadURL()
  res.send({url})
})
module.exports = app;