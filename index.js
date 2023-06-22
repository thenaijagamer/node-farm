const fs = require("fs");
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const objData = JSON.parse(data);

//////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // OVERVIEW PAGE
  if (pathName == "/") {
    res.end("this is the homepage");

    // PRODUCT PAGE
  } else if (pathName == "/product") {
    res.end("This is the product page");

    // API
  } else if (pathName == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "You entered the wrong path",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
