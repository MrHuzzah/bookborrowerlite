import React from "react";
import { MemoryRouter } from "react-router-dom";
import BookLibrary from "./BookLibrary";

export default {
  title: "Pages/BookLibrary",
  component: BookLibrary,
  decorators: [
    (Story ) => (
      <MemoryRouter>
        <div style={{ margin: "3rem" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <BookLibrary {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  mockData: [
    {
      url: "http://localhost:8080/books",
      method: "GET",
      status: 200,
      response: {
        books: [
          {
            id: 2,
            title: "1984",
            author: "George Orwell",
            genre: "Sci-Fi",
            borrowDate: "2023-01-10",
            rating: 4,
            overdue: true,
          },
          {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            borrowDate: "2023-12-01",
            rating: 3,
            overdue: true,
          },
          {
            id: 3,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            genre: "Fantasy",
            borrowDate: "2026-01-26",
            rating: null,
            overdue: false,
          },
        ],
        summary: {
          totalBooks: 3, 
          totalOverdue: 2 
        },
      },
    },
  ],
};

export const Empty = Template.bind({});
Empty.parameters = {
  mockData: [
    {
      url: "http://localhost:8080/books",
      method: "GET",
      status: 200,
      response: {
        books: [],
        summary: { totalBooks: 0, totalOverdue: 0 },
      },
    },
  ],
};