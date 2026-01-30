import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BookRate from "./BookRate";

export default {
  title: "Pages/BookRate",
  component: BookRate,
};

const MockFetchWrapper = ({ children, response }) => {
  window.fetch = () =>
    Promise.resolve({
      ok: true,
      json: async () => response,
    });

  return <>{children}</>;
};

export const Default = () => (
  <MockFetchWrapper
    response={{
      id: 1,
      title: "1984",
      author: "George Orwell",
      rating: 4,
    }}
  >
    <MemoryRouter initialEntries={["/books/1"]}>
      <Routes>
        <Route path="/books/:id" element={<BookRate />} />
      </Routes>
    </MemoryRouter>
  </MockFetchWrapper>
);