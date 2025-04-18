const express = require("express");
require("express-async-errors");
const cors = require("./app/middlewares/cors");
const routes = require("./routes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors);
app.use(routes);
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(3000, () =>
  console.log("🔥 Server started at http://localhost:3000")
);
