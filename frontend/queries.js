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
            author
            id
            published
        }
    }
`

export const ADD_BOOK = gql`
    mutation ($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
        addBook(title: $title, author: $author, genres: $genres, published: $published) {
            id
            title
            author
        }
    }
`

export const EDIT_NUMBER = gql`
    mutation Mutation($name: String!, $setToBorn: Int!) {
        editAuthor(name: $name, setBornTo: $setToBorn) {
            name
            born
            bookCount
        }
    }
`