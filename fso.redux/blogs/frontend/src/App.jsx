import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/public/Footer'

const App = () =>{
  const padding = {
    padding: 5
  }

  return(
    <div>
      <div>
        <Link to="/" style={padding}>home</Link>
        <Link to="/users" style={padding}>users</Link>
        <Link to="/blogs" style={padding}>blogs</Link>
        <Link to="/login" style={padding}>login</Link>
      </div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/users' element={<UserPage/>}/>
        <Route path='/users/:id' element={<UserPage/>}/>
        <Route path='/blogs' element={<BlogPage/>}/>
        <Route path='/blogs/:id' element={<BlogPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<LoginPage/>}/>
        
      </Routes>

      <Footer/>
    </div>
  )
}

export default App