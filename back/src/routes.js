const express = require("express");
const authMiddleware = require("./middlewares/auth");
const routes = express.Router();

const ProductController = require("./controllers/PostController");
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");

//POSTS
routes.get("/posts", ProductController.index);
routes.get("/posts/:id", ProductController.show);

//AUTH & REGISTER
routes.post("/register", authController.createUser);
routes.post("/auth", authController.auth);

//MIDDLEWARE
routes.use(authMiddleware);

// LOGGED PAGES
routes.post("/posts", ProductController.store);
routes.put("/posts/:id", ProductController.update);
routes.delete("/posts/:id", ProductController.destroy);

routes.get("/users", authController.getUsers);
routes.get("/projects", projectController.index);

module.exports = routes;
