import { Router } from 'express';
import * as Controller from './auth.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = Router();
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/current-user",authMiddleware, Controller.currentUser);
router.put("/update-profile", authMiddleware, Controller.updateProfile);
router.post("/logout", Controller.logout);

export const AuthRoutes = router;