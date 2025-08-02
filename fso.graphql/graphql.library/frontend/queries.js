import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors{
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            id
            published
            genres
            author{
                name
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation ($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
        addBook(title: $title, author: $author, genres: $genres, published: $published) {
            id
            title
            author{
                name
            }
        }
    }
`

export const EDIT_NUMBER = gql`
    mutation Mutation($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation Mutation($username: String!, $password: String!){
        login (username: $username, password: $password){
            value
        }
    }
`

export const ME = gql`
    query Me {
        me {
            username
            id
            favoriteGenre
        }
    }
`