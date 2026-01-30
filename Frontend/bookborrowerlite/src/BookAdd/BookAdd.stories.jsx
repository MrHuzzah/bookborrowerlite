import React from "react";
import { MemoryRouter } from "react-router-dom";
import BookAdd from "./BookAdd";

export default {
  title: "Pages/BookAdd",
  component: BookAdd,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = () => <BookAdd />;

export const WithPrefilledData = () => (
  <BookAdd
    initialData={{
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      borrowDate: "2024-01-01",
    }}
  />
);

export const ValidationErrors = () => (
  <BookAdd
    initialData={{
      title: "Hi",
      author: "A",
    }}
  />
);
