const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  amount: {
    type: String,
    default: "",
  },

  bank: {
    type: Object,
    default: null,
  },
  type: {
    type: String,
    default: "",
  },
});

transactionSchema.plugin(timestamps);

transactionSchema.methods.toJSON = function () {
  const transaction = this;
  const transactionObject = transaction.toObject();
  const transactionJson = _.pick(transactionObject, [
    "_id",
    "user_id",
    "amount",
    "bank",
    "type",
    "createdAt",
    "updatedAt",
  ]);
  return transactionJson;
};
const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = { Transaction };
