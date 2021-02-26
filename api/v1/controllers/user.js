// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Private data configurations.
const dotenv = require('dotenv');
dotenv.config();

// Link User model.
const User = require('../../../models/User');

module.exports = {
  register: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      name,
      email,
      phone,
      address,
      password,
      confirmedPassword,
      staffKey,
    } = req.body;

    try {
      // Check if user exists (check if email exists).
      let sameEmail = await User.findOne({ email });
      const errors = [];
      if (sameEmail) {
        errors.push({
          msg: 'Email was already taken. Please enter another email!',
        });
      }
      if (password !== confirmedPassword) {
        errors.push({
          msg: 'Passwords do not match!',
        });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Create new user.
      user = new User({
        name,
        email,
        password,
        phone,
        address,
      });

      // Check if valid staff key.
      if (staffKey === process.env.STAFF_KEY) {
        user.staff = true;
      }

      // Encrypt password.
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken.
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  update: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      name,
      email,
      phone,
      address,
      oldPassword,
      newPassword,
      confirmedNewPassword,
      payment,
    } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const errors = [];

      // Check if email was updated.
      if (user.email !== email) {
        // Check if new email exists.
        let sameEmail = await User.findOne({ email });
        if (sameEmail) {
          errors.push({
            msg: 'Email was already taken. Please enter another email!',
          });
        }
      }

      if (oldPassword && newPassword && confirmedNewPassword) {
        // Check if old password matches.
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          errors.push({
            msg: 'Existing password is not correct! Please try again!',
          });
        }

        // Check if new password is similar to old password.
        if (newPassword === oldPassword) {
          errors.push({
            msg: 'New password cannot be the same as old password!',
          });
        }

        // Check if passwords match.
        if (newPassword !== confirmedNewPassword) {
          errors.push({
            msg: 'Passwords do not match!',
          });
        }

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        // Encrypt new password.
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(newPassword, salt);
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      user.name = name;
      user.email = email;
      user.phone = phone;
      user.address = address;

      if (payment) user.payment = payment;

      await user.save();

      delete user._doc.password;

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
