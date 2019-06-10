const Joi = require("@hapi/joi");

const createSchema = Joi.object().keys({
    city1: Joi.string().required(),
    city2: Joi.string().required()
})

const updateSchema = Joi.object().keys({
    city1: Joi.string(),
    city2: Joi.string()
})

module.exports = {
    createSchema,
    updateSchema
}