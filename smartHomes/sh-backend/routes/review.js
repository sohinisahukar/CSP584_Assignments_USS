// routes/review.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

// Submit review to MongoDB
// Route to submit a review
router.post('/submitReview', async (req, res) => {
    try {
      // Extract review data from the request body
      const {
        ProductModelName,
        ProductCategory,
        ProductPrice,
        StoreID,
        StoreZip,
        StoreCity,
        StoreState,
        ProductOnSale,
        ManufacturerName,
        ManufacturerRebate,
        UserID,
        UserAge,
        UserGender,
        UserOccupation,
        ReviewRating,
        ReviewDate,
        ReviewText
      } = req.body;
  
      // Create a new review document
      const newReview = new Review({
        ProductModelName,
        ProductCategory,
        ProductPrice,
        StoreID,
        StoreZip,
        StoreCity,
        StoreState,
        ProductOnSale,
        ManufacturerName,
        ManufacturerRebate,
        UserID,
        UserAge,
        UserGender,
        UserOccupation,
        ReviewRating,
        ReviewDate,
        ReviewText
      });
  
      // Save the review to MongoDB
      await newReview.save();
  
      // Respond with success
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Route to get top-rated products
router.get('/topProductsByRating', async (req, res) => {
    try {
        // Fetch top-rated products based on average rating from MongoDB
        const topRatedProducts = await Review.aggregate([
            {
                $group: {
                    _id: "$ProductModelName", // Group by product model
                    avgRating: { $avg: "$ReviewRating" } // Calculate average rating
                }
            },
            { $sort: { avgRating: -1 } }, // Sort by highest average rating
            { $limit: 5 } // Limit to top 5 products
        ]);

        return res.json(topRatedProducts);

        // // Enrich the data with product details from MySQL (optional)
        // const enrichedTopRatedProducts = await Promise.all(
        //     topRatedProducts.map(async (product) => {
        //         const productDetails = await Product.findOne({
        //             where: { name: product._id }
        //         });

        //         return {
        //             productName: product._id,
        //             avgRating: product.avgRating,
        //             productDetails: productDetails || null
        //         };
        //     })
        // );

        // res.json(enrichedTopRatedProducts);
    } catch (error) {
        console.error('Error fetching top-rated products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
