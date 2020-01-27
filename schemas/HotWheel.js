// schemas\HotWheel.js
const typeDefs = `
  type HotwheelObject {
    _id: ID
    model: String!
    colors: [String!]!
    description: String
    active: Boolean
  }

  type Query {
    hotwheels: [HotwheelObject]!
    hotwheel(_id: ID!): HotwheelObject
  }

  type Mutation {
    createHotwheel(model: String!, colors: [String!], description: String): HotwheelObject,
    editHotwheel(_id: ID!, model:String, colors: [String], description: String): HotwheelObject
    changeActive(_id: ID!): HotwheelObject
  }
`;

module.exports = typeDefs;
