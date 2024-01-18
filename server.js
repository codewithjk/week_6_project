const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const path = require("path");
const router = require("./server/routes/userRouter");
const connectDB = require("./server/database/connection");

//log request
app.use(morgan("tiny"));

//database connect
connectDB();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//if you want to store ejs file in a directory inside the view directory you should provide the path
//app.set("view engine", path.resolve(__dirname, "view/ejs"));

//load static assets
app.use("/static", express.static(path.resolve(__dirname, "assets")));

app.use("/", router);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
