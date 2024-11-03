// RestFUL API

import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import Product from "../model/Product.js"
import ErrorHandler from "../utils/errorHandler.js"

// CREATE READ UPDATE DELETE (CRUD)

export const getProducts = catchAsyncErrors(async (req, res, next) => {
    //SELECT * FROM products
    const products = await Product.find()
    if (!products) {
        return next(new ErrorHandler("Mehsullar yoxdur ", 404))
    }
    res.status(200).json({
        products
    })
})

// optional chaining 2021 javascript ozelliyi
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        // return res.status(404).json({
        //     error: "Mehsul Tapilmadi"
        // })
        return next(new ErrorHandler("Mehsul tapilmadi", 404))
    }

    res.status(200).json({
        product
    })
})

export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Mehsul Tapilmadi"
        })
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true
    })

    res.status(200).json({
        product
    })
})

export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Mehsul Tapilmadi"
        })
    }

    await product.deleteOne()

    res.status(200).json({
        message: "Mehsul ugurla silindi"
    })
})


export const newProduct = catchAsyncErrors(async(req , res , next) => {

const product = await Product.create(req.body) //yanindaki body htmlde inputun icine yazdigimiz melumatlardir



res.status(201).json({
    product
})
})



// delete post put get bunlar http isteyler adlanir .

// req request res response

// Monolit Mikroservis arxitekturasi
// Uzerinde islediyimiz arxitektura Monolit MVC MOdel View Controller istifade edikrik