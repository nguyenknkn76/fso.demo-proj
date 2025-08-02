import { useMutation, useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../../queries"

const Recommend = () => {
    const result = useQuery(ME)
    const result2 = useQuery(ALL_BOOKS)
    
    const myinfo = result.data.me
    const books = result2.data.allBooks
    const isGenre = (genres) => {
        if (genres.includes(myinfo.favoriteGenre)) return true
        return false
    } 
    const recBooks = books.filter(book => isGenre(book.genres) ? book : false)
    console.log(myinfo)
    return(
        <>
            <strong>recommendation genre: {myinfo.favoriteGenre}</strong>
            <ul>
                {
                    recBooks?.map(book => 
                        <li key={book.id}>{book.title} <strong>{book.genres.join(',')}</strong></li>
                    )
                }
            </ul>
        </>
    )
}
export default Recommend