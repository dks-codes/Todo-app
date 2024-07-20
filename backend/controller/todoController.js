import { Todo } from "../models/todoModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const addTodo = async (req, res, next) => {
  try {
    console.log("User", req.user.id);
    const { title, description, priority } = req.body;
    if (!title || !description) {
      return next(new ErrorHandler("Please fill Title and Description", 400));
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      userId: req.user.id,
    });

    console.log(todo);

    res.status(201).json({
      success: true,
      todo,
    });
  } catch (err) {
    return next(new ErrorHandler(`Error creating todo: ${err.message}`, 500));
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    if (!todos.length) {
      return res.status(200).json({
        success: true,
        message: "No Todos Found",
        todos: [],
      });
    }
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    return next(new ErrorHandler("Error Fetching Todos", 500));
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return next(new ErrorHandler("Todo Not Found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (err) {
    return next(new ErrorHandler("Error Updating Todo!", 500));
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) {
      return next(new ErrorHandler("Todo not found!", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } catch (err) {
    return next(new ErrorHandler("Error Deleting Todo!", 500));
  }
};
