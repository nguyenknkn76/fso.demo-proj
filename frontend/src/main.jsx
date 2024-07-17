import ReactDOM from 'react-dom/client'
import App from './App'
import {setContext} from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, gql, ApolloProvider, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'

// todo setup to adding token to header 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true
})

// todo init client 
// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache(),
//   // connectToDevTools: true //! sus i cant use this shit (apollo dev tool) ??? and idk why
// }) 

//! use ApolloProvider to use AppoloClient from another comps
ReactDOM.createRoot(document.getElementById('root')).render( 
  <ApolloProvider client={client}>  
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)