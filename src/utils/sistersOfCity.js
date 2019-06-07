const Sister = require("../models/sister");
const Sequelize = require("sequelize");

async function sistersOf(city) {
    let sisters = await Sister.findAll({
        where: Sequelize.or(
            {city1: city.code},
            {city2: city.code}
        )
    })
    city.sisters = sisters.map(record => record.city1 === city.code ? record.city2 : record.city1);
    return city;
} 

module.exports = sistersOf;