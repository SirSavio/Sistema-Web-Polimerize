const { Segments, Joi } = require("celebrate");

exports.indexValidateCode = {
    [Segments.BODY]: Joi.object().keys({
        code: Joi.string().required().max(1)
    }),
}
