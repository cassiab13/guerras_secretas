const Joi = require('joi');

const updateCharacterDto = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    modified: Joi.date().timestamp(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).optional(),
    comics: Joi.array().items(Joi.objectId()).optional(),
    stories: Joi.array().items(Joi.objectId()).optional(),
    events: Joi.array().items(Joi.objectId()).optional(),
    series: Joi.array().items(Joi.objectId()).optional()
});

export { updateCharacterDto };
