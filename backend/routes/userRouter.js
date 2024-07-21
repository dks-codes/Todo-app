import express from "express";
import { signup, login, logout } from "../controller/userController.js";

export const userRouter = express.Router();
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User Signup
 *     description: Registers a new user with a name, email, phone number, and password. The email and phone number must be unique.
 *     tags: [User]
 *     security: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user. Must be unique
 *               phone:
 *                 type: string
 *                 description: Phone number of the user. Must be unique.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *             example:
 *               name: John Doe
 *               email: john.doe@example.com
 *               phone: +1234567890
 *               password: StrongP@ssw0rd
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Registered Successfully
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       400:
 *         description: Bad request due to Existing user with same Email or Phone number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid Credentials!!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error!!
 */
userRouter.post("/signup", signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User Login
 *     description: Logs in a user with either an email or phone number and a password. Only one of email or phone is required.
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user. Provide this if you are using email to log in.
 *               phone:
 *                 type: string
 *                 description: Phone number of the user. Provide this if you are using phone to log in.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *             example:
 *               email: user@example.com
 *               # Or
 *               phone: +1234567890
 *               password: MyP@ssw0rd
 *     responses:
 *       201:
 *         description: User Logged In successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Logged In Successfully
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       400:
 *         description: Bad request due to missing fields or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid Credentials!!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error!!
 */
userRouter.post("/login", login);


/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User Logout
 *     description: Logs out a user by clearing the authentication cookie.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User Logged Out Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Logged Out Successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error occurred while logging out
 */
userRouter.post("/logout", logout);
