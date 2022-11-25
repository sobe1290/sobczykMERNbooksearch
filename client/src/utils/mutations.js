import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($username: String!, $email: String!, $password: String!){
    loginUser(username: $username, email: $email, email:$password){
        token
        username
        email
        password
    }
}
`
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, email:$password){
        token
        username
        email
        password
    }
}
`
export const SAVE_BOOK = gql`
mutation saveBook($authors: String!, $description: String!, $bookId: String!, $image: String!, $link: String!, $title: String!){
    saveBook($authors: String!, $description: String!, $bookId: String!, $image: String!, $link: String!, $title: String!) {
        authors
        description
        bookId
        image
        link
        title
    }
}
`
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId) {
        bookId
    }
}
`