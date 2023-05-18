const fs = require("fs");

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado:\n${textIn}\nCreated on ${Date.now()}`;
// fs.appendFileSync("./txt/output.txt", textOut);
// console.log(fs.readFileSync("./txt/output.txt", "utf-8"));

// Non-blocking, asynchronous way

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
      err ? console.log(err.message) : console.log(data);
    });
  }
});
