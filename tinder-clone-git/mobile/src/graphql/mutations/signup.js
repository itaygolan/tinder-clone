import { gql } from 'react-apollo';

export default gql`
  mutation signup(
    $name: String!,
    $email: String!,
    $password: String!,
    $age: Int!,
    $avatar: String,
    $username: String
  ) {
    signup(
      name: $name,
      email: $email,
      password: $password,
      username: $username
      age: $age
      avatar: $avatar
    ) {
      token
    }
  }
`
