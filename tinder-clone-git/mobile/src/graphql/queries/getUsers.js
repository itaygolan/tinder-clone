import { gql } from 'react-apollo';

export default gql`
  {
    getUsers {
      _id
      name
      age
      avatar
    }
  }
`;
