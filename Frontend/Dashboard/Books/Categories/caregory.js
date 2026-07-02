document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const booksData = [
        // (Your existing books data array)
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
    
    function init() {
        if (!category || !booksContainer) {
            console.error('Missing required elements or category parameter');
            return;
        }

        const categoryName = capitalizeFirstLetter(category);
        categoryTitle.textContent = `${categoryName} Books`;
        currentCategorySpan.textContent = categoryName;
        
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