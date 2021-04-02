const { Segments, Joi } = require("celebrate");

exports.IndexSample = {
	[Segments.PARAMS]: Joi.object().keys({
		code: Joi.string().required()
	})
}

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