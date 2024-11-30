import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../model/User.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto"



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






export const forgotPassword = catchAsyncErrors( async(req , res , next) => {
    const user = await User.findOne({email:req.body.email})

    if(!user) {
        return next(new ErrorHandler("Istifadeci tapilmadi" , 404))
    }
    

    const resetToken = user.getResetPasswordToken()
    //save bir metoddan istifde edirik - bazaya yazan metod
    //arashdir - ne ucun istifade edilir ? 
    await user.save()

    //linkin yaradilma merhelesi 
    const resetUrl = `${process.env.FRONTEND_URL}/crud/v1/password/reset/token/${resetToken}`
    const message = getResetPasswordTemplate(user?.name,resetUrl)



    //promise chaining .then mesajin gonderilme formalari

try {
    await sendEmail({
        email: user?.email,
        subject: "SHIFRENIN SIFIRLANMASI" ,
        message 

    })
    res.status(200).json({
        message:"Emailinizi check edin"
    })
}

catch(err) {
    //IMPORTANT!!!
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save() 
    return next( new ErrorHandler("Serverde gozlenilmeyen xeta bas verdi" , 500))
}

})

export const resetPassword = catchAsyncErrors( async(req , res , next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req?.params?.token).digest("hex")
///as56adf65ad65a
    const user = await User.findOne({
        resetPasswordToken , 
        // $gt greater than , $lt less than , $gte greater than or equal , $lte 
        resetPasswordExpire: { $gt: Date.now()} , 
    })

    if (!user) {
        return next(new ErrorHandler("Reset token is invalid or has been expired" , 400)) 
    }

    if(req.body.password !==req.body.confirmPassword) {
        return next(new ErrorHandler("Shifreler Uygunlasmir" , 400))
    }

    user.password = req.body.password


    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    sendToken(user,200 , res)
    
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

