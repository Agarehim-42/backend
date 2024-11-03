import mongoose from "mongoose";

// Schema

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Mehsul adini daxil edin"],
            maxLength: [255, "Mehsulun adi 255 simvoldan cox olmamalidir "]
        },

        price: {
            type: Number,
            required: [true, "Qiymeti daxil edin"],
            maxLength: [10, "Mehsulun qiymeti 10 simvoldan cox ola bilmez"]
        },
        description: {
            type: String,
            required: [true, "Aciglama hissesini daxil edin"]
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,

            }
        }],
        category: {
            type: String,
            required: [true, "Kteqoriyani secin"],
            enum: {
                values: ["Electronics",
                    "Cameras",
                    "Laptops",
                    "Accessories",
                    "Headphones",
                    "Food",
                    "Books",
                    "Sports",
                    "Outdoor",
                    "Home",
                ],
                message: "Zehmet olmaa mesaji daxil edin"
            }
        },
        seller: {
            type: String,
            required: [true, "Mehsulu satan shirketin adin daxil edin"]
        },
        stock: {
            type: Number,
            required: [true, "Stok miqdarini daxil edin"]
        },
        numOfRewievs: {
            type: Number,
            default: 0
        },
        review: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true


                },
                rating: {
                    type: Number,
                    required: true

                },
                comment: {
                    type: String,

                }

            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    }, {
    timestamps: true
}
)

export default mongoose.model("Product", productSchema)