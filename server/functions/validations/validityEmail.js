const Joi = require('joi');


const validationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Некорректный email",
            "any.required": "Email обязателен",
        }),
});


const validateUserData = (data) => {
    return validationSchema.validate(data, { abortEarly: false });
};

module.exports = validateUserData;