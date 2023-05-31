//*****Book Management System Project*****

const express = require("express");

//INITIALISE EXPRESS

const booky = express();



//for post method
var bodyParser = require("body-parser");
//initialize body parser so that booky can use it
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
//body parser is something that allows express to ready the body and parse it into json format so as well as machine and we can understand it.
//urlencoded({extended: true}) --> allows that any format of request in the url apart from string like object




//Database
const database = require("./database");



//1.Books

/*
Route            /
Description      PUBLIC
Parameter        NONE
Methods          GET
*/
//checking whether everything is connected properly or not just by printing all the books in database
//Also the API to get all the books from DB
booky.get("/",(req,res) => {
    return res.json({book: database.books});
});

/*OUTPUT:

localhost:3000/dhfbvk

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"publications":[1],"category":["tech","space","education"]}]}

localhost:3000/hfvbd

Cannot GET /hfvbd

*/

//API - To get specific book based on ISBN
/*
Route            /is
Description      Get specific book onISBN
Parameter        isbn(in url)
Methods          GET
*/
//below :isbn says that the value of isbn in url will changes dynamically
booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn)
    //to send the msg if nothing is returned in the above filter method
    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN ${req.params.isbn}`});
        //${} represents that the value inside it will changes dynamically backtick is used as we have some value that is changing dynamically
    }
    return res.json({book: getSpecificBook});
});

/*OUTPUT:

localhost:3000/is/12345books

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"publications":[1],"category":["tech","space","education"]}]}


localhost:3000/is/12345book123

{"error":"No book found for the ISBN 12345books122"}

*/


/*
Route            /c
Description      Get specific book on category
Parameter        category
Methods          GET
*/
//API - To get books based on the category
booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category))
    //include method will iterate over category in book and checks eheter the given caterory is present(if yes it will return a new array) or not
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the category of ${req.params.category}`})
    }
    return res.json({book: getSpecificBook});
});

/*OUTPUT:

localhost:3000/c/tech

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"publications":[1],"category":["tech","space","education"]}]}

localhost:3000/c/technowlogy

{"error":"No book found for the category of techs"}

*/




/*
Route            /l
Description      Get specific book on language
Parameter        language
Methods          GET
*/
//API - To get list of books based on languages
booky.get("/l/:language",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.language === req.params.language);
    if(getSpecificBook.length === 0){
        return res.json({error: `No  book found for the category of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});

/*OUTPUT:

localhost:3000/l/en ----------------> as we write en as language it shows error when it is english in URL

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"publications":[1],"category":["tech","space","education"]}]}

localhost:3000/l/english

{"error":"No  book found for the category of english"}
*/


//2.Author

/*
Route            /author
Description      Get all the authors
Parameter        NONE
Methods          GET
*/
//API - To get all the authors from DB
booky.get("/author",(req,res) => {
    return res.json({authors: database.author});
});

/*OUTPUT:

localhost:3000/author

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"publications":[1],"category":["tech","space","education"]}]}

localhost:3000/authorbfvdsj

Cannot GET /authorbfvdsj
*/


/*
Route            /author/book
Description      Get all the authors on book isbn
Parameter        isbn
Methods          GET
*/
//API - To get a specific author based on isbn of the book
booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found for the book of isbn : ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthor});
})

/*OUTPUT:

localhost:3000/author/book/secretBook

{"author":[{"id":1,"name":"Jyothika","books":["12345books","secretBook"]}]}

localhost:3000/author/book/12345books

{"author":[{"id":1,"name":"Jyothika","books":["12345books","secretBook"]},{"id":2,"name":"Elon Musk","books":["12345books"]}]}

localhost:3000/author/book/Newbook

{"error":"No author found for the book of isbn : Newbook"}
*/


/*
Route            /author/bookn/name
Description      Get all the authors on book name
Parameter        name
Methods          GET
*/
//API - To get a list of authors based on books 
booky.get("/author/bookn/:name",(req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.booktitle.includes(req.params.name));
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found for the book  : ${req.params.name}`});
    }
    return res.json({author: getSpecificAuthor});
});
/*OUTPUT:

localhost:3000/author/bookn/tesla!!!

{"author":[{"id":1,"name":"Jyothika","books":["12345books","secretBook"],"booktitle":["tesla!!!"]},{"id":2,"name":"Elon Musk","books":["12345books"],"booktitle":["tesla!!!"]}]}

localhost:3000/author/bookn/the%20poor%20dad

{"error":"No author found for the book  : the poor dad"}

*/


//3.Publication

/*
Route            /publication
Description      Get all the publication
Parameter        NONE
Methods          GET
*/
//API - To get all the publications
booky.get("/publication",(req,res) => {
    return res.json({publication: database.publication});
});

/*OUTPUT:

localhost:3000/publication

{"publication":[{"id":1,"name":"writex","books":["12345books"],"booktitle":["tesla!!!"]}]}

localhost:3000/publicationasdas

Cannot GET /publicationasdas

*/


