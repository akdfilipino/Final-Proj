var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());

var userRoutes = require("./routes/user");
var productRoutes = require("./routes/product");
var orderRoutes = require("./routes/order");
var cartRoutes = require("./routes/customerCart");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
//Mongoose connection
//mongoose.connect("mongodb://localhost:27017/database");

mongoose.connect(
  "mongodb+srv://angelokail:CoffeeMonkey@coffeemonkey.4ayjd.mongodb.net/database?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500mb" }));

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/admin", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes.router);
app.use("/carts", cartRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
  //next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
