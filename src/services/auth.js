const bcrypt = require("bcrypt");
const moment = require("moment");

const { find_user_by_phone_number } = require("../DAL/user");
const { create_jwt_token, verify_jwt_token } = require("../libs/jsonwebtoken");
const {
  add_to_session,
  delete_from_session_by_user_id,
} = require("../DAL/session");

//********************************************{login user}********************************************************/
const _login = async (body, resp) => {
  let user = await find_user_by_phone_number(body.phone_number);

  if (!user) {
    resp.error = true;
    resp.message = "Invalid Phone Number";
    resp.status = 404;

    return resp;
  }

  //   check password

  const isValidPassword = await bcrypt.compare(
    body.login_password,
    user.login_password
  );
  if (!isValidPassword) {
    resp.error = true;
    resp.message = "Invalid Password";
    resp.status = 400;

    return resp;
  }

  // const last_task_assigned_date = moment(user.last_task_assigned_date);
  // const toady_date = moment(new Date());
  // const interval = toady_date.diff(last_task_assigned_date, "days");

  // if (interval > 0) {
  //   user.remaining_tasks = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
  //   user.last_task_assigned_date = Date.now();
  //   user.save();
  // }
  user = user.toObject();
  delete user.login_password;
  delete user.withdrawl_passowrd;

  const token = create_jwt_token({ data: user });
  await add_to_session(token, user._id);
  //   return response
  resp.data = { user, token };
  return resp;
};
const login = async (body) => {
  let resp = {
    error: false,
    message: "",
    status: 200,

    data: {},
  };

  resp = await _login(body, resp);
  return resp;
};

//********************************************{logout user}********************************************************/
const _logout = async (token, resp) => {
  const decoded = verify_jwt_token({ data: token });
  if (decoded?.data?._id) {
    let session = await delete_from_session_by_user_id(decoded?.data?._id);

    if (session?.acknowledged) {
      resp.message = "Successfully Logout";
      resp.status = 200;
      return resp;
    }
  }

  resp.error = true;
  resp.status = 400;
  resp.message = "Somthing Went Wrong";
  return resp;
};
const logout = async (token) => {
  let resp = {
    error: false,
    message: "",
    status: 200,
    data: {},
  };

  resp = await _logout(token, resp);
  return resp;
};

module.exports = { login, logout };
