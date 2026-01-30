import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./BookLibrary.css";

const BookLibrary = () => {
  const [summary, setSummary] = useState({ totalBooks: 0, totalOverdue: 0 });
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:8080/books?title=${search}&sortBy=${sortBy}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary || { totalBooks: 0, totalOverdue: 0 });
        setBooks(data.books || []);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [search, sortBy]);

  return (
    <div className="min-h-screen w-full bg-black p-6">
      <div className="container">
        <h2 className="text-3xl font-bold text-white mb-6">
          Library Dashboard
        </h2>
      </div>
      <div className="summary-info">
        <div>
          <strong>Total Books:</strong> {summary.totalBooks}
        </div>
        <div
          className={summary.totalOverdue > 0 ? "text-red-600 font-bold" : ""}
        >
          <strong>Overdue:</strong> {summary.totalOverdue}
        </div>
      </div>
      <div className="controls">
        <div>
          <label className="text-white font-medium">
            Search:
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="text-white font-medium">
            Sort By:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="title">Sort by Title</option>
              <option value="borrowDate">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </label>
        </div>
        <div className="controls-spacer" />
        <button onClick={() => navigate("/add")}>+ Add Book</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Borrow Date</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              // Using your .overdue-row class from App.css
              <tr key={book.id} className={book.overdue ? "overdue-row" : ""}>
                <td>
                  {book.title}
                  {book.overdue && (
                    <span
                      className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-bold border"
                      aria-label="This book is overdue"
                    >
                      OVERDUE
                    </span>
                  )}
                </td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.borrowDate}</td>
                <td>
                  {book.rating ? (
                    `★ ${book.rating} / 5`
                  ) : (
                    <span className="text-gray-400 italic">Unrated</span>
                  )}
                </td>
                <td>
                  <button onClick={() => navigate(`/rate/${book.id}`)}>
                    Rate
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                No books found. Try adding one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookLibrary;
