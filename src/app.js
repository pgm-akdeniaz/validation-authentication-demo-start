// import npm libraries
import express from "express";
import bodyParser from "body-parser";
import expressEjsLayouts from "express-ejs-layouts";
import { VIEWS_PATH, PORT } from "./consts.js";
import cookieParser from "cookie-parser";

// import actions from controllers
import { contact, home, postContact } from "./controllers/PageController.js";
import { getUsers } from "./controllers/api/UserController.js";
import * as AuthController from "./controllers/AuthController.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";

import {
  login,
  logout,
  postLogin,
  postRegister,
  register,
} from "./controllers/AuthController.js";
import ContactValidation from "./middleware/validation/ContactValidation.js";

const app = express();
app.use(express.static("public"));

/**
 * Import the body parser
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.set("views", VIEWS_PATH);

/**
 * App Routing
 */
app.get("/login", login);
app.get("/register", register);
//app.post("/register", postRegister, register);
app.post(
  "/register",
  AuthRegisterValidation,
  AuthController.postRegister,
  AuthController.register
);
app.post("/login", postLogin, login);
app.post("/logout", logout);

app.get("/", home);
app.get("/contact", contact);
app.post("/contact", ContactValidation, postContact, contact);

/**
 * API Routing
 */
app.get("/api/user", getUsers);

// start the server
app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});
