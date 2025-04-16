const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const productsRouter = require("./routes/products.router");
const usersRouter = require("./routes/users.router");

const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.json(JSend.success());
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/public", express.static("public"));
productsRouter.setup(app);
usersRouter.setup(app); // modify

//404
app.use(resourceNotFound);
//define
app.use(handleError);

module.exports = app;
