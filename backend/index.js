import express from "express";
import dotenv from "dotenv" ;
dotenv.config({});
import db from "./config/connect.db.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import cors from "cors";

const app = express();

// middlewares
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors());
app.use(express.json());

//api
app.use("/api/v1/school", schoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
    db.connect();
});