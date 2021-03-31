const { celebrate, Segments, Joi } = require("celebrate");

exports.createSample = {
    [Segments.BODY]: Joi.object().keys({
        patientName: Joi.string().required().max(60),
        description: Joi.string().required().max(500),
        state: Joi.string().required().max(60)
    })
}

exports.changeSampleId = {
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        state: Joi.string().required().max(60)
    })

}