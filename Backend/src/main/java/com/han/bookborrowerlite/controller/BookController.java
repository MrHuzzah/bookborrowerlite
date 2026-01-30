package com.han.bookborrowerlite.controller;

import com.han.bookborrowerlite.model.Book;
import com.han.bookborrowerlite.repository.BookRepository;
import com.han.bookborrowerlite.dto.BookDTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<LibraryResponse> getLibrary(
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "title") String sortBy) {

        List<Book> books;

        if (title != null && !title.isEmpty()) {
            books = bookRepository.findByTitleContainingIgnoreCase(title);
        } else {
            books = bookRepository.findAll();
        }

        books.sort((book1, book2) -> {
            switch (sortBy) {
                case "borrowDate":
                    return book2.getBorrowDate().compareTo(book1.getBorrowDate());
                case "rating":
                    int rating1 = book1.getRating() == null ? 0 : book1.getRating();
                    int rating2 = book2.getRating() == null ? 0 : book2.getRating();
                    return Integer.compare(rating2, rating1);
                default:
                    return book1.getTitle().compareToIgnoreCase(book2.getTitle());
            }
        });

        long totalCount = bookRepository.count();
        long overdueCount = bookRepository.countOverdueBooks();

        List<BookResponse> bookDTOs = books.stream()
                .map(book -> BookResponse.fromEntity(book, isOverdue(book)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new LibraryResponse(totalCount, overdueCount, bookDTOs));
    }

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody NewBookRequest request) {
        if (request.title == null || request.title.length() < 3 || request.title.length() > 30) {
            return ResponseEntity.badRequest().body("Title must be 3-30 chars");
        }
        if (request.borrowDate.isAfter(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Date cannot be in the future");
        }

        Book newBook = new Book(request.title, request.author, request.genre, request.borrowDate);
        bookRepository.save(newBook);

        return ResponseEntity.status(HttpStatus.CREATED).body("Book added");
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(book -> ResponseEntity.ok(BookResponse.fromEntity(book, isOverdue(book))))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateRating(@PathVariable Long id, @RequestBody RateRequest request) {
        if (request.rating < 1 || request.rating > 5) {
            return ResponseEntity.badRequest().body("Rating must be 1-5");
        }

        return bookRepository.findById(id)
                .map(book -> {
                    book.setRating(request.rating);
                    bookRepository.save(book);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private boolean isOverdue(Book book) {
        long daysBetween = ChronoUnit.DAYS.between(book.getBorrowDate(), LocalDate.now());
        return daysBetween > 21;
    }
}