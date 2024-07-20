import mongoose from "mongoose";

export const dbConnection = async () => {
    
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "Todo-app",
        })
        console.log(`Database Connected!! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(err){
        console.log("Error occured while connecting to Database!", err)
    }
}