/*
Route            /publication
Description      Get all the publication
Parameter        NONE
Methods          GET
*/
//API - To get specific publication of the book
booky.get("/publication/:isbn",(req,res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publication is found for the isbn ${req.params.isbn}`});
    }
    return res.json({publication: getSpecificPublication});
})

/*OUTPUT:

localhost:3000/publication/12345books

{"publication":[{"id":1,"name":"writex","books":["12345books"],"booktitle":["tesla!!!"]}]}

localhost:3000/publication/12345booksaaaaaaaaaaa

{"error":"No publication is found for the isbn 12345booksaaaaaaaaaaa"}

*/














//POST METHOD
/*
Route            /book/new
Description      Adding new book
Parameter        NONE
Methods          POST
*/
booky.post("/book/new",(req,res) => {
    const newBook = req.body;//this basically store/fetching the body of the request i.e., it stores the req content that will be added to the database 
    //here we are asking the server to insert that objects into the DB 
    //pushing the data into DB
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});


/*
Route            /author/new
Description      Adding new author
Parameter        NONE
Methods          POST
*/
booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;//this basically store/fetching the body of the request i.e., it stores the req content that will be added to the database 
    //here we are asking the server to insert that objects into the DB 
    //pushing the data into DB
    database.author.push(newAuthor);
    return res.json({updatedAuthorss: database.author});
});


/*
Route            /publication/new
Description      Adding new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/publication/new",(req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublication: database.publication});
})

















//PUT METHOD
/*
Route            /publication/update/book
Description      Updating/Adding new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/
/*
req.body contains
{
    "pubId": 2;
}
*/
//updating the publication of book so that books in publication (database.js) and publications in books will get updated 
booky.put("/publication/update/book/:isbn", (req,res) => {
    //update the publication
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId){
           return  pub.books.push(req.params.isbn);
        }
    });

    //update the book
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubId; //as anybook has only 1 publication so we replaced the previous one rather than adding the new publication.
            return;
        }
    }); 

    return res.json({
        books: database.books,
        publication: database.publication,
        message: "Successfully updated the publications"
    });

    //Task - updated the prev publication of the book to null
});


















//DELETE METHOD
/*
Route            /book/delete/
Description      Deleting a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/
booky.delete("/book/delete/:isbn", (req,res) => {
    //whichever book that doesnot match the isbn ,just send it to updatedBookDB array
    //and rest will be filtered out.
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatedBookDatabase;

    return res.json({books: database.books});
});
/*OUTPUT:

http://localhost:3000/

{"book":[{"ISBN":"12345books","title":"tesla!!!","pubDate":"2023-05-26","language":"en","author":[1,2],"numPage":250,"publications":1,"category":["tech","space","education"]}]}

After:

localhost:3000/book/delete/12345books  in postman - delete method

http://localhost:3000/

{"book":[]}

*/



/*
GIVEN AS TASK

Route            /book/delete/:isbn 
Description      Deleting a author that contains given isbn book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/
booky.delete("/author/delete/:isbn", (req,res) => {
    const updatedAuthorDatabase = database.author.filter((author) => !author.books.includes(req.params.isbn));
    database.author = updatedAuthorDatabase;

    return res.json({books: database.author});
});
/*OUTPUT:
before the operation

http://localhost:3000/author

{"authors":[{"id":1,"name":"Jyothika","books":["12345books","secretBook"],"booktitle":["tesla!!!"]},{"id":2,"name":"Elon Musk","books":["12345books"],"booktitle":["tesla!!!"]}]}

After:
 
localhost:3000/author/delete/12345books

http://localhost:3000/author

{"authors":[]}
*/



//Now re-run the server to do the next operations
/*
Route            /book/delete/author
Description      Deleting a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/
//deleteing an author from a particular book so that in books list of author we must delete that book name too.
booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)//deleting the author present in the url in book array --> authors.
            );
            book.author = newAuthorList;
            return;
        }
    });


    //Update the author database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)){
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });


    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted from the book"
    });
});

/*

localhost:3000/book/delete/author/12345books/1

//here the publication no 1 will be deleted from book with isbn 12345books and
//books ---> author --->  author id will be deleted
//the book with isbn with 12345books will be deleted from the books of author
//author ---> books ---> isbn will be deleted

{
    "book": [
        {
            "ISBN": "12345books",
            "title": "tesla!!!",
            "pubDate": "2023-05-26",
            "language": "en",
            "author": [
                2
            ],     //Originally author : [1,2]
            "numPage": 250,
            "publications": 1,
            "category": [
                "tech",
                "space",
                "education"
            ]
        }
    ],
    "author": [
        {
            "id": 1,
            "name": "Jyothika",
            "books": [
                "secretBook"
            ],    //Originally books: ["12345books" , "secretBook"]
            "booktitle": [
                "tesla!!!"
            ]
        },
        {
            "id": 2,
            "name": "Elon Musk",
            "books": [
                "12345books"
            ],
            "booktitle": [
                "tesla!!!"
            ]
        }
    ],
    "message": "Author was deleted from the book"
}
*/










booky.listen(3000, () => {
    console.log("Server is up and running");
});