const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Organization = require("../Models/Organization");

// router.post("/CreateAutoQty", async (req, res) => {
//   try {
//     let value = req.body;
//     if (!value) res.json({ success: false, message: "Invalid Data" });
//     value = {...value,auto_uuid:uuid()};

//     console.log(value);
//     let response = await AutoBill.create( value );
//     if (response) {
//       res.json({ success: true, result: response });
//     } else res.json({ success: false, message: "AutoBill Not created" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// });
// router.delete("/DeleteAutoQty", async (req, res) => {
//   try {
//     let value = req.body;
//     if (!value.auto_uuid) res.json({ success: false, message: "Invalid Data" });

//     console.log(value);
//     let response = await AutoBill.deleteMany( {auto_uuid:value.auto_uuid} );
//     if (response) {
//       res.json({ success: true, result: response });
//     } else res.json({ success: false, message: "AutoBill Not Deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// });

router.post("/getOrganization", async (req, res) => {
  try {
    let domains = req.body.domain;
    let response = await Organization.findOne({ domains });
    if (response) {
      res.json({
        success: true,
        result: {
          organization_uuid: response?.organization_uuid,
          organization_title: response?.organization_title,
          organization_logo: response?.organization_logo,
        },
      });
    } else res.json({ success: false, message: "Organization Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.get("/getOrganizationData/:organization_uuid", async (req, res) => {
  try {
    let { organization_uuid } = req.params;
    let response = await Organization.findOne({ organization_uuid });
    let {
      organization_whatsapp_number,
      organization_call_number,
      organization_whatsapp_message,
      organization_logo,
      organization_title,
    } = response;
    if (response) {
      res.json({
        success: true,
        result: {
          organization_whatsapp_number,
          organization_call_number,
          organization_whatsapp_message,
          organization_logo,
          organization_title,
        },
      });
    } else res.json({ success: false, message: "Organization Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.put("/putOrganization", async (req, res) => {
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
    let response = await Organization.updateOne(
      { organization_uuid: value.organization_uuid },
      value
    );

    if (response.acknowledged) {
      res.json({
        success: true,
        result: value,
      });
    } else res.json({ success: false, message: "Organization Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let { domains, login_username, login_password } = req.body;
    let response = await Organization.findOne({
      domains,
      login_password,
      login_username,
    });
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Organization Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
