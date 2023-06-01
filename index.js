const fs = require("fs");
const http = require("http");
// const url = require("url");

//////////////////////////////////
// File reading and writing

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado:\n${textIn}\nCreated on ${Date.now()}`;
// fs.appendFileSync("./txt/output.txt", textOut);
// console.log(fs.readFileSync("./txt/output.txt", "utf-8"));

// Non-blocking, asynchronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
//       err ? console.log(err.message) : console.log(data);
//     });
//   }
// });

//////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("hello from the server");
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
