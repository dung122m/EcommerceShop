import axios from "@/pages/api/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Rating = ({ slug }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const guestSessionId = localStorage.getItem("session_id");
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    const postUrl = guestSessionId
      ? `products/${slug}/rate/guest`
      : `products/${slug}/rate`;
    const postData = guestSessionId
      ? { rate: newRating, session_id: guestSessionId }
      : { rate: newRating };
    axios
      .post(postUrl, postData, { headers: headers })
      .then((response) => {
        toast.success("Success!");
      })
      .catch((error) => {
        toast.error("Error");
        console.error(error);
      });
  };

  return (
    <div className="flex items-center mt-2">
      <div className="flex space-x-2 transition-colors">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-xl ${
              star <= (hoverRating || rating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            &#9733;
          </button>
        ))}
      </div>
      {/* {rating} */}
    </div>
  );
};

export default Rating;
