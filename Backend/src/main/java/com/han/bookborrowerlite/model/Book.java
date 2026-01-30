package com.han.bookborrowerlite.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String genre;
    private LocalDate borrowDate;
    private Integer rating;

    public Book() {}

    public Book(String title, String author, String genre, LocalDate borrowDate) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.borrowDate = borrowDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}