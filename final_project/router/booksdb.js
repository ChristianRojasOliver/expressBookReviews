let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {"user": "user1", "rating": 5, "comment": "A masterpiece!"}, "isbn": "0307275211" },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {"user": "user2", "rating": 4, "comment": "Epic story."}, "isbn": "0679725960" },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {"user": "user3", "rating": 4.5, "comment": "Thought-provoking."} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

function getAllAuthors(booksObj) {
    const allAuthors = new Set(); 
    for (const bookId in booksObj) {
      allAuthors.add(booksObj[bookId].author);
    }
    return Array.from(allAuthors); // Convert Set to Array
  }

  function getAllTitles(booksObj) {
    const allTitle = new Set(); 
    for (const bookId in booksObj) {
      allTitle.add(booksObj[bookId].title);
    }
    return Array.from(allTitle); // Convert Set to Array
  }

  function getAllReviews(booksObj) {
    const allReview = new Set();
    for ( const bookId in booksObj) {
        allReview.add(booksObj [bookId])
    }
    return Array.from(allReview); // Convert Set to Array
  }

  module.exports = { 
    books, 
    getAllAuthors,
    getAllTitles,
    getAllReviews 
  };
