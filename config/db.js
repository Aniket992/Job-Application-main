import mongoose from "mongoose";
import colors from 'colors'
const connectDB = async() => {
    try {
 const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL)
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgRed.white);
    }
};
export default connectDB;