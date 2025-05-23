document.addEventListener('DOMContentLoaded', function() {
    const booksData = [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            rating: "4.8",
            cover: "https://m.media-amazon.com/images/I/71FxgtFKcQL.AC_UF1000,1000_QL80.jpg",
            category: "fiction"
        },
        {
            title: "1984",
            author: "George Orwell",
            rating: "4.7",
            cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.AC_UF1000,1000_QL80.jpg",
            category: "fiction"
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            rating: "4.6",
            cover: "https://m.media-amazon.com/images/I/71FTb9X6wsL.AC_UF1000,1000_QL80.jpg",
            category: "fiction"
        },
        {
            title: "A Brief History of Time",
            author: "Stephen Hawking",
            rating: "4.6",
            cover: "https://m.media-amazon.com/images/I/81a5K+ECmYL.AC_UF1000,1000_QL80.jpg",
            category: "science"
        },
        {
            title: "Sapiens",
            author: "Yuval Noah Harari",
            rating: "4.7",
            cover: "https://m.media-amazon.com/images/I/713jIoMO3UL.AC_UF1000,1000_QL80.jpg",
            category: "history"
        },
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            rating: "4.7",
            cover: "https://m.media-amazon.com/images/I/710+HcoP38L.AC_UF1000,1000_QL80.jpg",
            category: "fiction"
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            rating: "4.8",
            cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.AC_UF1000,1000_QL80.jpg",
            category: "self-help"
        },
        {
            title: "The Innovators",
            author: "Walter Isaacson",
            rating: "4.6",
            cover: "https://m.media-amazon.com/images/I/71I9J0zD8QL.AC_UF1000,1000_QL80.jpg",
            category: "technology"
        },
        {
            title: "Becoming",
            author: "Michelle Obama",
            rating: "4.8",
            cover: "https://m.media-amazon.com/images/I/81h2gWPTYJL.AC_UF1000,1000_QL80.jpg",
            category: "biography"
        },
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            rating: "4.5",
            cover: "https://m.media-amazon.com/images/I/71XithG6ZYL.AC_UF1000,1000_QL80.jpg",
            category: "mystery"
        }
    ];

    const booksContainer = document.getElementById('topRatedBooks');
    const categoryDisplay = document.getElementById('categoryDisplay');
    const categoryDropdown = document.getElementById('book-categories');
    
    function displayTopRatedBooks() {
        const topRated = [...booksData].sort((a, b) => b.rating - a.rating).slice(0, 5);
        topRated.forEach(book => {
            booksContainer.appendChild(createBookCard(book));
        });
    }
    
    function displayCategoryBooks(category) {
        categoryDisplay.innerHTML = '';
        
        if (category === 'all') return;
        
        const categoryBooks = booksData.filter(book => book.category === category);
        const previewBooks = categoryBooks.slice(0, 4);
        
        const section = document.createElement('div');
        section.className = 'category-section active';
        section.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">${capitalizeFirstLetter(category)}</h2>
                <div class="category-actions">
                    <button class="hide-books-btn">Hide Books</button>
                    <a class="see-more" href="category.html?category=${category}">See More</a>
                </div>
            </div>
            <div class="books-grid" id="${category}-books"></div>
        `;
        
        categoryDisplay.appendChild(section);
        
        const booksGrid = document.getElementById(`${category}-books`);
        previewBooks.forEach(book => {
            booksGrid.appendChild(createBookCard(book));
        });

        // Add toggle functionality
        const hideButton = section.querySelector('.hide-books-btn');
        hideButton.addEventListener('click', function() {
            section.classList.toggle('hidden');
            this.textContent = section.classList.contains('hidden') ? 'Show Books' : 'Hide Books';
        });
    }
    
    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>Rating: ${book.rating}/5</p>
            <p class="category">${capitalizeFirstLetter(book.category)}</p>
        `;
        return bookCard;
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    displayTopRatedBooks();
    
    categoryDropdown.addEventListener('change', function() {
        displayCategoryBooks(this.value);
    });
    
    window.filterByCategory = function() {
        displayCategoryBooks(categoryDropdown.value);
    };
});    