import needle from "needle";

var books = {
  "978-0-7475-3269-9": {
    name: "Harry Potter and the Philosopher's Stone",
    isbn: "978-0-7475-3269-9",
    author: "J.K Rowling",
    year: 1997,
  },
  "0-7475-3849-2": {
    name: "Harry Potter and the Chamber of Secrets",
    isbn: "0-7475-3849-2",
    author: "J.K Rowling",
    year: 1998,
  },
  "978-0156012195": {
    name: "THe Little Prince",
    isbn: "978-0156012195",
    author: "Antoine Saint-Exupery",
    year: 1943,
  },
};
needle.post("http://localhost:3000/add-book", "foo=bar", books, (err, res) => {
  console.log(res.body);
});
needle.get("http://localhost:3000/add-book", (err, res) => {
  console.log(res.body);
});
