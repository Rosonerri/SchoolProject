console.clear()
import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
dotenv.config()
import MongoDB from "connect-mongodb-session"
import session from "express-session";
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet"
// import morgan from "morgan"

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL_ONLINE!,
    collection: "sessions"
})


const app: Application = express()
const port = parseInt(process.env.PORT!);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();  
});

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, 
// 	limit: 5, 
//     message: "limit exceeded, pls try again in 15minutes time!"
// 	// standardHeaders: 'draft-7', 
// 	// legacyHeaders: false, 
// })

// app.use(limiter)
app.use(helmet())
// app.use(morgan("dev"))



app.use(cors({ origin: "http://localhost:5173"}))
app.use(express.json())
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 24 * 60,
            sameSite: "lax",
            secure: false
        },

        store,
    })
)

mainApp(app)

const server = app.listen(process.env.PORT || port, () =>{
    console.log("Listening to port on ", port)
    console.log()
    dbConfig()
});

process.on("uncaughtException", (error: Error) => {
console.log("uncaughtException", error)
process.exit(1)
});

process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection", reason);
    server.close(() => {
        process.exit(1)
    })
});

