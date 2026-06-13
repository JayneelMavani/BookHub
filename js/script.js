/**
 * Initialize sample books on first load
 * This data is stored in browser localStorage
 */
function initializeSampleBooks() {
    const existingBooks = localStorage.getItem('books');

    // sample data definition (always available)
    const sampleBooks = [
            {
                id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Fiction",
                description: "A classic novel set in the Jazz Age. Nick Carraway becomes entangled in the world of the mysterious millionaire Jay Gatsby, exploring themes of wealth, love, and the American Dream.",
                imageUrl: "https://images.bwbcovers.com/171/F-Scott-Fitzgerald-The-Great-Gatsby-Fitzgerald-F-Scott-9781716075735.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.5,
                reviewCount: 12
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                description: "Set in the Deep South, this novel follows young Scout Finch as her father, lawyer Atticus Finch, defends a Black man falsely accused of a crime. A powerful story of justice and morality.",
                imageUrl: "https://m.media-amazon.com/images/I/71t2jj68CXL._AC_UF1000,1000_QL80_.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.8,
                reviewCount: 15
            },
            {
                id: 3,
                title: "1984",
                author: "George Orwell",
                genre: "Science Fiction",
                description: "A dystopian social science fiction novel depicting a totalitarian superstate. The story follows Winston Smith as he struggles against Big Brother and navigates a surveillance state.",
                imageUrl: "https://m.media-amazon.com/images/I/71wANojhEKL.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.6,
                reviewCount: 18
            },
            {
                id: 4,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genre: "Romance",
                description: "A romantic novel of manners about Elizabeth Bennet and Mr. Darcy. Filled with wit, social commentary, and one of literature's greatest love stories.",
                imageUrl: "https://www.crossword.in/cdn/shop/files/81IsnbjnoOL._SL1500.jpg?v=1750246780",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.7,
                reviewCount: 20
            },
            {
                id: 5,
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                genre: "Fiction",
                description: "A controversial novel following Holden Caulfield's experiences in New York City after being expelled from prep school. A candid exploration of adolescence and mental health.",
                imageUrl: "https://pagdandi.org/wp-content/uploads/2023/01/thecatcherintheryejdsalinger.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.2,
                reviewCount: 10
            },
            {
                id: 6,
                title: "Atomic Habits",
                author: "James Clear",
                genre: "Self-Help",
                description: "An insightful guide to building good habits and breaking bad ones. Clear explains how tiny habits can lead to remarkable results through practical, evidence-based strategies.",
                imageUrl: "https://www.bookganga.com/eBooks/Content/images/books/154c4ec5e1dd4a6aadb88ad57c3dfca6.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.9,
                reviewCount: 25
            },
            {
                id: 7,
                title: "Dune",
                author: "Frank Herbert",
                genre: "Science Fiction",
                description: "An epic science fiction novel set on the desert planet Arrakis. Paul Atreides becomes embroiled in a political struggle while discovering his extraordinary abilities.",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKMlmijfO5gfDzoRRgnixwSFblcm3enLZAA&s",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.6,
                reviewCount: 14
            },
            {
                id: 8,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                description: "A fantasy novel about Bilbo Baggins, a young hobbit who embarks on an unexpected adventure with dwarves and a wizard to reclaim treasure guarded by a dragon.",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-XFcJ5Fwu_oy8kGONgLfmSsrpM8VZyHP2SQ&s",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.7,
                reviewCount: 19
            },
            {
                id: 9,
                title: "Sapiens",
                author: "Yuval Noah Harari",
                genre: "Non-Fiction",
                description: "A fascinating exploration of human history from the emergence of Homo sapiens to modern times. Harari examines how humans came to dominate the world.",
                imageUrl: "https://m.media-amazon.com/images/I/61SaNiLLX-L._AC_UF1000,1000_QL80_.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.5,
                reviewCount: 22
            },
            {
                id: 10,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                genre: "Mystery",
                description: "A psychological thriller about Alicia Berenson, a woman who shoots her husband five times and then never speaks again. A psychotherapist becomes obsessed with uncovering her motive.",
                imageUrl: "https://emedicodiary.com/images/books/64cc1fc52646aa176937d4ae350e11fa.jpg",
                addedBy: "Admin",
                addedDate: new Date().toISOString(),
                rating: 4.4,
                reviewCount: 17
            }
        ];

    if (!existingBooks) {
        localStorage.setItem('books', JSON.stringify(sampleBooks));
        // Initialize sample reviews
        sampleBooks.forEach(book => {
            const reviews = [
                {
                    id: Date.now() + Math.random(),
                    bookId: book.id,
                    author: "Demo User",
                    rating: 5,
                    text: "Absolutely fantastic book! Highly recommend it.",
                    date: new Date().toISOString()
                }
            ];
            localStorage.setItem(`reviews_${book.id}`, JSON.stringify(reviews));
        });
    } else {
        // migrate existing books to update image URLs if they differ
        const books = JSON.parse(existingBooks);
        let changed = false;
        sampleBooks.forEach(sample => {
            const b = books.find(x => x.id === sample.id);
            if (b && b.imageUrl !== sample.imageUrl) {
                b.imageUrl = sample.imageUrl;
                changed = true;
            }
        });
        if (changed) {
            localStorage.setItem('books', JSON.stringify(books));
        }
    }
}

