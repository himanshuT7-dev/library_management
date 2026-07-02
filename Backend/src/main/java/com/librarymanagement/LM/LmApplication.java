package com.librarymanagement.LM;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.librarymanagement.LM.entity.Book;
import com.librarymanagement.LM.repository.BookRepository;
import java.util.Arrays;

@SpringBootApplication
public class LmApplication {

	public static void main(String[] args) {
		System.setProperty("spring.classformat.ignore", "true");
		SpringApplication.run(LmApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(BookRepository repository) {
		return (args) -> {
			if (repository.count() == 0) {
				System.out.println("🌱 Seeding books table in MySQL database...");
				repository.saveAll(Arrays.asList(
					new Book("To Kill a Mockingbird", "Harper Lee", "4.8", "https://m.media-amazon.com/images/I/71FxgtFKcQL.AC_UF1000,1000_QL80.jpg", "fiction"),
					new Book("1984", "George Orwell", "4.7", "https://m.media-amazon.com/images/I/71kxa1-0mfL.AC_UF1000,1000_QL80.jpg", "fiction"),
					new Book("The Great Gatsby", "F. Scott Fitzgerald", "4.6", "https://m.media-amazon.com/images/I/71FTb9X6wsL.AC_UF1000,1000_QL80.jpg", "fiction"),
					new Book("A Brief History of Time", "Stephen Hawking", "4.6", "https://m.media-amazon.com/images/I/81a5K+ECmYL.AC_UF1000,1000_QL80.jpg", "science"),
					new Book("Sapiens", "Yuval Noah Harari", "4.7", "https://m.media-amazon.com/images/I/713jIoMO3UL.AC_UF1000,1000_QL80.jpg", "history"),
					new Book("The Hobbit", "J.R.R. Tolkien", "4.7", "https://m.media-amazon.com/images/I/710+HcoP38L.AC_UF1000,1000_QL80.jpg", "fiction"),
					new Book("Atomic Habits", "James Clear", "4.8", "https://m.media-amazon.com/images/I/91bYsX41DVL.AC_UF1000,1000_QL80.jpg", "self-help"),
					new Book("The Innovators", "Walter Isaacson", "4.6", "https://m.media-amazon.com/images/I/71I9J0zD8QL.AC_UF1000,1000_QL80.jpg", "technology"),
					new Book("Becoming", "Michelle Obama", "4.8", "https://m.media-amazon.com/images/I/81h2gWPTYJL.AC_UF1000,1000_QL80.jpg", "biography"),
					new Book("The Silent Patient", "Alex Michaelides", "4.5", "https://m.media-amazon.com/images/I/71XithG6ZYL.AC_UF1000,1000_QL80.jpg", "mystery")
				));
				System.out.println("✅ Seeding complete!");
			}
		};
	}
}
