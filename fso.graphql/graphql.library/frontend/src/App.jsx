import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import {useApolloClient}from "@apollo/client"
import Recommend from "./components/Recommend";
const App = () => {
  const [token, setToken] = useState(null)
  const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ndXllbiIsImlkIjoiNjY5NzJhOWQ5YTk1N2Q1YTI3ZmFmZjllIiwiaWF0IjoxNzIxMjA3MTk4fQ.5z5zaHlaEHJobJCBhBxm0f8bDsySxr0gpW56RZ_DCa4'
  const client = useApolloClient()
  const handleLogout = () => {
    console.log('try logout')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const padding = {
    padding: '5px'
  }
  
  return (
    <div>
      <div>
        debug: {token ? "have token" : "non"}
        <button onClick={() => {
          setToken(TEST_TOKEN)
          localStorage.setItem("logged-in-token",TEST_TOKEN)
        }}>set token</button>
      </div>
      <div>
        <Link to='/login' style={padding}>login</Link>
        <Link to='/books' style={padding}>books</Link>
        <Link to='/authors' style={padding}>authors</Link>
        <Link to='/recommend' style={padding}>{token ? 'recommend' : null}</Link>
        {
          token && <Link to='/add' style={padding}>add</Link>

        }
        <a href="#" onClick={handleLogout} style={padding}>{token ? "logout" : null}</a>
      </div>
      
      <Routes>
        <Route path='/login' element={<Login setToken={setToken} />}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/authors' element={<Authors />}/>
        <Route path='/add' element={<NewBook />}/>
        <Route path='/recommend' element={<Recommend />}/>
        <Route path='/' element={<Home />}/>
      </Routes>

      
    </div>
  );
};

export default App;