import Joi from "joi";

export const eventSchema = Joi.object({
    date: Joi.string().min(8).pattern(new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)).required().error(new Error('Date must be like DD/MM/YYYY')),
    time: Joi.string().pattern(new RegExp(/^(?:[01]?\d|2[0-3])(?::[0-5]\d){1,2}$/)).required().error(new Error('Time must be like HH:MM')),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    type: Joi.valid('Online', 'Offline'),
    link: Joi.string(),
    owner: Joi.string().required(),
    proffesion: Joi.string().required(),
    tel: Joi.string().pattern(new RegExp(/^998[389][0123456789][0-9]{7}$/)).required(),
    description: Joi.string().min(5).max(64).required(),
    body: Joi.string().min(15).max(150).required(),
    image: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)).max(3000000).required().error(new Error('Not correct format or size'))
})

export const loginSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().min(8).required()
})