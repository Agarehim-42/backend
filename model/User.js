import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto-js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Adinizi daxil edin"],
        maxLength: [50, "Adiniz max 50 simvoldan ibaret olmalidir "]
    },
    email: {
        type: String,
        required: [true, "E-mail daxil edin"],
        unique: true //unikaldir , email hecvaxt tekrarlana bilmez 

    },
    password: {
        type: String,
        required: [true, "Shifrenizi daxil edin"],
        select: false, //Shifrenin goturulmeyin qarsisin alir
        // Bodyden sifreni ceke bilmemek ucun selecte:false yazirig
        minLength: [8, "Shifrenin minimum uzunlugu 8 simvol olmalidir"]

    },

    avatar: {
        public_id: String,
        url: String,

    },

    role: {
        type: String,
        default: "user" //sayta giren adama user yetkisi veririlir

    },

    resetPasswordToken: String, //shifrenin sifirlanmasi , token link sonunda neponyatni stringlerdir , token bizim melumatlarimiz saxlanilir
    resetPasswordExpire: Date  // shifre deyisimin bitme muddeti 
}, {
    timestamps:true  // Istifadecinin yaratdigi zamaani bazada yerlesmesi , bunu mongo DBde gormusuk
}

)

// JWT Json Web Token 

//this


userSchema.pre("save" , async function(next) {
if(!this.isModified("password")) {
    next()
} 
this.password = await bcrypt.hash(this.password , 10)
} )

userSchema.methods.jwtTokeniEldeEt = function () {
    return jwt.sign({
        id: this._id ,
        
    } , process.env.JWT_SECRET_KEY , {
    expiresIn: String(process.env.JWT_EXPIRES_TIME)
    })
}

userSchema.methods.shifreleriMuqayiseEt = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.getResetPasswordToken = function() {
const resetToken = crypto.randomBytes(20)
}

//this arrow function oz lexical enviroimenti olmur 


//option sozu harda gorduk {} fiqurlu moterize acirirq 


// Yuxaridaki kodun alternativin axtar
//PROTOTYPE Nedir? Neye gore Javascript prototype tipli proqramlasdirm dilidir , Array.prototype.map()



export default mongoose.model("User", userSchema)




// Single Sign On SSO