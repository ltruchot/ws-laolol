require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/usersModel');

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
  };
}

exports.login = function (req, res, next) {
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo,
  });
};

exports.register = function (req, res, next) {
  // Check for registration errors
  const { email } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { password } = req.body;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
      profile: { firstName, lastName },
    });

    user.save((err, user) => {
      if (err) { return next(err); }
      // Respond with JWT if user was created
      const userInfo = setUserInfo(user);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
    });
  });
};

// Role authorization check
exports.roleAuthorization = function (role, req, res) {
  let code = 501;
  if (!req.user) {
    code = 422;
    res.status(422).json({ error: 'No user was found.' });
  } else if (req.user.role === role) {
    // If user is found, check role.
    code = 201;
  } else {
    code = 401;
    res.status(code).json(false);
  }
  return code;
};

// Constants for role types
exports.roles = {
  REQUIRE_ADMIN: 'Admin',
  REQUIRE_CLIENT: 'User',
};
