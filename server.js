import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const FILE_PATH = path.join(process.cwd(), books.txt);

app.get ("/", (req,res)=> {
    res.send("Welcome");
});
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

app.post("/add-book", (req, res) => {
  const {book_name, isbn, author, year_pub} = req.body;
  var isSuccess = true;
  isSuccess = true;
  if (book_name.isEmpty()||isbn.isEmpty()||author.isEmpty()||year_pub.isEmpty()){
    isSuccess = false;
  }else{
    try{
      fs.appendFileSync(FILE_PATH,[book_name, isbn, author, year_pub],"utf8");
    }catch(err){
      console.log(err);
      isSuccess=false;
    }

  }

  res.send("{Success: " + isSuccess.toString() + " }");

});

app.get("/find-by-isbn-author", (req, res) => {
    const {isbn, author} = req.query;
    const books = readFile();
    const foundBooks = books.filter(book => book.isbn === isbn && book.author === author);
    res.json(foundBooks);

});

app.get("/find-by-author", (req, res) => {
  const {author} = req.query;
  const books = readFile();
  const foundBooks = books.filter(book => book.author === author);
  res.json(foundBooks);

});
app.listen(3000, () => {
  console.log("");
});


