const Joi = require('joi');


const validationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Некорректный email",
            "any.required": "Email обязателен",
        }),

    password: Joi.string()
        .min(8)
        .max(32)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "string.min": "Пароль должен содержать минимум 8 символов",
            "string.max": "Пароль не должен превышать 32 символа",
            "string.pattern.base":
                "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол",
            "any.required": "Пароль обязателен",
        }),

    phoneNumber: Joi.string()
        .pattern(/^\+?[1-9]\d{1,14}$/)
        .required()
        .messages({
            "string.pattern.base": "Некорректный номер телефона",
            "any.required": "Телефон обязателен",
        }),
});


const validateUserData = (data) => {
    return validationSchema.validate(data, { abortEarly: false });
};

module.exports = validateUserData;