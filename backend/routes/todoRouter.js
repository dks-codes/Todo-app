import express from 'express';
import { isUserAuthenticated } from '../middlewares/auth.js';
import { addTodo, deleteTodo, getAllTodos, updateTodo } from '../controller/todoController.js';

export const todoRouter = express.Router();

todoRouter.get('/getAll', isUserAuthenticated, getAllTodos);
todoRouter.post('/add', isUserAuthenticated, addTodo);
todoRouter.put('/update/:id', isUserAuthenticated, updateTodo);
todoRouter.delete('/delete/:id', isUserAuthenticated, deleteTodo);