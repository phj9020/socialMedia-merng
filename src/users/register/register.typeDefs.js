import {gql} from 'apollo-server';

export default gql`
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation {
        register(registerInput : RegisterInput) : User!
    }
`