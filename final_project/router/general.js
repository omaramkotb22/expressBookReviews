const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  console.log("users list ",users);
  if (username && password) {
      // Check if the user does not already exist
      if (isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          console.log("users list ",users);
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
}
  );

// Get the book list available in the shop

public_users.get('/', async (req, res) => {
  res.send(JSON.stringify(books, null, 2));
});
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json(book);
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const booksByAuthor = bookKeys.map(key => books[key]).filter(book => book.author === author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json(booksByAuthor);
});


// Get all books based on title

public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const booksByTitle = bookKeys.map(key => books[key]).filter(book => book.title === title);
  
  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(book){
    return res.json(book.reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
