import { ALL_AUTHORS, EDIT_NUMBER } from "../../queries"
import { useQuery, useMutation} from "@apollo/client"
import {useState, useEffect} from 'react'
const Authors = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const result = useQuery(ALL_AUTHORS)
    // console.log( result)
    const [editNumber] = useMutation(EDIT_NUMBER, {
      refetchQueries: [{query: ALL_AUTHORS}],
      update:  (cache, res) => {
        cache.updateQuery({query: ALL_AUTHORS},  ({allAuthors}) => {
          return {
            allAuthors: allAuthors.filter(a => a.name === name ? res.data.editAuthor : a)
          }
        })
      }
    })
    // ! cache dang bi. sus


    
    if(result.loading){
        return <div>... loading</div>
    }
    const authors = result.data.allAuthors

    const updateBirth = (e) => {
      e.preventDefault()
      console.log('try update')
      const newBorn = Number(born)
      console.log(newBorn, typeof(newBorn))
      editNumber({variables: {name: name, setBornTo: newBorn}})
      setBorn('')
      setName('')
    }
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors?.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Set birth year</h2>

        <form onSubmit={updateBirth}>
          <div>
            name: 
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <select value={name} onChange={(e) => setName(e.target.value)}>
              {
                authors.map(author => 
                  <option key={author.name} value={author.name}>{author.name}</option>
                )
              }
            </select>
          </div>
          <div>
            born: <input type='number' value={born} onChange={(e) => setBorn(e.target.value)}/>
          </div>
          <button type="submit">update</button>
        </form>
        
      </div>
    )
  }
  
  export default Authors