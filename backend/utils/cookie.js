import ErrorHandler from "../middlewares/errorMiddleware.js";

export const generateCookie = (user, token, statusCode, message, res) => {
  try {
    if (!user || !token || !statusCode || !message || !res) {
      return next(new ErrorHandler("Missing Required Parameters", 400));
    }

    /*Check for CookieExpires value*/
    const cookieExpires = process.env.COOKIE_EXPIRES
      ? parseInt(process.env.COOKIE_EXPIRES, 10)
      : 7;

    if (isNaN(cookieExpires) || cookieExpires <= 0) {
      return next(
        new ErrorHandler(
          "Invalid COOKIE_EXPIRES value in environment variables.",
          400
        )
      );
    }
    /*Check complete*/

    const cookieName = "AccessToken";

    res
      .status(statusCode)
      .cookie(cookieName, token, {
        httpOnly: true,
        maxAge: cookieExpires * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: message,
        user,
      });
  } catch (err) {
    console.log("Error in generating cookies", err);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};
