document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
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
    
    // DOM Elements
    const booksContainer = document.getElementById('category-books');
    const categoryTitle = document.getElementById('category-title');
    const currentCategorySpan = document.getElementById('current-category');
    const showingCount = document.getElementById('showing-count');
    const totalCount = document.getElementById('total-count');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    const filterButtons = document.querySelectorAll('.category-filter button');
    
    // Pagination settings
    const booksPerPage = 8;
    let currentPage = 1;
    let currentFilter = 'all';
    
    async function init() {
        if (!category || !booksContainer) {
            console.error('Missing required elements or category parameter');
            return;
        }

        const categoryName = capitalizeFirstLetter(category);
        categoryTitle.textContent = `${categoryName} Books`;
        currentCategorySpan.textContent = categoryName;
        
        try {
            const response = await fetch("http://localhost:8080/api/books");
            if (response.ok) {
                const apiData = await response.json();
                if (apiData && apiData.length > 0) {
                    booksData = apiData;
                    console.log("📚 Loaded category books from database!");
                }
            }
        } catch (err) {
            console.warn("⚠️ Backend offline: Using local fallback book database.", err);
        }
        
        displayBooks();
        setupEventListeners();
    }
    
    function getFilteredBooks() {
        // First filter by category
        let filteredBooks = booksData.filter(book => book.category === category);
        totalCount.textContent = filteredBooks.length;
        
        // Then apply sorting
        if (currentFilter === 'rating') {
            filteredBooks.sort((a, b) => b.rating - a.rating);
        } else if (currentFilter === 'author') {
            filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
        }
        
        return filteredBooks;
    }
    
    function displayBooks() {
        const filteredBooks = getFilteredBooks();
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        
        // Validate current page
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (currentPage < 1) {
            currentPage = 1;
        }
        
        const startIndex = (currentPage - 1) * booksPerPage;
        const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
        
        // Clear and render books
        booksContainer.innerHTML = '';
        if (paginatedBooks.length === 0) {
            booksContainer.innerHTML = '<p class="no-books">No books found in this category.</p>';
        } else {
            paginatedBooks.forEach(book => {
                booksContainer.appendChild(createBookCard(book));
            });
        }
        
        showingCount.textContent = paginatedBooks.length;
        updatePaginationControls(totalPages);
    }
    
    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    <span class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</span>
                    <span>${book.rating}/5</span>
                </div>
            </div>
        `;
        return bookCard;
    }
    
    function updatePaginationControls(totalPages) {
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    function setupEventListeners() {
        prevBtn.addEventListener('click', () => {
            currentPage--;
            displayBooks();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            currentPage++;
            displayBooks();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.dataset.filter;
                currentPage = 1; // Reset to first page when changing filters
                displayBooks();
            });
        });
    }
    
    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    }
    
    init();
});