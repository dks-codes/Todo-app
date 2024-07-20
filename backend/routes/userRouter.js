import express from 'express';
import { signup, login, logout } from '../controller/userController.js';

export const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);