// server/src/modules/notes/note.route.ts
import { Router } from 'express';
import { validateBody } from '../../middlewares/validateRequest';
import { createNoteSchema, updateNoteSchema } from './note.schema';
import { noteController } from './note.controller';

const noteRouter = Router();

noteRouter.get('/', noteController.getAll);
noteRouter.post('/', validateBody(createNoteSchema), noteController.create);
noteRouter.patch('/:id', validateBody(updateNoteSchema), noteController.update);
noteRouter.delete('/:id', noteController.remove);

export default noteRouter;