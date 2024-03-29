if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

const app = express();

app.use(expressLayouts);
app.use(express.static("public"));
app.use("/", indexRouter);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connected to MongoDB..."));

app.listen(process.env.PORT || 3000);