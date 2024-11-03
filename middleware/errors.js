
import ErrorHandler from "../utils/errorHandler.js"
export default (err , req , res , next) => {
    let error = {
        statusCode: err?.statusCode || 500 ,
        mesaage: err?.mesaage || "Internal Service Error"
    }

    if(err.name == "CastError") {
        // Object.keys() ; Object.entries() ; Object.values()
        const message = Object.values(`Resurs tapilmadi ${err?.path}`)
        error = new ErrorHandler(message , 400)
    }

    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.mesaage) 
    // 400 bad request
        error = new ErrorHandler(message , 400)
    }

    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json( {
message: error.mesaage , 
error: err ,
// stack xetanin yerlesdiyi yerdir 
// ?. optional chaining
stack: err?.stack

        })
    }
    if(process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json( {
        message: error.mesaage 
        })
    }
}