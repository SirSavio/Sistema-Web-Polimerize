const express = require('express');
const { celebrate, Segments, Joi } = require("celebrate");  

exports.IndexProcess = {
    [Segments.BODY]: Joi.object().keys({
        id_sample: Joi.string().required().min(10)
    })
}

exports.createProcess = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        describe: Joi.string().max(255),
        id_sample: Joi.string().required()
    })
}

exports.changeChange = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(60),
        describe: Joi.string().max(255),
        id: Joi.string().required()
    })
}