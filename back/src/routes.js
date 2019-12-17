const express = require("express");
const authMiddleware = require("./middlewares/auth");
const routes = express.Router();

const ProductController = require("./controllers/PostController");
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");

//POSTS
routes.get("/posts/:id", ProductController.show);
routes.get("/posts", ProductController.index);

//AUTH & REGISTER
routes.post("/register", authController.createUser);
routes.post("/auth", authController.auth);
routes.get("/users", authController.getUsers);

//MIDDLEWARE
routes.use(authMiddleware);

// LOGGED PAGES
routes.post("/posts", ProductController.store);
routes.put("/posts/:id", ProductController.update);
routes.delete("/posts/:id", ProductController.destroy);

routes.get("/projects", projectController.index);

module.exports = routes;
