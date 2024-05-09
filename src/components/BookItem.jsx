/*eslint-disable*/
export default function BookItem({book, onBookDelete}){
  return(
     
      <div className='col-4'>
                     <div className='card'>
                          <div className='card-header'>
                              {book.title}
                           </div>
                           <div className='card-body'>
                            <p className='card-text'>{book.author}</p> 
                            <p className='card-text'>{book.genre}</p> 
                            </div> 
                            <div className='card-footer'>
                              <button className='btn btn-danger' onClick={(evt) => onBookDelete(evt, book._id)}>Delete</button>
                             </div> 
                      </div>
      </div>
  );
}