const { find_transactions_against_user_id } = require("../DAL/transaction");
const { find_user_by_id } = require("../DAL/user");

//********************************************{Detail User}********************************************************/
const _listTransaction = async (params, resp) => {
  let user = await find_user_by_id(params.user_id || "");
  if (!user) {
    resp.error = true;
    resp.status = 404;
    resp.message = "No Transactions Found";
    return resp;
  }
  const transactions = await find_transactions_against_user_id(user._id);
  resp.data = transactions;
  return resp;
};
const listTransaction = async (params) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };
  resp = await _listTransaction(params, resp);
  return resp;
};

module.exports = {
  listTransaction,
};
