import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js";

export const isUserAuthenticated = async (req, res, next) => {
  const token = req.cookies.AccessToken;

  if (!token) {
    return next(new ErrorHandler("User not authenticated!", 401));
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log('Decoded Token:', decoded);

    req.user = await User.findById(decoded.id);
    //console.log('User Found: ', req.user);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    return next();
  } catch (error) {
    console.error("Authentication error: ", error);
    return next(new ErrorHandler("Invalid Token or Token has expired!", 401));
  }
};
