require("dotenv").config({path: "./.env"});
const express = require("express");
const app = express();
const path = require("path");

// db connection
require("./models/database").connectDatabase();

// logger
const logger = require("morgan");
const ErrorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middlewares/errors");
app.use(logger("tiny"));

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));

app.use(cookieparser());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));



// routes
app.use("/admin", require("./routes/indexRoutes"));
app.use("/user", require("./routes/userRoutes"));


// error handling
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}!`, 404));
});
// 
app.use(generatedErrors);



app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));