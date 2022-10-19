const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  category_uuid: {
    type: String,
  },
  category_title: {
    type: String,
  },
  organization_uuid: {
    type: String,
  },
  sort_order: {
    type: String,
  },
  status: {
    type: Number,
  },

 
});

module.exports = mongoose.model("item_categories", ItemsSchema);
