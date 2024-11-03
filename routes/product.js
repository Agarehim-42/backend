// MVC Model View Controller
// Middleware

import express from "express"
// router maarsrutu yaradir

const router = express.Router()

// Mehsullar ucun controller
import { getProducts , getProductDetails, updateProduct, deleteProduct, newProduct } from "../controller/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";


// Middleware arasdir
// get READ , post CREATE , put UPDATE , delete DELETE

//Userin giris ede bileceyi rota
router.get("/products" , getProducts)
router.get("/products/:id" , getProductDetails )

// router router seviyyesinde middleware (ara katman proqram)
//admin ucun olan xususi rota
router.delete("/admin/products/:id" , isAuthenticatedUser , authorizeRoles("admin") ,  deleteProduct)
router.post("/admin/products" , isAuthenticatedUser , authorizeRoles("admin") ,  newProduct)
router.put("/admin/products/:id" , isAuthenticatedUser , authorizeRoles("admin") ,  updateProduct)




// router.delete burda http requestdir RestFul API

export default router

//OTP bank sistemlerinde unutdum forgot hissesi