import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function BookList() {
    const [books, setBooks] = useState([]);


    function onBookDelete(evt, bookId){
        evt.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}/api/books/delete/${bookId}`,{withCredentials: true})
        .then(response => {
            setDeleteCounter(prevCount => prevCount + 1);
            showToast(response.data.message, 'success');
        })
        .catch(error => console.log(error));
    }

    
    useEffect(() => {
        axios.get('http://localhost:3003/api/books/list',{withCredentials: true})
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
      <>
        <h1>Book List</h1>
        {!books.length ? (
          <h2>
            Please <Link to="/login">Login</Link> to See Books
          </h2>
        ) : (
          <div className="row">
            {books.map((book) => (
              <div key={book._id} className="col-4">
                <div class="card">
                  <div class="card-header">{book.title}</div>
                  <div class="card-body">
                    <h5 class="card-title">{book.author}</h5>
                    <p class="card-text">{book.genre}</p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
}