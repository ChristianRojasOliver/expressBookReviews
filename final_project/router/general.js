const express = require('express');
const axios = require('axios');
const { books, getAllAuthors, getAllTitles, getAllReviews } = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
        error: "Username and password are required"
    });
  }

  if (!isValid(username)) {
    return res.status(400).json({
        error: "Username is invalid or already taken"
    });
   }

   try {
        username.push({
            username: username,
            password: password
        });

        return res.status(201).json({
            meesage: "User registered succesfully",
            username: username
        });
   } catch (error) {
        return res.status(500).json({
            error: "Error during registration"
        });
   }
});

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
  try {
    const bookList = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });

    return res.status(200).json({
        message: "Books retrieved successfully",
        books: bookList
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
        error: "Error retrieving books"
    });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const book = await new Promise((resolve, reject) => {
            const foundBook = books[isbn];
            if (foundBook) {
                resolve(foundBook);
            } else {
                reject(new Error("Book not found"));
            }

            return res.status(200).json({
                message: "Book found",
                book: book
            });
        });
    } catch(error) {
        console.error('Error fetching book:', error);
        return res.status(404).json({
          error: "Book not found"  
        });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    try {
        const allAuthors = getAllAuthors(books);
        res.status(200).json(allAuthors); 
      } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'Server Error' });
      }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    try {
        const allTitles = getAllTitles(books);
        res.status(200).json(allTitles); 
      } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'Server Error' });
      }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
   try {
        const allReviews = getAllReviews(books);
        res.status(200).json(allReviews);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Server Error' });
   }
});

module.exports.general = public_users;
