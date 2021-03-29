const express = require('express');
const { celebrate, Segments, Joi } = require("celebrate");

exports.indexAdmin = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}

exports.createAdmin = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }),
    //Métrica para que um admin so pode ser criado por outro admin logado
    /* 
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    */
}

exports.changeAdmin = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        email: Joi.string().required().email().max(60),
        //Mínimo de oito caracteres, pelo menos uma letra e um número:
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        passwordConfirmation: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    })
}