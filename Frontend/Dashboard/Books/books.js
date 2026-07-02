document.addEventListener('DOMContentLoaded', function() {
    let booksData = [
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
        
        if (category === 'all') {
            // Group and display all categories dynamically
            const categories = [...new Set(booksData.map(book => book.category))];
            categories.forEach(cat => {
                const categoryBooks = booksData.filter(book => book.category === cat);
                const previewBooks = categoryBooks.slice(0, 4);
                
                const section = document.createElement('div');
                section.className = 'category-section active';
                section.style.marginBottom = '40px';
                section.innerHTML = `
                    <div class="category-header">
                        <h2 class="category-title">${capitalizeFirstLetter(cat)}</h2>
                        <div class="category-actions">
                            <button class="hide-books-btn">Hide Books</button>
                            <a class="see-more" href="Categories/category.html?category=${cat}">See More</a>
                        </div>
                    </div>
                    <div class="books-grid" id="${cat}-books"></div>
                `;
                
                categoryDisplay.appendChild(section);
                
                const booksGrid = document.getElementById(`${cat}-books`);
                previewBooks.forEach(book => {
                    booksGrid.appendChild(createBookCard(book));
                });

                // Add toggle functionality
                const hideButton = section.querySelector('.hide-books-btn');
                hideButton.addEventListener('click', function() {
                    section.classList.toggle('hidden');
                    this.textContent = section.classList.contains('hidden') ? 'Show Books' : 'Hide Books';
                });
            });
            return;
        }
        
        const categoryBooks = booksData.filter(book => book.category === category);
        const previewBooks = categoryBooks.slice(0, 4);
        
        const section = document.createElement('div');
        section.className = 'category-section active';
        section.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">${capitalizeFirstLetter(category)}</h2>
                <div class="category-actions">
                    <button class="hide-books-btn">Hide Books</button>
                    <a class="see-more" href="Categories/category.html?category=${category}">See More</a>
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
    
    // ✅ On-Page Search Functionality
    const searchBar = document.querySelector(".search-bar");
    let filterBooksBySearch = () => {};
    if (searchBar) {
        const input = searchBar.querySelector("input");
        const button = searchBar.querySelector("button");

        filterBooksBySearch = (query) => {
            if (!query) {
                displayCategoryBooks('all');
                return;
            }
            console.log("🔍 Filtering books by query:", query);
            const filtered = booksData.filter(book => 
                book.title.toLowerCase().includes(query.toLowerCase()) || 
                book.author.toLowerCase().includes(query.toLowerCase())
            );

            // Render search results
            categoryDisplay.innerHTML = '';
            const section = document.createElement('div');
            section.className = 'category-section active';
            section.innerHTML = `
                <div class="category-header">
                    <h2 class="category-title">Search Results: "${query}"</h2>
                </div>
                <div class="books-grid" id="search-results-grid"></div>
            `;
            categoryDisplay.appendChild(section);

            const grid = document.getElementById("search-results-grid");
            if (filtered.length === 0) {
                grid.innerHTML = '<p class="no-books">No matching books found.</p>';
            } else {
                filtered.forEach(book => {
                    grid.appendChild(createBookCard(book));
                });
            }
        };

        button.addEventListener("click", () => filterBooksBySearch(input.value.trim()));
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") filterBooksBySearch(input.value.trim());
        });
    }

    async function init() {
        try {
            const response = await fetch("http://localhost:8080/api/books");
            if (response.ok) {
                const apiData = await response.json();
                if (apiData && apiData.length > 0) {
                    booksData = apiData;
                    console.log("📚 Loaded books from database!");
                }
            }
        } catch (err) {
            console.warn("⚠️ Backend offline: Using local fallback book database.", err);
        }
        displayTopRatedBooks();

        // Check if there is an incoming search query
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            const input = document.querySelector(".search-bar input");
            if (input) input.value = searchQuery;
            filterBooksBySearch(searchQuery);
        } else {
            displayCategoryBooks('all');
        }
    }
    
    init();
    
    categoryDropdown.addEventListener('change', function() {
        displayCategoryBooks(this.value);
    });
    
    window.filterByCategory = function() {
        displayCategoryBooks(categoryDropdown.value);
    };
});    