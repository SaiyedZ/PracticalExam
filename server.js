const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");

const db = require("./config/database");

const port = 3000 ;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views/pages"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/assets")));

app.use("/", require("./routers"));

app.get('/', (req, res) => {
    res.redirect('/auth/register');
  });
app.listen(port, (err) => {
    if (!err) {
      db();
      console.log("Listening on port");
      console.log("http://localhost:" + port);
    }
  });