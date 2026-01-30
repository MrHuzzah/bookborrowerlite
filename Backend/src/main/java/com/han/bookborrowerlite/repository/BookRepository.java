package com.han.bookborrowerlite.repository;

import com.han.bookborrowerlite.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    @Query(value = "SELECT COUNT(*) FROM book WHERE DATEDIFF('DAY', borrow_date, CURRENT_DATE) >= 21", nativeQuery = true)
    long countOverdueBooks();
}