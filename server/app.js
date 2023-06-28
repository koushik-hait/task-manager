const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//create a new express instance
const app = express();

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//cross origin checks
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

//cookies and file middleware
app.use(cookieParser());

//temp check
app.set("view engine", "ejs");

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const user = require("./routes/user");
const task = require("./routes/task");


//router middleware
app.use("/api/v1", user);
app.use("/api/v1", task);

app.get("/", (req, res) => {
  res.render("home");
});

// export app js
module.exports = app;
