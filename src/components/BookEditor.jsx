import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react/prop-types
export default function BookEditor({showToast}){

    const {bookId} = useParams();
    const [book, setBook] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [page_count, setPageCount] = useState('');
    const [publication_date, setPublicationDate] = useState('');
    
    
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`,{withCredentials: true})
        .then(response => {
            setBook(response.data);
            setTitle(response.data.title);            
            setAuthor(response.data.author);
            setGenre(response.data.genre);
            setPageCount(response.data.page_count);
            setPublicationDate(response.data.publication_date);
        })
        .catch(error => console.log(error));
    });

    function onBookUpdate(evt){
        evt.preventDefault();
        console.log('Submit Triggered');

        const updatedBook = {
            ...book,
            title,
            author,
            publication_date,
            genre,
            page_count
        }

        delete updatedBook._id;

        //console.log(updatedBook)

        axios.put(`${import.meta.env.VITE_API_URL}/api/books/update/${bookId}`,
        {...updatedBook}
        ,{withCredentials: true})
        .then(response => {
            console.log(response.data);
            showToast(response.data.message, 'success');
            navigate('/');
           // setUpdateCounter(prevCount => prevCount + 1);
           
        })
        .catch(error => console.log(error));
    }

    return (
      <>
        <h1>Book Editor Component - {bookId}</h1>
        <form onSubmit={(evt) => onBookUpdate(evt)}>
          <div>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              id="author"
              className="form-control"
              value={author}
              onChange={(evt) => setAuthor(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              className="form-control"
              value={genre}
              onChange={(evt) => setGenre(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="page_count" className="form-label">
              Page Count
            </label>
            <input
              type="number"
              id="page_count"
              className="form-control"
              value={page_count}
              onChange={(evt) => setPageCount(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="publication_date" className="form-label">
              Publication Date
            </label>
            <input
              type="text"
              id="publication_date"
              className="form-control"
              value={publication_date}
              onChange={(evt) => setPublicationDate(evt.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Update Book
            </button>
          </div>
        </form>
      </>
    );
}