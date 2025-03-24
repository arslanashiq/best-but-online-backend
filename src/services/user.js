const bcrypt = require("bcrypt");


const {
  find_user_by_phone_number,
  add_user,
  find_user_by_id,
  find_user_by_id_with_withdrawl_password,
} = require("../DAL/user");

//********************************************{Add User}********************************************************/
const _addUser = async (body, resp) => {
  let user = await find_user_by_phone_number(body.phone_number);
  if (user) {
    resp.error = true;
    resp.status = 409;
    resp.message = "User Alreay Exist";
    return resp;
  }
  // signup new user
  user = await add_user(body);
  if (!user) {
    resp.error = true;
    resp.status = 400;
    resp.message = "Something Went Wrong";
    return resp;
  }
  user = user.toObject();
  delete user.withdrawl_passowrd;
  delete user.login_password;
  resp.data = user;
  return resp;
};
const addUser = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
    status: 201,
  };

  resp = await _addUser(body, resp);
  return resp;
};

//********************************************{Detail User}********************************************************/
const _detailUser = async (params, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  resp.data = data.toObject();
  return resp;
};
const detailUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _detailUser(params, resp);
  return resp;
};

//********************************************{Update User Task Count}********************************************************/
const _updateRemainingTaskCount = async (params, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  data.remaining_tasks = data.remaining_tasks - 1;
  await data.save();
  resp.data = data.toObject();
  return resp;
};
const updateRemainingTaskCount = async (params) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _updateRemainingTaskCount(params, resp);
  return resp;
};

//********************************************{Update Task Asign Date}********************************************************/
const _updateTaskAsignDate = async (params, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  data.last_task_assigned_date = Date.now();
  await data.save();
  resp.data = data.toObject();
  return resp;
};
const updateTaskAsignDate = async (params) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _updateTaskAsignDate(params, resp);
  return resp;
};

//********************************************{Update Balance}********************************************************/
const _updateBalance = async (params, body, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  data.balance_amount = body.balance_amount;
  await data.save();
  resp.data = data.toObject();
  return resp;
};
const updateBalance = async (params, body) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _updateBalance(params, body, resp);
  return resp;
};

//********************************************{Update Bank}********************************************************/
const _updateBank = async (params, body, resp) => {
  let user = await find_user_by_id(params.id || "");
  if (!user) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  user.bank_info = body.bank_info;
  await user.save();
  resp.data = user.toObject();
  return resp;
};
const updateBank = async (params, body) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _updateBank(params, body, resp);
  return resp;
};
//********************************************{Withdrawl Balance}********************************************************/
const _withdrawlBalance = async (params, body, resp) => {
  let user = await find_user_by_id_with_withdrawl_password(params.id || "");
  if (!user) {
    resp.error = true;
    resp.status = 404;
    resp.message = "User Not Found";
    return resp;
  }
  const isValidWithdrawlPassword = await bcrypt.compare(
    body.withdrawl_passowrd,
    user.withdrawl_passowrd
  );
  if (!isValidWithdrawlPassword) {
    resp.error = true;
    resp.message = "Invalid Withdrawl Password";
    resp.status = 400;

    return resp;
  }
  if (body.amount > user.balance_amount) {
    resp.error = true;
    resp.message = `Withdrawl ammount cannot be greater than ${user.balance_amount}`;
    resp.status = 400;

    return resp;
  }
  user.balance_amount = user.balance_amount - body.amount;
  await user.save();
  user = user.toObject();
  delete user.withdrawl_passowrd;
  resp.data = user;

  return resp;
};
const withdrawlBalance = async (params, body) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _withdrawlBalance(params, body, resp);
  return resp;
};

module.exports = {
  addUser,
  detailUser,
  updateRemainingTaskCount,
  updateTaskAsignDate,
  updateBalance,
  updateBank,
  withdrawlBalance,
};
