import mongoose, { Schema, models, model } from "mongoose";

const ExtraPricesSchema = new Schema({
    name: String,
    price: Number
})

const MenuItemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    category: {type: mongoose.Types.ObjectId},
    sizes: {type: [ExtraPricesSchema]},
    extraIngredientPrices: {type: [ExtraPricesSchema]}
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);