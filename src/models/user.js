const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const userSchema = new mongoose.Schema({
  phone_number: {
    type: String,
  },
  user_name: {
    type: String,
    default: "",
  },
  login_password: {
    type: String,
    default: "",
  },
  withdrawl_passsword: {
    type: String,
    default: "",
  },

  balance_amount: {
    type: String,
    default: "0",
  },
  remaining_tasks: {
    type: Number,
    default: 20,
  },
  last_task_assigned_date: { type: Date, default: Date.now }, // Auto-generated timestamp
  is_active: {
    type: Boolean,
    default: true,
  },
  bank_info: {
    type: Object,
    default: null,
  },
});

userSchema.plugin(timestamps);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    "_id",
    "phone_number",
    "user_name",
    "login_password",
    "withdrawl_password",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};
const User = mongoose.model("user", userSchema);
module.exports = { User };
