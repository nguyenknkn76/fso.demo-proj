import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client'

// todo init client 
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  // connectToDevTools: true //! sus i cant use this shit (apollo dev tool) ??? and idk why
}) 

//! try to fetch data 
// const query = gql`
//   query {
//     allPersons  {
//       name,
//       phone,
//       address {
//         street,
//         city
//       }
//       id
//     }
//   }
// `

// client.query({ query })
//   .then((response) => {
//     console.log(response.data)
//   })

//! use ApolloProvider to use AppoloClient from another comps
ReactDOM.createRoot(document.getElementById('root')).render( 
  <ApolloProvider client={client}>  
    <App />
  </ApolloProvider>
)