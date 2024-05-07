//packages imports
import express from "express";
import 'express-async-errors';
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from 'morgan';
import bodyparser from "body-parser";

//securty packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//files imports
import connectDB from "./config/db.js";

//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from "./middlewares/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import ApplicationRoutes from './routes/ApplicationRoutes.js'
// import bodyParser from "body-parser";
//dot env config
dotenv.config();



//mongodb connection
connectDB();

//rest object
const app = express();



//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors(

    {
        origin: 'https://server-git-main-aniket992s-projects.vercel.app',

        methods:["POST","GET","DELETE","PATCH","PUT"],

        credentials: true
    }


));
app.use(morgan("dev"));


// routes(
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",ApplicationRoutes);

app.get("/", (req, res) => {
    res.send("Hello! The backend is running.");
  });

//validation middelware
app.use(errorMiddelware);


//port
const PORT = process.env.PORT||8080
// listen
app.listen(PORT,()=>{
    console.log(`Node Server is running in ${process.env.DEV_MODE} on port no ${PORT}`.bgCyan.white);
        
    
});