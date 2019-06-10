const Joi = require("@hapi/joi");

const createSchema = Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    population: Joi.number().integer().required(),
    region: Joi.string().required(),
    country: Joi.string().min(2).max(2).required()
})

const updateSchema = Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    population: Joi.number().integer(),
    region: Joi.string(),
    country: Joi.string().min(2).max(2)
})

module.exports = {
    createSchema,
    updateSchema
}