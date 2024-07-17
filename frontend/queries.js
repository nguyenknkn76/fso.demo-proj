import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
    query {
        allPersons {
            id
            name
            phone
            address {
                city
                street
            }
        }
    }
`

export const FIND_PERSON = gql`
    query findPersonByName ($nameToSearch: String!){
        findPerson(name: $nameToSearch){
            id
            name
            phone
            address{
                city
                street
            }
        }
    }
`

export const CREATE_PERSON = gql`
    mutation adddPerrssonn ($name: String!, $street: String!, $city: String!, $phone: String) {
        addPerson(name: $name, street: $street, city: $city, phone: $phone) {
            id
            name 
            phone
            address {
                city
                street
            }
        }
    }
`

export const EDIT_NUMBER = gql`
    mutation editNumber ($name: String!, $phone: String!) {
        editNumber(name: $name, phone: $phone) {
            id
            phone
            name
            address {
                street
                city
            }
            
        }
    }
`

export const LOGIN = gql`
    mutation login ($username: String!, $password: String!){
        login(username: $username, password: $password) {
            value
        }
    }
`
