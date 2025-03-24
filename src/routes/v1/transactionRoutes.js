const express = require("express");
const { create_route } = require("../utilities/createRoute");
const transactions_list = require("../../controllers/transactions/transactions_list");

const router = express.Router();

create_route({
  router,
  route: "/:user_id/transactions",
  auth_enable: true,
  get_method: transactions_list,
});

module.exports = router;
