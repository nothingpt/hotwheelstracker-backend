// schemas\HotWheel.js
const typeDefs = `
  type HotwheelObject {
    _id: ID
    model: String!
    colors: [String!]!
    description: String
    active: Boolean
  }

  type UserObject {
    _id: ID
    username: String!
    password: String
  }

  type SuccessMessage {
    message: String
  }

  type LoginResponse {
    token: String
    user: UserObject
  }

  type Query {
    hotwheels: [HotwheelObject]!
    hotwheel(_id: ID!): HotwheelObject
    me: UserObject!
  }

  type Mutation {
    createHotwheel(model: String!, colors: [String!], description: String): HotwheelObject,
    editHotwheel(_id: ID!, model:String, colors: [String], description: String): HotwheelObject
    changeActive(_id: ID!): HotwheelObject
    register(username: String!, password: String!): UserObject!
    login(username: String!, password: String!): LoginResponse!
    logout: SuccessMessage
  }
`;

module.exports = typeDefs;
