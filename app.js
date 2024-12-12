import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbConnect.js"
// Router
import productsRouter from "./routes/product.js"
import userRouter from "./routes/auth.js"
import errorMiddleware from "./middleware/errors.js"

import cookieParser from "cookie-parser"

import User from "./model/User.js"
// default named import istediyimizi qoya bilerik

dotenv.config({
    path: "config/config.env"
})

// Temporal Dead Zone (TDZ)
// Hoisting qaydalari pozulur , const ve let hoist olunur , amma birinci yaradilmali , sonra cagirilmalidir 
// var qlobal muhitde hoisting olunur , xeta yaranma ehtimal yuksekdi
const app = express()


app.use(cors ({
    origin: "http://localhost:5173" ,
    methods: ["GET" , "POST" , "PUT" , "DELETE"] ,
    credentials: true
}));



connectDatabase()

app.use(express.json());

// import productRoutes from "..routes/product.js"

//cookieParser() cagiririq , amma routedan once . Cunki  evvelce girish eden adamin kimliyi mueyyenlesdirilmeli
//daha sonra girisi istek ata biler
app.use(cookieParser())

app.use("/api/v1", productsRouter)
app.use("/crud/v1", userRouter)


// Tetbiq seviyyesinde (Application levelde) istifade edirik
app.use(errorMiddleware)
app.listen(process.env.PORT, () => console.log("Server " + process.env.PORT + "ci portda calisir"))




