# BookHub - Crowdsourced Book Recommendation Platform

BookHub is a fully featured, responsive client-side web application designed to crowdsource book recommendations, reviews, and ratings. The platform empowers users to search and filter through a curated collection of books, read detailed summaries, write reviews, and receive personalized suggestions via an interactive AI chatbot called **BookBot**.

This project was built as a web technology assignment and runs entirely in the browser using client-side technologies and persistent storage via `localStorage`.

---

## 🚀 Key Features

- **Personalized Book Recommendations (BookBot)**: An interactive AI-powered assistant widget integrated on every page. It helps users discover books by genre, keywords, or preferences using structured rules and client-side processing.
- **Book Discovery & Search**: Filter books by genre (Fiction, Sci-Fi, Romance, Mystery, Fantasy, Non-Fiction, Self-Help), filter by minimum star ratings, sort alphabetically or by rating, and perform live text searches.
- **Crowdsourced Database**: Register and sign in to submit new book recommendations with details such as title, author, genre, description, page count, and publication year.
- **User Reviews & Ratings**: Share reviews and grade books using an interactive star rating system. The platform automatically updates and displays aggregate ratings for each book.
- **User Profiles**: Manage your registered account, track stats (total books submitted, total reviews written), and manage/edit your contributions.
- **Responsive Web Design**: Built with Bootstrap 5, providing a seamless user experience across mobile devices, tablets, and desktop displays.

---

## 🛠️ Tech Stack & Dependencies

- **HTML5**: Standard markup for web pages.
- **CSS3 / Vanilla CSS**: Custom styling, gradients, transitions, and chatbot UI layouts.
- **Bootstrap v5.3.0**: Framework for mobile-first layout structure, navigation bars, cards, and modal components.
- **jQuery v3.6.0**: Fast, feature-rich library used for DOM traversal, event handling, animations, and form validation.
- **Font Awesome v6.4.0**: Scalable vector icons for icons, ratings, and social elements.
- **JavaScript (ES6+)**: Custom dynamic application logic.
- **Web Storage API (`localStorage`)**: Persistent client-side data storage for books, reviews, users, and session states.

---

## 📂 Project Structure

```text
Code/
├── css/
│   └── style.css            # Custom CSS rules, colors, and chatbot styles
├── js/
│   ├── script.js            # Core application state, localStorage CRUD, UI binding
│   └── chatbot.js           # BookBot recommendation logic and chat interface handler
├── index.html               # Home page highlighting featured & popular books
├── books.html               # Main catalog with advanced filters and search
├── book-detail.html         # Book detail view showing reviews and rating stats
├── add-book.html            # Interface for authenticated users to add recommendations
├── about.html               # Platform mission, features, and contact details
├── login.html               # Authentication page to log in
├── register.html            # Registration page to create new accounts
├── profile.html             # User dashboard displaying account stats and history
└── README.md                # Project documentation (this file)
```

---

## 🔑 Getting Started & Running Locally

Since BookHub is a serverless, client-side application, running it locally is extremely easy:

1. **Download/Clone** the repository files to your local machine.
2. Navigate into the `Code/` directory.
3. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, etc.) by double-clicking it or dragging it into the browser window.

### 🧪 Demo Credentials

The platform initializes with a default user profile. You can log in using:
* **Email**: `demo@example.com`
* **Password**: `demo123`

---

## 🧠 Meet BookBot (AI Chatbot)

**BookBot** is your virtual librarian, accessible via the chat bubble in the bottom right corner of any page. It features:
* **Interactive UI**: Collapsible/expandable interface with custom messaging states.
* **Smart Filtering**: Offers quick-tap suggestions for genres like Sci-Fi, Mystery, Fantasy, Romance, and Self-Help.
* **Auto-Discovery**: Dynamically scans the local book database to recommend real books stored in `localStorage`.
