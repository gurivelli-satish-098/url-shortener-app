const morgan = require("morgan");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/cors");
const registerRoutes = require("./routers");
const errorMiddleware = require("./middlewares/error");

app.use(
  morgan("combined", {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  })
);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
registerRoutes(app);

// Global error handling
app.use(errorMiddleware);

module.exports = app;