/**
 * Get all books from localStorage
 * @returns {Array} Array of book objects
 */
function getAllBooks() {
    // Initialize if needed
    initializeSampleBooks();
    
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

/**
 * Get a single book by ID
 * @param {number} bookId - The book ID
 * @returns {Object} Book object or null
 */
function getBookById(bookId) {
    const books = getAllBooks();
    return books.find(book => book.id === bookId) || null;
}

/**
 * Add a new book to localStorage
 * @param {Object} bookData - Book data object
 * @returns {Object} Created book object
 */
function addBook(bookData) {
    const books = getAllBooks();
    const newBook = {
        id: Date.now(),
        ...bookData,
        addedDate: new Date().toISOString(),
        rating: 0,
        reviewCount: 0
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    return newBook;
}

/**
 * Delete a book from localStorage
 * @param {number} bookId - The book ID
 * @returns {boolean} Success status
 */
function deleteBook(bookId) {
    const books = getAllBooks();
    const filteredBooks = books.filter(book => book.id !== bookId);
    
    if (filteredBooks.length < books.length) {
        localStorage.setItem('books', JSON.stringify(filteredBooks));
        localStorage.removeItem(`reviews_${bookId}`);
        return true;
    }
    return false;
}

/**
 * Get reviews for a specific book
 * @param {number} bookId - The book ID
 * @returns {Array} Array of review objects
 */
function getReviewsForBook(bookId) {
    const reviews = localStorage.getItem(`reviews_${bookId}`);
    return reviews ? JSON.parse(reviews) : [];
}

/**
 * Add a review to a book
 * @param {number} bookId - The book ID
 * @param {Object} reviewData - Review data object
 * @returns {Object} Created review object
 */
function addReview(bookId, reviewData) {
    const reviews = getReviewsForBook(bookId);
    const newReview = {
        id: Date.now(),
        bookId: bookId,
        ...reviewData,
        date: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(`reviews_${bookId}`, JSON.stringify(reviews));

    // Update book rating
    const books = getAllBooks();
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const allReviews = reviews;
        const avgRating = allReviews.length > 0 
            ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length 
            : 0;
        books[bookIndex].rating = avgRating;
        books[bookIndex].reviewCount = allReviews.length;
        localStorage.setItem('books', JSON.stringify(books));
    }

    return newReview;
}

/**
 * Delete a review
 * @param {number} bookId - The book ID
 * @param {number} reviewId - The review ID
 * @returns {boolean} Success status
 */
function deleteReview(bookId, reviewId) {
    const reviews = getReviewsForBook(bookId);
    const filteredReviews = reviews.filter(r => r.id !== reviewId);
    
    if (filteredReviews.length < reviews.length) {
        localStorage.setItem(`reviews_${bookId}`, JSON.stringify(filteredReviews));
        
        // Update book rating
        const books = getAllBooks();
        const bookIndex = books.findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            const avgRating = filteredReviews.length > 0
                ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
                : 0;
            books[bookIndex].rating = avgRating;
            books[bookIndex].reviewCount = filteredReviews.length;
            localStorage.setItem('books', JSON.stringify(books));
        }
        return true;
    }
    return false;
}

/**
 * Search books by query
 * @param {string} query - Search query string
 * @returns {Array} Array of matching books
 */
function searchBooks(query) {
    const books = getAllBooks();
    const lowerQuery = query.toLowerCase();
    
    return books.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery) ||
        book.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filter books by criteria
 * @param {Object} criteria - Filter criteria object
 * @returns {Array} Array of filtered books
 */
function filterBooks(criteria) {
    let books = getAllBooks();

    // Apply filters
    if (criteria.genre) {
        books = books.filter(book => book.genre === criteria.genre);
    }

    if (criteria.minRating !== undefined && criteria.minRating > 0) {
        books = books.filter(book => (book.rating || 0) >= criteria.minRating);
    }

    if (criteria.author) {
        books = books.filter(book => 
            book.author.toLowerCase().includes(criteria.author.toLowerCase())
        );
    }

    // Apply sorting
    if (criteria.sortBy === 'rating') {
        books.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (criteria.sortBy === 'title') {
        books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria.sortBy === 'latest') {
        books.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }

    return books;
}

/**
 * Get user's added books
 * @param {string} userId - The user ID
 * @returns {Array} Array of user's books
 */
function getUserBooks(userId) {
    const userBookIds = JSON.parse(localStorage.getItem(`userBooks_${userId}`)) || [];
    const allBooks = getAllBooks();
    return allBooks.filter(book => userBookIds.includes(book.id));
}

/**
 * Get all reviews by a user
 * @param {string} userName - The user name
 * @returns {Array} Array of user's reviews
 */
function getUserReviews(userName) {
    const allBooks = getAllBooks();
    let userReviews = [];

    allBooks.forEach(book => {
        const reviews = getReviewsForBook(book.id);
        const userBookReviews = reviews.filter(r => r.author === userName);
        userBookReviews.forEach(review => {
            userReviews.push({
                ...review,
                bookTitle: book.title,
                bookId: book.id
            });
        });
    });

    // Sort by date (newest first)
    userReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    return userReviews;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Valid email flag
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} Strong password flag
 */
function isValidPassword(password) {
    return password && password.length >= 6;
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string with stars
 */
function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i < rating) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-muted"></i>';
        }
    }
    return stars;
}

/**
 * Truncate text to specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
function truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Get current user from localStorage
 * @returns {Object} Current user object or null
 */
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

/**
 * Set current user in localStorage
 * @param {Object} user - User object
 */
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Logout current user
 */
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
}

/**
 * Check if user is logged in
 * @returns {boolean} Login status
 */
function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * Get all users
 * @returns {Array} Array of user objects
 */
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

/**
 * Delete all data (useful for testing)
 * WARNING: This clears all localStorage data for the app
 */
function clearAllData() {
    if (confirm('Are you sure? This will delete all data!')) {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        keys.forEach(key => {
            if (key.includes('books') || key.includes('reviews') || key.includes('user') || key.includes('current')) {
                localStorage.removeItem(key);
            }
        });
        alert('Data cleared. Page will reload.');
        location.reload();
    }
}

// Initialize sample books on first load
$(document).ready(function() {
    initializeSampleBooks();
});
