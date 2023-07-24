const mongoose = require("mongoose")

const ItemsSchema = new mongoose.Schema({
	category_uuid: { type: String },
	organization_uuid: { type: String },
	item_uuid: { type: String },
	item_title: { type: String },
	sort_order: { type: String },
	status: { type: String },
	description: { type: String },
	Items_uuid: { type: String },
	// image_urls: [
	// 	{
	// 		url: { type: String },
	// 		sort_order: { type: Number }
	// 	}
	// ],
	image_keys: [
		{
			key: { type: String },
			sort_order: { type: Number }
		}
	],
	price: { type: Number },
	strip_price: { type: Number }
})

module.exports = mongoose.model("items", ItemsSchema)
