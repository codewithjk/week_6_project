const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const path = require("path");
const userRouter = require("./server/routes/userRouter");
const adminRouter = require("./server/routes/adminRouter");
const connectDB = require("./server/database/connection");
const session = require("express-session");
const nocache = require("nocache");
const { v4: uuidv4 } = require("uuid");

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
//prevent backward
app.use(nocache());
//sessiion middleware
app.use(
  session({
    secret: uuidv4(),
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 600000 }, // session timeout of 60 seconds
  })
);

app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
