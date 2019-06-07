const Joi = require("@hapi/joi");

const createSchema = Joi.object().keys({
    code: Joi.string().min(2).max(2).required(),
    name: Joi.string().min(2).required()
})

const updateSchema = Joi.object().keys({
    name: Joi.string().min(2)
})

module.exports = {
    createSchema,
    updateSchema
}