// models/Review.js
const mongoose = require('mongoose');

// Create a Review schema
const ReviewSchema = new mongoose.Schema({
  ProductModelName: String,
  ProductCategory: String,
  ProductPrice: String,
  StoreID: String,
  StoreZip: String,
  StoreCity: String,
  StoreState: String,
  ProductOnSale: String,
  ManufacturerName: String,
  ManufacturerRebate: String,
  UserID: String,
  UserAge: Number,
  UserGender: String,
  UserOccupation: String,
  ReviewRating: Number,
  ReviewDate: Date,
  ReviewText: String,
});

// Create the Review model
const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
