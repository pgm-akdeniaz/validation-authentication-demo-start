/**
 * An auth controller that handles login, register, and logout
 */

/**
 * Login
 */
import { validationResult } from "express-validator";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const login = async (req, res) => {
  res.render("login", { layout: "layouts/authentication" });
};
export const postLogin = async (req, res, next) => {};

/**
 * Register
 */
export const register = async (req, res) => {
  // input fields
  const inputs = [
    {
      name: "firstname",
      label: "Voornaam",
      type: "text",
      value: req.body?.firstname ? req.body.firstname : "",
      err: req.formErrorFields?.firstname ? req.formErrorFields.firstname : "",
    },
    {
      name: "lastname",
      label: "Achternaam",
      type: "text",
      value: req.body?.lastname ? req.body.lastname : "",
      err: req.formErrorFields?.lastname ? req.formErrorFields.lastname : "",
    },
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      err: req.formErrorFields?.password ? req.formErrorFields.password : "",
    },
  ];

  // get the roles
  const roles = await Role.query();
  const flash = req.flash || {};

  // render the register page
  res.render("register", {
    layout: "layouts/authentication",
    inputs,
    roles,
    flash,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // set the form error fields
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      // set the flash message
      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden",
      };

      return next();
    } else {
      const user = await User.query().findOne({ email: req.body.email });
      const role = await Role.query().findOne({ id: req.body.role });

      // validate if the role exists in the database
      if (!role) {
        req.flash = { type: "danger", message: "Deze rol bestaat niet." };
        req.formErrorFields = { role: "Deze rol bestaat niet." };
        return next();
      }
      // validate if the user already exists
      if (user) {
        req.flash = {
          type: "danger",
          message: "Dit e-mail adres is al in gebruik.",
        };
        req.formErrorFields = { email: "Dit e-mail adres is al in gebruik." };
        return next();
      }

      // temp res.send
      res.send("no errors, registrate the user");
    }
  } catch (e) {
    next(e.message);
  }
};
/**
 * Logout
 */
export const logout = async (req, res) => {};
