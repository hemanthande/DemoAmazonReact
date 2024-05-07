import { useState, useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBar from './components/NavBar'
import BookList from './components/BookList'
import LoginForm from './components/LoginForm'

function App() {

  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    const userRole = localStorage.getItem('userRole');
    if(fullName){
      setFullName(fullName);
    }
    if(userRole){
      setUserRole(userRole);
    }
  }, []);
  
  return (
    <>
    <div className='container d-flex flex-column min-vh-100'>
      <header>
        <NavBar fullName =  {fullName } />
      </header>
      <main className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<BookList />} />
          <Route path='/login' element={<LoginForm setFullName={setFullName} />} />
          <Route path='/contact' element={<h1>Contact</h1>} />
        </Routes>
      </main>
      <footer>
        <h5>This is my footer</h5>
      </footer>
     </div>
    </>
  )
}

export default App