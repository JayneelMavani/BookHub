
(function () {
    'use strict';

    // ── Chat State ──
    let chatOpen = false;
    let chatHistory = [];
    let isTyping = false;

    // ── Greeting Messages ──
    const greetings = [
        "Hey there, book lover! 📚 I'm BookBot, your personal reading assistant. Ask me for book recommendations by genre, mood, or just tell me what you've been reading — I'll find your next great read!",
        "Welcome to BookBot! 📖 I can help you discover amazing books. Try asking me things like:\n\n• \"Suggest a sci-fi book\"\n• \"I'm in the mood for something romantic\"\n• \"What's the highest rated book?\"\n\nWhat are you looking for today?"
    ];

    // ── Mood Mappings ──
    const moodMap = {
        happy: { genres: ['Romance', 'Fiction', 'Fantasy'], keywords: ['uplifting', 'heartwarming', 'feel-good'] },
        sad: { genres: ['Fiction', 'Romance'], keywords: ['comfort', 'emotional', 'healing'] },
        adventurous: { genres: ['Fantasy', 'Science Fiction', 'Thriller'], keywords: ['epic', 'quest', 'journey'] },
        thoughtful: { genres: ['Non-Fiction', 'Science Fiction', 'Fiction'], keywords: ['deep', 'philosophical', 'thought-provoking'] },
        relaxed: { genres: ['Romance', 'Fiction', 'Self-Help'], keywords: ['light', 'easy', 'cozy'] },
        thrilled: { genres: ['Mystery', 'Thriller', 'Science Fiction'], keywords: ['suspense', 'page-turner', 'gripping'] },
        inspired: { genres: ['Self-Help', 'Non-Fiction', 'Biography'], keywords: ['motivating', 'empowering', 'growth'] },
        nostalgic: { genres: ['Fiction', 'Romance'], keywords: ['classic', 'timeless', 'vintage'] }
    };

    // ── Genre Keywords ──
    const genreKeywords = {
        'Fiction': ['fiction', 'novel', 'story', 'literary', 'classic', 'classics'],
        'Science Fiction': ['sci-fi', 'science fiction', 'scifi', 'dystopian', 'dystopia', 'futuristic', 'space'],
        'Romance': ['romance', 'romantic', 'love', 'love story', 'relationship'],
        'Mystery': ['mystery', 'thriller', 'suspense', 'detective', 'crime', 'whodunit'],
        'Fantasy': ['fantasy', 'magic', 'magical', 'dragons', 'wizard', 'mythical', 'epic fantasy'],
        'Non-Fiction': ['non-fiction', 'nonfiction', 'history', 'historical', 'true', 'factual', 'real'],
        'Self-Help': ['self-help', 'self help', 'productivity', 'habits', 'motivation', 'personal development', 'improvement'],
        'Biography': ['biography', 'autobiography', 'memoir', 'life story'],
        'Thriller': ['thriller', 'suspenseful', 'action', 'intense', 'edge of seat']
    };

    // ── Mood Keywords ──
    const moodKeywords = {
        happy: ['happy', 'cheerful', 'fun', 'uplifting', 'feel-good', 'feel good', 'lighthearted', 'joyful', 'positive'],
        sad: ['sad', 'emotional', 'cry', 'moving', 'touching', 'heartbreak', 'comfort'],
        adventurous: ['adventure', 'adventurous', 'exciting', 'action', 'journey', 'quest', 'epic'],
        thoughtful: ['think', 'thoughtful', 'deep', 'philosophical', 'intellectual', 'thought-provoking', 'mind'],
        relaxed: ['relax', 'relaxed', 'chill', 'cozy', 'easy', 'light read', 'casual', 'beach', 'summer'],
        thrilled: ['thrill', 'thrilled', 'page-turner', 'gripping', 'suspense', 'cant put down', 'intense'],
        inspired: ['inspire', 'inspired', 'motivation', 'motivating', 'empower', 'growth', 'change'],
        nostalgic: ['nostalgic', 'classic', 'old', 'timeless', 'vintage', 'retro']
    };

    // ── Build Chat Widget HTML ──
    function buildChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'chatbot-widget';
        widget.innerHTML = `
            <!-- Floating Chat Button -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open BookBot chat assistant">
                <span class="chatbot-toggle-icon">
                    <i class="fas fa-robot"></i>
                </span>
                <span class="chatbot-toggle-close" style="display:none;">
                    <i class="fas fa-times"></i>
                </span>
                <span class="chatbot-pulse"></span>
            </button>

            <!-- Chat Window -->
            <div id="chatbot-window" class="chatbot-window" style="display:none;" role="dialog" aria-label="BookBot chat assistant">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-header-text">
                            <h6 class="chatbot-title">BookBot</h6>
                            <span class="chatbot-status">
                                <span class="chatbot-status-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close-btn" aria-label="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages Area -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be injected here -->
                </div>

                <!-- Quick Actions -->
                <div id="chatbot-quick-actions" class="chatbot-quick-actions">
                    <button class="chatbot-quick-btn" data-query="Suggest a popular book">🔥 Popular</button>
                    <button class="chatbot-quick-btn" data-query="Recommend a sci-fi book">🚀 Sci-Fi</button>
                    <button class="chatbot-quick-btn" data-query="I want something romantic">💕 Romance</button>
                    <button class="chatbot-quick-btn" data-query="What's good in mystery?">🔍 Mystery</button>
                    <button class="chatbot-quick-btn" data-query="Suggest a self-help book">💡 Self-Help</button>
                </div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <form id="chatbot-form" class="chatbot-form">
                        <input
                            type="text"
                            id="chatbot-input"
                            class="chatbot-input"
                            placeholder="Ask me about books..."
                            autocomplete="off"
                            aria-label="Type your message"
                        />
                        <button type="submit" id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    // ── Initialize Event Listeners ──
    function initListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const form = document.getElementById('chatbot-form');
        const quickBtns = document.querySelectorAll('.chatbot-quick-btn');

        toggle.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);
        form.addEventListener('submit', handleSubmit);

        quickBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const query = this.getAttribute('data-query');
                sendMessage(query);
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && chatOpen) {
                toggleChat();
            }
        });
    }

    // ── Toggle Chat Window ──
    function toggleChat() {
        chatOpen = !chatOpen;
        const window_ = document.getElementById('chatbot-window');
        const iconOpen = document.querySelector('.chatbot-toggle-icon');
        const iconClose = document.querySelector('.chatbot-toggle-close');
        const pulse = document.querySelector('.chatbot-pulse');

        if (chatOpen) {
            window_.style.display = 'flex';
            requestAnimationFrame(() => {
                window_.classList.add('chatbot-window-open');
            });
            iconOpen.style.display = 'none';
            iconClose.style.display = 'flex';
            pulse.style.display = 'none';
            document.getElementById('chatbot-input').focus();

            // Show greeting on first open
            if (chatHistory.length === 0) {
                const greeting = greetings[Math.floor(Math.random() * greetings.length)];
                appendBotMessage(greeting);
            }
        } else {
            window_.classList.remove('chatbot-window-open');
            setTimeout(() => {
                window_.style.display = 'none';
            }, 300);
            iconOpen.style.display = 'flex';
            iconClose.style.display = 'none';
        }
    }

    // ── Handle Form Submit ──
    function handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (!message || isTyping) return;
        sendMessage(message);
        input.value = '';
    }

    // ── Send Message ──
    function sendMessage(text) {
        appendUserMessage(text);
        showTypingIndicator();

        // Simulate response delay for natural feel
        const delay = 600 + Math.random() * 800;
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(text);
            appendBotMessage(response);
        }, delay);
    }

    // ── Append User Message ──
    function appendUserMessage(text) {
        chatHistory.push({ role: 'user', content: text });
        const container = document.getElementById('chatbot-messages');
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg chatbot-msg-user';
        msg.innerHTML = `
            <div class="chatbot-msg-bubble chatbot-msg-bubble-user">
                ${escapeHtml(text)}
            </div>
        `;
        container.appendChild(msg);
        scrollToBottom();
    }

    // ── Append Bot Message ──
    function appendBotMessage(text) {
        chatHistory.push({ role: 'bot', content: text });
        const container = document.getElementById('chatbot-messages');
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg chatbot-msg-bot';
        msg.innerHTML = `
            <div class="chatbot-msg-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chatbot-msg-bubble chatbot-msg-bubble-bot">
                ${formatBotMessage(text)}
            </div>
        `;
        container.appendChild(msg);
        scrollToBottom();
    }

    // ── Typing Indicator ──
    function showTypingIndicator() {
        isTyping = true;
        const container = document.getElementById('chatbot-messages');
        const typing = document.createElement('div');
        typing.id = 'chatbot-typing';
        typing.className = 'chatbot-msg chatbot-msg-bot';
        typing.innerHTML = `
            <div class="chatbot-msg-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chatbot-msg-bubble chatbot-msg-bubble-bot chatbot-typing-bubble">
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
            </div>
        `;
        container.appendChild(typing);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        isTyping = false;
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.remove();
    }

    // ── Scroll to Bottom ──
    function scrollToBottom() {
        const container = document.getElementById('chatbot-messages');
        container.scrollTop = container.scrollHeight;
    }

    // ── Escape HTML ──
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ── Format Bot Message (supports basic markdown-like formatting) ──
    function formatBotMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '<span class="chatbot-bullet">•</span> ');
    }

    // ── Get Books from localStorage ──
    function getCatalogBooks() {
        try {
            if (typeof getAllBooks === 'function') {
                return getAllBooks();
            }
            const books = localStorage.getItem('books');
            return books ? JSON.parse(books) : [];
        } catch (e) {
            return [];
        }
    }

    // ──────────────────────────────────────
    //  INTELLIGENT RESPONSE GENERATION
    // ──────────────────────────────────────

    function generateResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();
        const books = getCatalogBooks();

        // 1. Greeting / Hello
        if (/^(hi|hello|hey|howdy|sup|yo|greetings|good\s*(morning|evening|afternoon))/i.test(msg)) {
            return "Hey there! 👋 I'm BookBot, your reading buddy. What kind of book are you looking for today? You can tell me a genre, a mood, or even a book you've enjoyed — and I'll find something great for you! 📚";
        }

        // 2. Thank you
        if (/^(thanks|thank you|thx|ty|cheers)/i.test(msg)) {
            return "You're welcome! 😊 Happy reading! If you need more recommendations later, I'm always here. 📚";
        }

        // 3. Help / What can you do
        if (/\b(help|what can you|how do you|what do you|features|commands)\b/i.test(msg)) {
            return "Here's what I can help you with! 🎯\n\n• **Find books by genre** — just say a genre like \"sci-fi\", \"romance\", or \"mystery\"\n• **Mood-based picks** — tell me how you feel, like \"I want something relaxing\" or \"I need a page-turner\"\n• **Book details** — ask about any book on BookHub\n• **Top rated books** — I'll show you the community favorites\n• **Similar books** — tell me a book you liked and I'll suggest similar ones\n\nWhat sounds good? 😊";
        }

        // 4. Highest rated / popular / best
        if (/\b(popular|highest rated|best|top rated|top books|trending|most reviewed|recommend)\b/i.test(msg) && !detectGenre(msg) && !detectMood(msg)) {
            const sorted = [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0));
            const top = sorted.slice(0, 3);
            if (top.length === 0) return "It looks like the BookHub catalog is empty right now. Be the first to add a book via the **Add Recommendation** page! 📖";

            let response = "Here are BookHub's highest rated books! 🏆\n\n";
            top.forEach((book, i) => {
                response += `${i + 1}. **${book.title}** by ${book.author}\n`;
                response += `   Genre: ${book.genre} | ⭐ ${(book.rating || 0).toFixed(1)} | ${book.reviewCount || 0} reviews\n`;
                response += `   ${truncate(book.description, 80)}\n\n`;
            });
            response += "Want me to tell you more about any of these, or look for something specific? 🎯";
            return response;
        }

        // 5. Specific book inquiry
        const bookMatch = findBookByName(msg, books);
        if (bookMatch) {
            return `Great choice! Here's what I know about this one:\n\n` +
                `📖 **${bookMatch.title}** by ${bookMatch.author}\n` +
                `Genre: ${bookMatch.genre} | ⭐ ${(bookMatch.rating || 0).toFixed(1)} | ${bookMatch.reviewCount || 0} reviews\n\n` +
                `${bookMatch.description}\n\n` +
                `You can check out the full details, read reviews, and add your own on BookHub! Would you like similar book suggestions? 😊`;
        }

        // 6. Genre-based recommendation
        const detectedGenre = detectGenre(msg);
        if (detectedGenre) {
            const genreBooks = books.filter(b => b.genre === detectedGenre);
            if (genreBooks.length > 0) {
                const sorted = genreBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                let response = `Here are some ${detectedGenre} books from BookHub! 📚\n\n`;
                sorted.slice(0, 3).forEach((book, i) => {
                    response += `${i + 1}. **${book.title}** by ${book.author} (⭐ ${(book.rating || 0).toFixed(1)})\n`;
                    response += `   ${truncate(book.description, 80)}\n\n`;
                });
                if (sorted.length > 3) {
                    response += `...and ${sorted.length - 3} more on BookHub!\n\n`;
                }
                response += getExternalSuggestions(detectedGenre);
                response += "\nWant more details on any of these, or should I try a different genre? 🎯";
                return response;
            } else {
                let response = `I don't have any ${detectedGenre} books in the BookHub catalog yet, but here are some great ones you might enjoy:\n\n`;
                response += getExternalSuggestions(detectedGenre);
                response += "\nYou could be the first to add a ${detectedGenre} book to BookHub via the **Add Recommendation** page! 💡";
                return response;
            }
        }

        // 7. Mood-based recommendation
        const detectedMood = detectMood(msg);
        if (detectedMood) {
            const moodData = moodMap[detectedMood];
            const moodBooks = books.filter(b => moodData.genres.includes(b.genre));
            const sorted = moodBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));

            let response = getMoodIntro(detectedMood);
            if (sorted.length > 0) {
                sorted.slice(0, 3).forEach((book, i) => {
                    response += `${i + 1}. **${book.title}** by ${book.author} (⭐ ${(book.rating || 0).toFixed(1)})\n`;
                    response += `   ${truncate(book.description, 80)}\n\n`;
                });
            } else {
                response += "I couldn't find a perfect match in the BookHub catalog, but check back soon as the community grows! 🌱\n\n";
            }
            response += "Does any of these sound right, or should I try a different angle? 😊";
            return response;
        }

        // 8. "Like" / similar book query (e.g., "something like 1984")
        if (/\b(like|similar|enjoyed|loved|finished|just read)\b/i.test(msg)) {
            const likedBook = findBookByName(msg, books);
            if (likedBook) {
                return getSimilarBookResponse(likedBook, books);
            }
            // Generic "similar" request
            return "I'd love to help find something similar! 📖 Could you tell me the name of a book you enjoyed? For example: \"Something like The Hobbit\" or \"I just finished 1984.\"";
        }

        // 9. How to use BookHub
        if (/\b(how to|add book|write review|browse|use bookhub|navigate|profile|sign up|register|login)\b/i.test(msg)) {
            return "Here's a quick guide to BookHub! 🗺️\n\n" +
                "• **Browse Books** — Head to the Books page to explore the catalog. You can filter by genre, rating, and sort results.\n" +
                "• **Add a Book** — Click \"Add Recommendation\" in the navbar to share a book you love with the community.\n" +
                "• **Write Reviews** — Open any book's detail page to leave your rating and review.\n" +
                "• **Your Profile** — Check the Profile page to see your contributions and reading activity.\n" +
                "• **Search** — Use the search bar in the navbar to quickly find books by title, author, or genre.\n\n" +
                "Need help with anything else? 😊";
        }

        // 10. Fallback
        return "Hmm, I'm not quite sure what you're looking for! 🤔 Here are some things you can try:\n\n" +
            "• Ask for a **genre** — \"Suggest a mystery book\"\n" +
            "• Tell me your **mood** — \"I want something adventurous\"\n" +
            "• Ask about a **specific book** — \"Tell me about Dune\"\n" +
            "• Request **top rated** books — \"What's the best book on BookHub?\"\n\n" +
            "Give it a try! 📚";
    }

    // ── Detect Genre from Message ──
    function detectGenre(msg) {
        for (const [genre, keywords] of Object.entries(genreKeywords)) {
            for (const kw of keywords) {
                if (msg.includes(kw)) return genre;
            }
        }
        return null;
    }

    // ── Detect Mood from Message ──
    function detectMood(msg) {
        for (const [mood, keywords] of Object.entries(moodKeywords)) {
            for (const kw of keywords) {
                if (msg.includes(kw)) return mood;
            }
        }
        return null;
    }

    // ── Find Book by Name ──
    function findBookByName(msg, books) {
        // Try exact title match first
        for (const book of books) {
            if (msg.includes(book.title.toLowerCase())) return book;
        }
        // Try partial match (at least 2 words)
        for (const book of books) {
            const titleWords = book.title.toLowerCase().split(' ');
            const matchCount = titleWords.filter(w => w.length > 2 && msg.includes(w)).length;
            if (matchCount >= 2 || (titleWords.length === 1 && msg.includes(titleWords[0]))) return book;
        }
        // Try author match
        for (const book of books) {
            const authorLast = book.author.toLowerCase().split(' ').pop();
            if (authorLast.length > 3 && msg.includes(authorLast)) return book;
        }
        return null;
    }

    // ── Mood Intro Messages ──
    function getMoodIntro(mood) {
        const intros = {
            happy: "Looking for something to brighten your day! ☀️ Here are some feel-good picks:\n\n",
            sad: "I've got some comforting reads that might be just what you need 💙\n\n",
            adventurous: "Ready for an adventure? 🗺️ These will take you on a journey:\n\n",
            thoughtful: "In the mood to think deep? 🧠 Check these out:\n\n",
            relaxed: "Time to unwind! 🍃 Here are some relaxing reads:\n\n",
            thrilled: "Want your pulse racing? 💓 These are page-turners:\n\n",
            inspired: "Ready to be inspired! 🌟 Here are some motivating reads:\n\n",
            nostalgic: "Let's revisit some timeless classics! ✨\n\n"
        };
        return intros[mood] || "Here are some books you might enjoy!\n\n";
    }

    // ── External Suggestions by Genre ──
    function getExternalSuggestions(genre) {
        const suggestions = {
            'Fiction': "\nYou might also enjoy:\n• **The Kite Runner** by Khaled Hosseini — a powerful story of friendship and redemption\n• **Normal People** by Sally Rooney — an intimate modern classic\n",
            'Science Fiction': "\nAlso worth checking out:\n• **Ender's Game** by Orson Scott Card — a brilliant military sci-fi classic\n• **The Martian** by Andy Weir — survival on Mars with wit and science\n",
            'Romance': "\nAlso consider:\n• **The Notebook** by Nicholas Sparks — a heart-wrenching love story\n• **Beach Read** by Emily Henry — fun, contemporary romance with great banter\n",
            'Mystery': "\nYou might also like:\n• **Gone Girl** by Gillian Flynn — a twisty psychological thriller\n• **The Girl with the Dragon Tattoo** by Stieg Larsson — a gripping international bestseller\n",
            'Fantasy': "\nAlso worth exploring:\n• **Harry Potter** by J.K. Rowling — the magical series that defined a generation\n• **The Name of the Wind** by Patrick Rothfuss — beautifully written epic fantasy\n",
            'Non-Fiction': "\nAlso check out:\n• **Educated** by Tara Westover — a powerful memoir of self-invention\n• **Thinking, Fast and Slow** by Daniel Kahneman — a deep dive into how we think\n",
            'Self-Help': "\nYou might also enjoy:\n• **Deep Work** by Cal Newport — master the art of focused work\n• **The Power of Habit** by Charles Duhigg — understand the science behind habits\n",
            'Biography': "\nAlso worth reading:\n• **Steve Jobs** by Walter Isaacson — the fascinating story of Apple's visionary\n• **Becoming** by Michelle Obama — an inspiring and intimate memoir\n",
            'Thriller': "\nAlso try:\n• **The Da Vinci Code** by Dan Brown — a riveting symbology thriller\n• **Before I Go to Sleep** by S.J. Watson — a chilling psychological thriller\n"
        };
        return suggestions[genre] || '';
    }

    // ── Similar Book Response ──
    function getSimilarBookResponse(book, allBooks) {
        // Find same genre, different book
        const sameGenre = allBooks.filter(b => b.genre === book.genre && b.id !== book.id);
        const sorted = sameGenre.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        let response = `Since you enjoyed **${book.title}**, here's what I'd suggest! 🎯\n\n`;

        if (sorted.length > 0) {
            response += "**From BookHub:**\n";
            sorted.slice(0, 2).forEach((b, i) => {
                response += `${i + 1}. **${b.title}** by ${b.author} (⭐ ${(b.rating || 0).toFixed(1)})\n`;
                response += `   ${truncate(b.description, 80)}\n\n`;
            });
        }

        response += getExternalSuggestions(book.genre);
        response += "\nWant me to explore a different direction? 😊";
        return response;
    }

    // ── Truncate Text ──
    function truncate(text, len) {
        if (!text) return '';
        return text.length > len ? text.substring(0, len) + '...' : text;
    }

    // ── Initialize on DOM Ready ──
    function init() {
        buildChatWidget();
        initListeners();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
