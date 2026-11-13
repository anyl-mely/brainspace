// server/src/modules/notes/note.route.ts
import { Router } from 'express';
import { validateBody } from '../../middlewares/validateRequest';
import { requireAuth } from '../../middlewares/requireAuth';
import { createNoteSchema, updateNoteSchema } from './note.schema';
import { noteController } from './note.controller';

const noteRouter = Router();

// Khóa toàn bộ API ghi chú: bắt buộc đăng nhập mới được truy cập
noteRouter.use(requireAuth);

noteRouter.get('/', noteController.getAll);
noteRouter.post('/', validateBody(createNoteSchema), noteController.create);
noteRouter.patch('/:id', validateBody(updateNoteSchema), noteController.update);
noteRouter.delete('/:id', noteController.remove);

export default noteRouter;