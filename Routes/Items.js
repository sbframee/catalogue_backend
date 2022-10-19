const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Items = require("../Models/Items");

router.post("/postItem", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, item_uuid: uuid() };
    if (!value.sort_order) {
      let response = await Items.find({});
      response = JSON.parse(JSON.stringify(response));
        console.log(response)
      value.sort_order =
        Math?.max(...response?.map((o) => o?.sort_order || 0)) + 1 || 0;

    }
    console.log(value);
    let response = await Items.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.put("/putItem", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = Object.keys(value)
      .filter((key) => key !== "_id")
      .reduce((obj, key) => {
        obj[key] = value[key];
        return obj;
      }, {});
    console.log(value);
    let response = await Items.updateOne(
      { item_uuid: value.item_uuid },
      value
    );
    if (response.acknowledged) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Not updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.delete("/deleteItem", async (req, res) => {
  try {
    let { item_uuid } = req.body;
    let response = await Items.deleteMany({ item_uuid });
    response = JSON.parse(JSON.stringify(response));
    if (response.acknowledged) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getItems/:organization_uuid/:category_uuid", async (req, res) => {
  try {
    let { organization_uuid, category_uuid } = req.params;
    let response = await Items.find({ organization_uuid, category_uuid });
    response = JSON.parse(JSON.stringify(response));
    if (response.length) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getItems/:organization_uuid", async (req, res) => {
  try {
    let { organization_uuid } = req.params;
    let response = await Items.find({ organization_uuid });
    response = JSON.parse(JSON.stringify(response));
    if (response.length) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getAtiveItems/:organization_uuid/:category_uuid", async (req, res) => {
  try {
    let { organization_uuid,category_uuid } = req.params;
    let response = await Items.find({ organization_uuid,status:1,category_uuid });
    response = JSON.parse(JSON.stringify(response));
    if (response.length) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
