import express from "express";
import { openSync, closeSync, appendFileSync } from "node:fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get ("/", (req,res)=> {
    res.send("Welcome");
});
app.post("/add-book", (req, res) => {
  var book_name ="Harry Potter and the Philosopher's Stone";
  var author ="J.K Rowling";
  var isbn = "978-0-7475-3269-9";
  var year_pub = 1997;
  var isSuccess = false;

  if (verify_book(book_name, author, isbn, year_pub)) {
    try {
      fs = openSync('books.txt', 'a');
      appendFileSync(fs, [book_name, author, isbn, year_pub] , 'utf8');
      } catch (err) {
          console.log(err);
      } finally {
      if (fs !== undefined)
          closeSync(fs);
      } 
    isSuccess = true;
  }
  res.send("{Succes: " + isSuccess.toString() + " }");
});

app.listen(3000, () => {
  console.log("");
});

function verify_book(book_name, author, isbn, year_pub) {
  if (
    book_name.isEmpty() &&
    author.isEmpty() &&
    year_pub.isEmpty &&
    isbn.isEmpty
  ) {
    return true;
  }

  return false;
}
