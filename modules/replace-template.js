module.exports = (temp, product) => {
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
