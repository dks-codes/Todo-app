import { app } from "./app.js";
import { dbConnection } from "./database/dbConfig.js";

const PORT = process.env.PORT || 4000;
const SERVER_URL = `http://localhost:${PORT}`;

(async function () {
  try {
    await dbConnection();

    app.on("error", (err) => {
      console.log("Express app intialization error", err);
    });
    app.listen(PORT, () => {
      console.log("Server started at: ", SERVER_URL);
    });
  } catch (err) {
    console.log("MongoDB connection failed: ", err);
  }
})();
