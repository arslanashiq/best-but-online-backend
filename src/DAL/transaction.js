const bcrypt = require("bcrypt");
const mongoose =require('mongoose')
const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");

const add_transaction = async (body) => {
  let transaction = new Transaction(body);
  transaction.save();
  return transaction;
};

const find_transactions_against_user_id = async (id, type = "withdraw") => {
  return await Transaction.find({
    user_id: new mongoose.Types.ObjectId(id),
  });
};

module.exports = {
  add_transaction,
  find_transactions_against_user_id
};
