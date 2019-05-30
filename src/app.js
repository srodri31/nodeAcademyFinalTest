const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const countries = require("./routes/countriesRoutes");
const regions = require("./routes/regionsRoutes");
const cities = require("./routes/citiesRoutes");
const sisters = require("./routes/sistersRoutes");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/countries", countries)
app.use("/regions", regions);
app.use("/cities", cities);
app.use("/sisters", sisters);

app.listen(3000, () => console.log("Listening on port 3000"));
