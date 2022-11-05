const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  organization_uuid: {
    type: String,
  },
  organization_title: {
    type: String,
  },
  login_password: {
    type: String,
  },
  login_username: {
    type: String,
  },
  organization_whatsapp_number: {
    type: String,
  },
  organization_call_number: {
    type: String,
  },
  organization_whatsapp_message: {
    type: String,
  },
  organization_logo: {
    type: String,
  },
  theme_color: {
    type: String,
  },
  domains: [
    {
      type: String,
    },
  ],
  org_whatsapp_number: [
    {
      message: {
        type: String,
      },
      tag: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
  ],
  org_call_number: [
    {
      tag: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("organization", OrganizationSchema);
