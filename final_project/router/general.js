const express = require('express');
const { books, getAllAuthors, getAllTitles, getAllReviews } = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    if (isbn) {
        return res.status(200).json(isbn);
      } else {
        return res.status(404).json({ message: "Book not found" });
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
