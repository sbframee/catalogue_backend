const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const ItemCategories = require("../Models/ItemCategories");
const Items = require("../Models/Items");

router.post("/postItemCategories", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, category_uuid: uuid() };
    if (!value.sort_order) {
      let response = await ItemCategories.find({});
      response = JSON.parse(JSON.stringify(response));
      //   console.log(response)
      value.sort_order =
        Math.max(...response.map((o) => o?.sort_order || 0)) + 1 || 0;
    }
    console.log(value);
    let response = await ItemCategories.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.put("/putItemCategories", async (req, res) => {
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
    let response = await ItemCategories.updateOne(
      { category_uuid: value.category_uuid },
      value
    );
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.delete("/deleteItemCategories", async (req, res) => {
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
    let data = await Items.find({ category_uuid: value.category_uuid });
    if (data.length) {
      res.json({
        success: false,
        message:
          "All the items and Item Images will be deleted. Confirm Delete Category ?",
      });
    } else {
      let response = await ItemCategories.deleteMany(
        { category_uuid: value.category_uuid }
      );
      if (response) {
        res.json({ success: true, result: response });
      } else
        res.json({ success: false, message: "Item Categories Not updated" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.delete("/deleteAllItemCategories", async (req, res) => {
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
    await Items.deleteMany({ category_uuid: value.category_uuid });

    let response = await ItemCategories.deleteMany(
      { category_uuid: value.category_uuid }
    );
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getActiveItemCategories/:organization_uuid", async (req, res) => {
  try {
    let response = await ItemCategories.find({
      organization_uuid: req.params.organization_uuid,
      status:1
    });
    if (response.length) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getItemCategories/:organization_uuid", async (req, res) => {
  try {
    let response = await ItemCategories.find({
      organization_uuid: req.params.organization_uuid,
    });
    console.log(response.length)
    if (response.length) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Categories Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
