import express from "express" 
import { registerUser , login, logout, forgotPassword, resetPassword } from "../controller/authController.js"

const router = express.Router()

// HTTP istekler POST PUT GET DELETE
// CRUD


router.post("/register" , registerUser)
router.post("/login" , login) 
router.get("/logout" , logout)
router.post("/password/forgot" , forgotPassword )
router.put("/password/reset/:token", resetPassword)



export default router
// sebete elave etme , payment sistemi quraciq , blocking mechanism axirda


