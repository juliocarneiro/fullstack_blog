const mongoose = require("mongoose");
const Post = mongoose.model("Post");

module.exports = {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const options = {
        populate: "user",
        limit: 10,
        page: page
      };
      const posts = await Post.paginate({}, options);

      return res.json(posts);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },

  async show(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("user", "name");

      return res.json(post);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },

  async store(req, res) {
    try {
      const post = await Post.create(req.body);
      return res.json({ message: "Post cadastrado com sucesso!" });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req, body, {
        new: true
      });
      return res.json(post);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },

  async destroy(req, res) {
    try {
      await Post.findByIdAndRemove(req.params.id);
      return res.send({ message: "Post deletado com sucesso!" });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }
};
