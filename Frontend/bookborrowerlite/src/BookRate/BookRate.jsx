import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "./BookRate.css";

const BookRate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Book not found");
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setRating(data.rating || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: parseInt(rating) }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert("Failed to update rating.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        Loading book details...
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-6">
      <header className="book-rate mb-8">
        <h2 className="text-3xl font-bold text-white">Rate Book</h2>
        <p className="text-zinc-400 mt-2">
          Provide your rating for the book below.
        </p>
      </header>
      <div className="book-rate-card">
        <div className="book-rate-info">
          <div>
            <strong>Title:</strong> {book.title}
          </div>
          <div>
            <strong>Author:</strong> {book.author}
          </div>
        </div>

        {/* Rating Form */}
        <form onSubmit={handleUpdate} className="book-rate-form space-y-6">
          <p className="text-white text-lg">How would you rate this book?</p>

          <div className="book-rate-stars">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={rating === num ? "active" : ""}
              >
                {rating === num ? `${num}` : num}
              </button>
            ))}
          </div>

          <div className="book-rate-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="buttoncancel"
            >
              Cancel
            </button>
            <button type="submit" className="button">
              Save Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookRate;
