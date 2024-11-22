import { Router } from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/multer.js';

import { ROLES } from '../constants/index.js';

import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get('/',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY),
  ctrlWrapper(getStudentsController));

router.get(
  '/:studentId',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY, ROLES.STUDENT),
  isValidId,
  ctrlWrapper(getStudentByIdController)
);

router.post(
  '/register',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY),
  isValidId, // I don't know need it
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/:studentId',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY),
  isValidId,
  ctrlWrapper(deleteStudentController));

router.put(
  '/:studentId',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY),
  isValidId,
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  checkRoles(ROLES.ADMIN, ROLES.SECRETARY, ROLES.STUDENT),
  isValidId,
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
