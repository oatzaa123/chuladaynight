const express = require("express");
const path = require("path");
const configs = require("./configs/app");
const ErrorHandler = require("./helpers/errorHandler");
const globalErrorHandler = require("./helpers/errorController");
const AppRoutes = require("./modules/web/index");

const app = express();

require("./configs/express")(app);
app.use("/api_v1", AppRoutes);

app.use(
  "/api_v1/images",
  express.static(path.join(__dirname, "./assets/uploads/images"))
);

app.use(
  "/api_v1/videos",
  express.static(path.join(__dirname, "./assets/uploads/videos"))
);

app.use(
  "/api_v1/models",
  express.static(path.join(__dirname, "./assets/uploads/models"))
);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

app.listen(configs.port, () =>
  console.log(`Server is running on port : ${configs.port}`)
);
