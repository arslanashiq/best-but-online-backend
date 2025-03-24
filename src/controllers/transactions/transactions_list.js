const { listTransaction } = require("../../services/transaction");

const transactions_list = async (req, res) => {
  try {
    const { error, message, data } = await listTransaction(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }
    res.status(200).json({
      code: 200,
      message: "Transaction List",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = transactions_list;
