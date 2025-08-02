import { useQuery,gql } from "@apollo/client";
import { ALL_BOOKS } from "../../queries";
import { useState } from "react";

const Books =  () => {
    const [genre, setGenre] = useState("all")
    const result = useQuery(ALL_BOOKS)

    if(result.loading) {
        return <div>... is loading</div>
    }
    const books = result.data.allBooks
    const genres = books.map(book => book.genres)
    let listGenre = []
    const setListGenre = () => {
      genres.forEach(genre => {
        genre.forEach(g => {
          if (!listGenre.includes(g)){
            listGenre.push(g)
          }
        })
      });
    } 
    setListGenre()
    // console.log(listGenre)
    // console.log(genres)
    // console.log(books)

    const isGenre = (book) => {
      if(book.genres.includes(genre)) return true
      return false
    }

    const booksFilter = books.filter(book => isGenre(book) ? book : null)
    const booksToShow = genre === "all" ? books : booksFilter
    console.log(booksToShow)
    return (
      <div>
        <h2>books</h2>
        {genre && <div>in genre {genre}</div>}
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToShow?.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <strong>genre</strong> 
            {
              listGenre.concat("all").map(g => 
                <button key={g} onClick={() => setGenre(g)}>{g}</button>
              )
            }
        </div>
      </div>
    )
  }
  
  export default Books