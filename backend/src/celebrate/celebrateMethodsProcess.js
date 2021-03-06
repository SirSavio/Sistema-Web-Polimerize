const { Segments, Joi } = require("celebrate");  

exports.IndexProcess = {
    [Segments.PARAMS]: Joi.object().keys({
        id_sample: Joi.string().required()
    })
}

exports.createProcess = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        describe: Joi.string().max(255),
        admin_name: Joi.string().max(255),
        id_sample: Joi.number().required()
    })
}

exports.changeChange = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        describe: Joi.string().max(255),
        admin_name: Joi.string().max(255),
        id: Joi.string().required()
    })
}