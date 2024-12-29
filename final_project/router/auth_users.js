const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const JWT_SECRET = "this_is_a_secret_key"

const isValid = (username) => {
    if (!username || typeof username !== 'string') return false;

    return !users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
    return users.some(user =>
        user.username === username &&
        user.password === password
    );
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    try {
        const toke = jwt.sign(
            { username: username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: "Error during login"
        });
    }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' '[1]);

    if (!token) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid or expired token"
        });
    }
}

// Add a book review
regd_users.put("/auth/review/:isbn", verifyToken, (req, res) => {
    try {
        const isbn = req.params.isbn;
        const review = req.params.review;
        const username = req.params.username;

        if (!isbn || !review) {
            return res.status(400).json({
                error: "ISBN and review are required"
            });
        }

        if (!books[isbn]) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        if (!books[isbn].reviews) {
            books[isbn].reviews = {};
        };

        books[isbn].reviews[username] = review;
        delete books[isbn].reviews[username];

        return res.status(200).json({
            message: "Review updated or deleted successfully",
            book: {
                isbn: isbn,
                reviews: books[isbn].reviews
            }
        });
    } catch (error) {
        console.error("Review error:", error);
        return res.status(500).json({
            error: "Error processing review or deleting review"
        });
    }

})

    module.exports.authenticated = regd_users;
    module.exports.isValid = isValid;
    module.exports.users = users;
