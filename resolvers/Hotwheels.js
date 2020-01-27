// resolvers\Hotwheels.js
const mongoose = require('mongoose');
const Hotwheel = require('../models/Hotwheels');

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

      const updt = await Hotwheel.findByIdAndUpdate(_id,  { $set: args }, { new: true});

      return updt;
    },
    changeActive: async (parent, args) => {
      const { _id } = args;

      const oldHw = await Hotwheel.findById(_id);
      oldHw.active = ! oldHw.active;

      const updated = await Hotwheel.findByIdAndUpdate(_id, oldHw, { new: true });

      return updated;
    }
  }
};

module.exports = resolvers;
