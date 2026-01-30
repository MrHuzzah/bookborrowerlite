package com.han.bookborrowerlite.dto;

import com.han.bookborrowerlite.model.Book;

import java.time.LocalDate;
import java.util.List;

public class BookDTO {

    public static class NewBookRequest {
        public String title;
        public String author;
        public String genre;
        public LocalDate borrowDate;
    }

    public static class RateRequest {
        public Integer rating;
    }

    public static class LibraryResponse {
        public Summary summary;
        public List<BookResponse> books;

        public LibraryResponse(long total, long overdue, List<BookResponse> books) {
            this.summary = new Summary(total, overdue);
            this.books = books;
        }
    }

    public static class Summary {
        public long totalBooks;
        public long totalOverdue;

        public Summary(long total, long overdue) {
            this.totalBooks = total;
            this.totalOverdue = overdue;
        }
    }

    public static class BookResponse {
        public Long id;
        public String title;
        public String author;
        public String genre;
        public LocalDate borrowDate;
        public Integer rating;
        public boolean overdue;

        public static BookResponse fromEntity(Book book, boolean isOverdue) {
            BookResponse dto = new BookResponse();
            dto.id = book.getId();
            dto.title = book.getTitle();
            dto.author = book.getAuthor();
            dto.genre = book.getGenre();
            dto.borrowDate = book.getBorrowDate();
            dto.rating = book.getRating();
            dto.overdue = isOverdue;
            return dto;
        }
    }
}