import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";
import { generateCookie } from "../utils/cookie.js";
import { generateJsonWebToken } from "../utils/jwtTokenGeneration.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      if (user.email === email) {
        return next(
          new ErrorHandler("User with same Email Already Exists!", 400)
        );
      }
      if (user.phone === phone) {
        return next(
          new ErrorHandler("User with same Phone Number Already Exists!", 400)
        );
      }
    }

    user = await User.create({ name, email, phone, password });

    //To remove password from the result while sending the response
    user = user.toObject();
    delete user.password;

    const payload = { id: user._id };
    const token = generateJsonWebToken(payload);
    generateCookie(user, token, 201, "User registered successfully", res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const login = async (req, res, next) => {
  const { email, phone, password } = req.body;

  if ((!email && !phone) || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let user = await User.findOne({ $or: [{ email }, { phone }] }).select(
    "+password"
  );

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials!!", 400));
  }
  const matchPassword = await user.comparePassword(password);
  if (!matchPassword) {
    return next(new ErrorHandler("Invalid Credentials!!", 400));
  }

  user = user.toObject();
  delete user.password;

  const payload = { id: user._id };
  const token = generateJsonWebToken(payload);
  generateCookie(user, token, 200, "User Logged in Successfully", res);
};

export const logout = async (req, res, next) => {
  res.cookie("AccessToken", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
