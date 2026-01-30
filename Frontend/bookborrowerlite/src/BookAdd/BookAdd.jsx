import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./BookAdd.css";

const BookAdd = ({ initialData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "Fiction",
    borrowDate:
      initialData?.borrowDate || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (formData.title.length < 3 || formData.title.length > 30) {
      newErrors.title = true;
    }

    if (formData.author.length < 3 || formData.author.length > 30) {
      newErrors.author = true;
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const response = await fetch("http://localhost:8080/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) navigate("/");
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="book-add">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white">Add New Book</h2>
          <p className="text-zinc-400 mt-2">
            Enter the details of the borrowed book below.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-white font-medium">Book Title (3-30 characters)</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. The Great Gatsby"
              value={formData.title}
              onChange={handleChange}
              required
              className={errors.title ? "input-error" : ""}
            />
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium">Author (3-30 characters)</label>
            <input
              name="author"
              type="text"
              placeholder="e.g. F. Scott Fitzgerald"
              value={formData.author}
              onChange={handleChange}
              required
              className={errors.author ? "input-error" : ""}
            />
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium">Genre
            <select name="genre" value={formData.genre} onChange={handleChange}>
              <option>Fiction</option>
              <option>History</option>
              <option>Fantasy</option>
              <option>Sci-Fi</option>
            </select>
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium">Borrow Date
            <input
              name="borrowDate"
              type="date"
              value={formData.borrowDate}
              onChange={handleChange}
            />
            </label>
          </div>
          <div className="book-add-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="buttoncancel"
            >
              Cancel
            </button>
            <button type="submit" className="button">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAdd;
