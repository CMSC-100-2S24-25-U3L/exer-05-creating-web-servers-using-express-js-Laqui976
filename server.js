import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const FILE_PATH = path.join(process.cwd(), books.txt);

const readFile =  () =>{
  if (!fs.existsSync(FILE_PATH)) return [];

  const data  = fs.readFileSync (FILE_PATH, "utf8").trim();
  if (!data) return;
    return data.split("\n").map(line => {
      const book_details = line.split(",");
      return{
        book_name: book_details[0],
        isbn: book_details[1],
        author: book_details[2],
        year_pub: book_details[3]
      };
    });
}

let books = readFile();
app.get ("/", (req,res)=> {
    res.send("Welcome");
});

app.post("/add-book", (req, res) => {
  const {book_name, isbn, author, year_pub} = req.body;

  if (book_name.isEmpty()||isbn.isEmpty()||author.isEmpty()||year_pub.isEmpty()){
    isSuccess = false;
  }try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, ""); // Ensure the file exists
    }

    // Append book to file
    fs.appendFileSync(FILE_PATH, `\n${book_name},${isbn},${author},${year_pub}`, "utf8");

    books = readFile(); // Refresh books list after adding a new entry
    res.json({ success: true });
  } catch (err) {
    console.error("Error writing to file:", err);
    res.json({ success: false });
  }
});

 

});

app.get("/find-by-isbn-author", (req, res) => {
    const {isbn, author} = req.query;
    const foundBooks = books.filter(book => book.isbn === isbn && book.author === author);
    res.json(foundBooks);

});

app.get("/find-by-author", (req, res) => {
  const {author} = req.query;
  const foundBooks = books.filter(book => book.author === author);
  res.json(foundBooks);

});
app.listen(3000, () => {
  console.log("");
});


