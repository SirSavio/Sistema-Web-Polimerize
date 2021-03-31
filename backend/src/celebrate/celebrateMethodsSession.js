const { Segments, Joi } = require("celebrate");

exports.createSession = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }),
}