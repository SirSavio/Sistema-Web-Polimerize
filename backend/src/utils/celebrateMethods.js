const express = require('express');
const { celebrate, Segments, Joi } = require("celebrate");

exports.createAdmin = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }),
}

exports.changeAdmin = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }),
}

exports.createSession = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }),
}