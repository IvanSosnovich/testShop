const { connect, Products } = require('./module');
const faker = require('faker');

let items = [];
const main = async () => {
  for (let i = 0; i <= 100; i++) {
    items.push(
      new Products({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: Math.floor(Math.random() * 10 + 1),
        image: faker.image.imageUrl(),
        category: faker.commerce.product(),
      }),
    );
  }
  await Products.insertMany(items);
};

main();
connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
