const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const add_user = async (body) => {
  let user = new User(body);
  const salt = await bcrypt.genSalt(10);
  user.login_password = await bcrypt.hash(user.login_password, salt);
  user.withdrawl_passowrd = await bcrypt.hash(user.withdrawl_passowrd, salt);
  user.save();
  return user;
};

const find_user_by_id = async (id) => {
  return await User.findOne({ _id: id }, "-login_password -withdrawl_passowrd");
};
const find_user_by_id_with_withdrawl_password = async (id) => {
  return await User.findOne({ _id: id }, "-login_password ");
};

const find_user_by_phone_number = async (phone_number) => {
  return await User.findOne({ phone_number });
};

module.exports = {
  add_user,
  find_user_by_id,
  find_user_by_phone_number,
  find_user_by_id_with_withdrawl_password,
};
