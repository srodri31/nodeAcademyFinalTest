const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const countries = require("./routes/countriesRoutes");
const regions = require("./routes/regionsRoutes");
const cities = require("./routes/citiesRoutes");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/countries", countries)
app.use("/regions", regions);
app.use("/cities", cities);

app.listen(3000, () => console.log("Listening on port 3000"));
