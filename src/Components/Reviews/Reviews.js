import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './Reviews.css';

const Reviews = () => {
  const [userComment, setComments] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState (false); // State for showing the popup message
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews.json');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchReviews();
  }, []);



    // Check if reviews array is empty or undefined before mapping over it
    if (!reviews || reviews.length === 0) {
        return <p className='customer-review review-card'>Leave Us A Comment!
        </p>;
      }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust autoplay speed as needed
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (userName && userComment) {
      const newReview = {
        id: reviews.length + 1,
        user: userName,
        comment: userComment,
      };
      setReviews([...reviews, newReview]);
      setUserName('');
      setComments('');
      setShowPopup(true); // Show the popup message after submitting the comment
      setTimeout(() => {
        setShowPopup(false); // Hide the popup message after a few seconds
      }, 3000); // Adjust timing as needed
    } else {
      alert('Please fill in both name and comment fields.');
    }
  };

  return (
    <div className='customer-review'>
      <h2>Customer Reviews</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id}>
            <p className='review-card'>
              <strong>{review.user}</strong>: {review.comment}
            </p>
          </div>
        ))}
      </Slider>
      <div className='review-card'>
      <form onSubmit={handleCommentSubmit}>
        <div className='add-comment-heading'>
        <h3>Add Your Comment</h3>
        </div>
        <div className='add-comment-form'>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          placeholder="Your Comment"
          value={userComment}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
        </div>
        <button className='add-comment-form button' type="submit">Submit</button>
      </form>
      </div>
       {/* Popup message */}
       {showPopup && (
        <div className='popup-message'>
          <p>Thanks for your feedback!</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
