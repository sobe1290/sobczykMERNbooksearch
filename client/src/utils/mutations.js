import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!){
    loginUser(email: $email, email:$password){
        token
        user {
            _id
            username
            email
            password
        }
    }
}
`;
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, email:$password){
        token
        user {
            _id
            username
            email
            password
        }
    }
}
`;
export const SAVE_BOOK = gql`
mutation saveBook($body: SaveBookData!){
    saveBook(SaveBookData: $SaveBookData) {
        _id
        username
        email
        password
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId) {
        _id
        username
        email
        password
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
            }
    }
}
`;