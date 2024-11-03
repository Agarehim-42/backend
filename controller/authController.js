import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../model/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
// qeydiyyatdan kecmek asinxron prosesdir 
export const registerUser = catchAsyncErrors(async(req , res , next)=> {
    // Wireshark , Burp Suite , 
    const {name , email , password} = req.body  //req.body burda ir insanin yazdigi adi , soyadi , passwordu kimi gedir 
    const user = await User.create({name , email , password  }) //one line killers kod


    // const token = user.jwtTokeniEldeEt()

    // res.status(201).json({
    //     success:true,
    //     token
    // }) 

    sendToken(user , 201 , res)

})

export const login = catchAsyncErrors( async(req , res , next)=> {
    const {email , password} = req.body

    if(!email || !password) {
        return next(new ErrorHandler("Zehmet olmasa emaili ve yaxud shifreni daxil edin" , 400))
    }


    const user = await User.findOne({email}).select("+password")

    if(!user) {
        return next(new ErrorHandler("Bele bir emaili olan istifadeci tapilmadi" , 401))
    }

    const isPasswordMatched = await user.shifreleriMuqayiseEt(password)

    if(!isPasswordMatched) {
        // ErrorHandler ireli seviyyede xeta ele alinmasi
        return next(new ErrorHandler("Shifre Yanlisdir" , 401))
    }

    // const token = user.jwtTokeniEldeEt()
//before
        // res.status(200).json({
        //     token
        // })

        sendToken(user , 200 , res)


})


export const logout = catchAsyncErrors( async(req , res , next) => {
    res.cookie("token" , null , {
        expires : new Date(Date.now()) ,
        httpOnly:true
    })
    
    res.status(200).json({
        message: "Ugurla cixish edildi"
    })
})















//Object desructuring

// const telebe = {
//     ad:"Rufet" , 
//     soyad:"Elekberli"
// }
//dede baba usulu 

// const { ad, soyad} = telebe //obyektin parcalanmasi


// //Array Object Destructuring
// const telebeler = [ "Tahir" , "Murad" , "Asim"]
// // console.log(telebeler[0])

// const [t1 , , t3] = telebeler
