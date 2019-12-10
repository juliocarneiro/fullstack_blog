const mongoose = require("mongoose");

module.exports = {
  async index(req, res) {
    return res.json({ message: "Projetos", id: req.userId });
  }
};
