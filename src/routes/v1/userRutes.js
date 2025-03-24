const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_user = require("../../controllers/user/add_user");
const update_balance = require("../../controllers/user/update_balance");
const update_task_assigned_date = require("../../controllers/user/update_task_assigned_date");
const update_remaining_task_count = require("../../controllers/user/update_remaining_task_count");
const withdraw_amount = require("../../controllers/user/withdraw_amount");
const detail_user = require("../../controllers/user/detail_user");
const updated_bank = require("../../controllers/user/update_bank");
const transactions_list = require("../../controllers/transactions/transactions_list");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: false,
  post_method: add_user,
});
create_route({
  router,
  route: "/:id/update_remaining_task_count",
  auth_enable: true,
  put_method: update_remaining_task_count,
});
create_route({
  router,
  route: "/:id/withdraw_amount",
  auth_enable: true,
  put_method: withdraw_amount,
});
create_route({
  router,
  route: "/:id/update_task_assigned_date",
  auth_enable: true,
  put_method: update_task_assigned_date,
});
create_route({
  router,
  route: "/:id/update_balance",
  auth_enable: true,
  put_method: update_balance,
});
create_route({
  router,
  route: "/:id/update_bank",
  auth_enable: true,
  put_method: updated_bank,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: detail_user,
});


module.exports = router;
