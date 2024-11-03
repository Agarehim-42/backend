import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
//jwt verify
// Callstack Heap Stack
export const isAuthenticatedUser = catchAsyncErrors(async(req , res , next) => {
    //const token = req.cookies.token
    // const token = req?.cookies?.token
    // const {token} = req?.cookies
    const token = req?.cookies?.token
    

    try {
        //header //payload //signature tokenin    token 3 saheye bolunur 
        const decoded =  jwt.verify(token , process.env.JWT_SECRET_KEY)
        console.log(decoded)
        // browserdeki userdi burp suite
        //
        req.user = await User.findById(decoded.id)
        next()
    }

    catch(err) {
        return next(new ErrorHandler("Girish etmelisen" , 401))
    }


  
})

//["admin" , "moderator" , "user"]

//Spread [...]

//HTMLCollection ve NodeList
//const buttonlar = document.getElementsByClassName("btns") HTMLCollection [] geriye qaytarir 
//massiv metodlari map filter find reduce forEach
// const arrayaCevrilmishForma = Array.from(buttonlar)
// buttonlar.forEach(btn => {
     
// })

//args arguments = parametrler
//Modul sistemidir (Modul JS)
//["admin" , "user"]
//403 
export const authorizeRoles = (...roles) => {
return (req , res , next ) => {
    if(!roles.includes(req.user.role)) {
    return next(new ErrorHandler(`Senin rolun ${req.user.role} ve senin bu resurslara girish icazen yoxdur!` , 403))
    }

    next()

}
}


//JSON.stringify() burda dirnag olur "ad" : "Leman" vs JSON.parse() burda dirnag olmur ad: "Leman"

//localStorage