const Joi = require("@hapi/joi");

const createSchema = Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    country: Joi.string().min(2).max(2).required()
})

const updateSchema = Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    country: Joi.string().min(2).max(2)
})

module.exports = {
    createSchema,
    updateSchema
}