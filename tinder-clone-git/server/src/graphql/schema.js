export default `
  scalar Date

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    email: String!
    username: String
    name: String!
    age: Int!
    avatar: String
    createdAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    name: String!
    age: Int!
    avatar: String
    createdAt: Date!
  }

  type Query {
    getUsers: [User]
    me: Me
  }

  type Mutation {
    createCard(_id: ID!): User
    signup(email: String!, name: String!, age: Int!, password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  schema  {
    query: Query
    mutation: Mutation
  }
`;
