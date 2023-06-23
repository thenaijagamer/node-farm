const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const replaceTemp = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCTNUTRIENTNAME%}/g, product.nutrient);
  output = output.replace(/{%PRODUCTLOCATION%}/g, product.from);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
  product.organic
    ? (output = output.replace(/{%NOTORGANIC%}/g, ""))
    : (output = output.replace(/{%NOTORGANIC%}/g, "not-organic"));
  return output;
};

const objData = JSON.parse(data);

//////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = objData.map((el) => replaceTemp(tempCard, el)).join("");
    const overviewPage = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);
    res.end(overviewPage);

    // PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = objData[query.id];
    const productPage = replaceTemp(tempProduct, product);
    res.end(productPage);

    // API
  } else if (pathname == "/api") {
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
