import { Character } from './../types/character.types';
import { Router } from 'express';
import characterModel from '../schema/character.schema';
import { CharacterService } from './../service/character.service';
import { CharacterRepository } from './../repository/character.repository';
import { CharacterController } from './../controller/character.controller';

const characterRoutes = Router();

const characterRepository: CharacterRepository = new CharacterRepository(
    characterModel
);
const characterService: CharacterService = new CharacterService(
    characterRepository
);
const characterController: CharacterController = new CharacterController(
    characterService
);

characterRoutes.get('', characterController.findAll.bind(characterController));
characterRoutes.post('', characterController.create.bind(characterController));
characterRoutes.get(
    '/:id',
    characterController.findById.bind(characterController)
);
characterRoutes.put(
    '/:id',
    characterController.update.bind(characterController)
);
characterRoutes.delete(
    '/:id',
    characterController.delete.bind(characterController)
);
characterRoutes.get(
    '/:id/comics',
    characterController.findComicsByCharacter.bind(characterController)
);
characterRoutes.get(
    '/:id/series',
    characterController.findSeriesByCharacter.bind(characterController)
);
characterRoutes.get(
    '/:id/thumbnail',
    characterController.findThumbnail.bind(characterController)
);

export { characterRoutes };
