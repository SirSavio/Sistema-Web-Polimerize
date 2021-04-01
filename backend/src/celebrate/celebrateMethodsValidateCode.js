const { Segments, Joi } = require("celebrate");

exports.indexValidateCode = {
    [Segments.PARAMS]: Joi.object().keys({
        code: Joi.string().required()
    }),
}
