const { connect, model, pluralize, Schema } = require('mongoose');

const nameUserModel = 'user';
const nameProductsModel = 'products';

const userShema = new Schema({
  login: String,
  name: String,
  soname: String,
  password: String,
  role: String,
  favoritItems: [
    {
      type: Schema.Types.ObjectId,
      ref: nameProductsModel,
    },
  ],
  updateItems: [
    {
      type: Schema.Types.ObjectId,
      ref: nameProductsModel,
    },
  ],
  basketItems: [
    {
      type: Schema.Types.ObjectId,
      ref: nameProductsModel,
    },
  ],
});

const productsShema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  category: String,
});

productsShema.statics.getAllCategory = async function () {
  const category = await this.find();
  const result = [];
  category.forEach((el) => {
    const category = el.category;
    const findResult = result.find((el) => el === category);
    if (!findResult) {
      result.push(category);
    }
  });
  return result;
};

module.exports = {
  connect,
  User: model(nameUserModel, userShema),
  Products: model(nameProductsModel, productsShema),
};
