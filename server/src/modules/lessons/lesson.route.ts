// server/src/modules/lessons/lesson.route.ts
import { Router } from 'express';
import { validateBody } from '../../middlewares/validateRequest';
import { requireAuth } from '../../middlewares/requireAuth';
import { updateLessonStatusSchema } from './lesson.schema';
import { lessonController } from './lesson.controller';

const lessonRouter = Router();

lessonRouter.use(requireAuth);

lessonRouter.get('/', lessonController.getAll);
lessonRouter.get('/:id', lessonController.getById);
lessonRouter.patch(
    '/:id/completion',
    validateBody(updateLessonStatusSchema),
    lessonController.updateCompletion
);

export default lessonRouter;