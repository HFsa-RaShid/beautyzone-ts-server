import { Router } from 'express';
import * as Controller from './auth.controller.js';

const router = Router();
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/current-user", Controller.currentUser);
router.post("/logout", Controller.logout);

export const AuthRoutes = router;