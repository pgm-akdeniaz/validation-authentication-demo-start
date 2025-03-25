import { validationResult } from "express-validator";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      err: req.formErrorFields?.email ? req.formErrorFields["email"] : "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      err: req.formErrorFields?.password ? req.formErrorFields["password"] : "",
    }
  ];

  const flash = req.flash || {};

  res.render("login", {
    layout: "layouts/authentication",
    inputs, 
    flash
  })

};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      req.formErrorFields = {};

      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden"
      }

      return next();
    }

    const user = await User.query().findOne({
      email: req.body.email
    })
    if (!user) {
      req.formErrorFields = { email: "Deze gebruiker bestaat niet" };
      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden."
      };

      return next()
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      req.formErrorFields = { password: "Je hebt een ongeldig wachtwoord ingegeven." };
      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden",
      };
      return next();
    }

    //create jwt token
    const token = jwt.sign({
      userId: user.id, email: user.email
    }, process.env.TOKEN_SALT,
      {
        expiresIn: '1h'
      })
    
    //add cookie
    res.cookie('token', token, { httpOnly: true });

    //to home page
    res.redirect('/')


  }
  catch (e) {
    next(e.message)
  }
};
	
export const register = async (req, res) => {
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
 
  const roles = await Role.query();
  const flash = req.flash || {};
 
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
 
    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });
  
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
        req.flash = { type: "danger", message: "Dit e-mail adres is al in gebruik." };
        req.formErrorFields = { email: "Dit e-mail adres is al in gebruik." };
        return next();
      }
 
      	
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
      await User.query().insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        role_id: parseInt(req.body.role),
      });
    
      res.redirect("/login");
    }
    
  } catch(e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {};