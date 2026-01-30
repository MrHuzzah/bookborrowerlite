package com.han.bookborrowerlite;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.han.bookborrowerlite.controller.BookController;
import com.han.bookborrowerlite.dto.BookDTO.*;
import com.han.bookborrowerlite.model.Book;
import com.han.bookborrowerlite.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Book sampleBook;

    @BeforeEach
    void setUp() {
        sampleBook = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Classic", LocalDate.now().minusDays(10));
        sampleBook.setId(1L);
    }

    @Test
    void getLibrary_ShouldReturnBooks() throws Exception {
        when(bookRepository.findAll()).thenReturn(Arrays.asList(sampleBook));
        when(bookRepository.count()).thenReturn(1L);
        when(bookRepository.countOverdueBooks()).thenReturn(0L);

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.summary.totalBooks").value(1))
                .andExpect(jsonPath("$.summary.totalOverdue").value(0))
                .andExpect(jsonPath("$.books[0].title").value("The Great Gatsby"));
    }

    @Test
    void addBook_WithValidData_ShouldReturnCreated() throws Exception {
        NewBookRequest request = new NewBookRequest();
        request.title = "Valid Title";
        request.author = "Author Name";
        request.genre = "Fiction";
        request.borrowDate = LocalDate.now();

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Book added"));
    }

    @Test
    void addBook_WithShortTitle_ShouldReturnBadRequest() throws Exception {
        NewBookRequest request = new NewBookRequest();
        request.title = "Hi"; // Too short (min 3)
        request.borrowDate = LocalDate.now();

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Title must be 3-30 chars"));
    }

    @Test
    void updateRating_WithInvalidRange_ShouldReturnBadRequest() throws Exception {
        RateRequest rateRequest = new RateRequest();
        rateRequest.rating = 6; // Out of range (1-5)

        mockMvc.perform(patch("/books/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(rateRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Rating must be 1-5"));
    }

    @Test
    void getBook_WhenExists_ShouldReturnBook() throws Exception {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));

        mockMvc.perform(get("/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("The Great Gatsby"));
    }

    @Test
    void getBook_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/books/99"))
                .andExpect(status().isNotFound());
    }
}