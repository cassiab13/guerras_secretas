const Joi = require('joi-oid');

const UpdateEventDTO = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    modified: Joi.date().timestamp(),
    start: Joi.number().integer().optional(),
    end: Joi.number().integer().optional(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).optional(),
    comics: Joi.array().items(Joi.objectId()).optional(),
    stories: Joi.array().items(Joi.objectId()).optional(),
    series: Joi.array().items(Joi.objectId()).optional(),
    characters: Joi.array().items(Joi.objectId()).optional(),
    creators: Joi.array().items(Joi.objectId()).optional()
});

export { UpdateEventDTO };
