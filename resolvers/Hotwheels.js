// resolvers\Hotwheels.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Hotwheel = require("../models/Hotwheels");
const User = require("../models/User");

const resolvers = {
  Query: {
    hotwheels: async () => await Hotwheel.find({}),
    hotwheel: async (parent, args) => {
      const results = await Hotwheel.findById(args._id);

      return results;
    }
  },
  Mutation: {
    createHotwheel: async (parent, args) => {
      const { model, colors, description } = args;

      const newHotwheel = new Hotwheel({
        model: model.toUpperCase(),
        colors: colors.map(color => color.toUpperCase()),
        description
      });

      const error = await newHotwheel.save();

      if (error) return error;

      return newHotwheel;
    },
    editHotwheel: async (parent, args) => {
      const { _id } = args;

      const updt = await Hotwheel.findByIdAndUpdate(
        _id,
        { $set: args },
        { new: true }
      );

      return updt;
    },
    changeActive: async (parent, args) => {
      const { _id } = args;

      const oldHw = await Hotwheel.findById(_id);
      oldHw.active = !oldHw.active;

      const updated = await Hotwheel.findByIdAndUpdate(_id, oldHw, {
        new: true
      });

      return updated;
    },
    register: async (parent, { username, password }, ctx, info) => {
      const user = await new User({ username, password }).save();

      return user;
    },
    login: async (parent, { username, password }, ctx, info) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Invalid Login");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid Login");
      }

      // 3. generate the JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET);
      // 4. Set the cookie with the token
      ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });

      return {
        token,
        user
      };
    }
  }
};

module.exports = resolvers;
