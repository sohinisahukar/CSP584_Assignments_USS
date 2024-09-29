import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

const WriteReview = () => {
    const { productId } = useParams();

    const [formData, setFormData] = useState({
        ProductModelName: '',
        ProductCategory: '',
        ProductPrice: '',
        StoreID: '',
        StoreZip: '',
        StoreCity: '',
        StoreState: '',
        ProductOnSale: '',
        ManufacturerName: '',
        ManufacturerRebate: '',
        UserID: '',
        UserAge: '',
        UserGender: '',
        UserOccupation: '',
        ReviewRating: 0,
        ReviewDate: new Date().toISOString().substring(0, 10), // Default to today's date
        ReviewText: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // Get name and value from the input
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,  // Update the specific field in formData
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/reviews/submitReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Review submitted successfully');
            } else {
                alert(`Failed to submit review: ${result.message}`);
            }
        } catch (error) {
            alert('Error submitting review');
        }
    };

    return (
        <div>
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
                {/* Fields populated from MySQL */}
                <div>
                    <label>Product Model Name</label>
                    <input type="text" name="ProductModelName" value={formData.ProductModelName} onChange={handleChange} />
                </div>
                <div>
                    <label>Product Category</label>
                    <input type="text" name="ProductCategory" value={formData.ProductCategory} onChange={handleChange} />
                </div>
                <div>
                    <label>Product Price</label>
                    <input type="text" name="ProductPrice" value={formData.ProductPrice} onChange={handleChange} />
                </div>
                <div>
                    <label>Store ID</label>
                    <input type="text" name="StoreID" value={formData.StoreID} onChange={handleChange} />
                </div>
                <div>
                    <label>Store Zip</label>
                    <input type="text" name="StoreZip" value={formData.StoreZip} onChange={handleChange} />
                </div>
                <div>
                    <label>Store City</label>
                    <input type="text" name="StoreCity" value={formData.StoreCity} onChange={handleChange} />
                </div>
                <div>
                    <label>Store State</label>
                    <input type="text" name="StoreState" value={formData.StoreState} onChange={handleChange} />
                </div>
                <div>
                    <label>Product On Sale</label>
                    <input type="text" name="ProductOnSale" value={formData.ProductOnSale} onChange={handleChange} />
                </div>
                <div>
                    <label>Manufacturer Name</label>
                    <input type="text" name="ManufacturerName" value={formData.ManufacturerName} onChange={handleChange} />
                </div>
                <div>
                    <label>Manufacturer Rebate</label>
                    <input type="text" name="ManufacturerRebate" value={formData.ManufacturerRebate} onChange={handleChange} />
                </div>
                <div>
                    <label>User Id</label>
                    <input type="text" name="UserID" value={formData.UserID} onChange={handleChange} required />
                </div>
                <div>
                    <label>User Age</label>
                    <input type="number" name="UserAge" value={formData.UserAge} onChange={handleChange} required />
                </div>
                <div>
                    <label>User Gender</label>
                    <input type="text" name="UserGender" value={formData.UserGender} onChange={handleChange} />
                </div>
                <div>
                    <label>User Occupation</label>
                    <input type="text" name="UserOccupation" value={formData.UserOccupation} onChange={handleChange} />
                </div>
                <div>
                    <label>Review Rating</label>
                    <StarRating
                        rating={formData.ReviewRating}
                        setRating={(rating) =>
                            setFormData({ ...formData, ReviewRating: rating })
                        }
                    />
                </div>
                <div>
                    <label>Review Date</label>
                    <input type="date" name="ReviewDate" value={formData.ReviewDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Review Text</label>
                    <textarea name="ReviewText" value={formData.ReviewText} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default WriteReview;
