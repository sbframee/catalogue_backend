const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  category_uuid: {
    type: String,
  },
  organization_uuid: {
    type: String,
  },
  item_uuid: {
    type: String,
  },
  item_title: {
    type: String,
  },
  sort_order: {
    type: String,
  },
  status: {
    type: String,
  },

  description: {
    type: String,
  },

  Items_uuid: {
    type: String,
  },
  image_urls: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("items", ItemsSchema);
