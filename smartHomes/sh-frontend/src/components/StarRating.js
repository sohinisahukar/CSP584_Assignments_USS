import React, { useState } from 'react';
import './StarRating.css'; // Custom CSS for styling
import '@fortawesome/fontawesome-free/css/all.min.css';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <i
              className="fa fa-star"
              style={{
                color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></i>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
