const books = [
    {
        ISBN: "12345books",
        title: "tesla!!!",
        pubDate: "2023-05-26",
        language: "en",
        author: [1,2],//here the authors id are taken in the array
        numPage: 250,
        publications: 1,
        category: ["tech", "space", "education"]
    }
]

const author = [
    {
        id: 1,
        name: "Jyothika",
        books: ["12345books", "secretBook"],
        booktitle: ["tesla!!!"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345books"],
        booktitle: ["tesla!!!"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345books"],
    },
    {
        id: 2,
        name: "writex2",
        books: [],
    }
]

//saying to compiler that we want to export this file
module.exports = {books,author,publication}//then these objects can be exported otherwise other js files cannot acces the data