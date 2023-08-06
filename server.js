require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const ejs = require("ejs");
const { isuserAuth } = require("./controller/Users");
const homeRout = require("./routes/Home");
const userRout = require("./routes/Users");
const postRout = require("./routes/Posts");
const profileRout = require("./routes/Profile");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const path = require("path");
const DB_USER = process.env.DATABASEUSER;
const DB_PASS = process.env.DATABASEPASS;
const DB_NAME = process.env.DATABASENAME;
const mongouri = `mongodb+srv://${DB_USER}:${DB_PASS}@cmscluster.mrdvayd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const mongouri = `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((e) => console.log("not connected" + e));
// Set static path
const absPath = path.join(__dirname, "public");
app.use(express.static(absPath));

// Set view Engine
app.set("view engine", "ejs");
app.set("views", absPath + "/views");
// Body parser
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// create user login session
const store = new mongoSession({
  uri: mongouri,
  collection: "usersession",
});

app.use(
  session({
    secret: "9ey46oxdhsiw74iknaloa,mwo0934@908789",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/profile", isuserAuth, profileRout.rout);
app.use("/users", userRout.rout);
app.use("/posts", postRout.rout);
app.use("/", homeRout.rout);

app.listen(PORT, () => {
  console.log("Server is Started at port : " + PORT);
});
