const express = require('express')
const app = express()
app.use(express.json()) //! express json-parser
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
app.get('/',(req, res)=>{
    res.send('hello cl')
})
app.get('/api/notes',(req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id',(req, res)=>{
    const id = Number(req.params.id)
    const note = notes.find(note => {
        // console.log(note.id, id, typeof id, note.id === id)
        return  note.id === id
    })
    // console.log(note)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
    // res.json(note)
})
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1
}

app.post('/api/notes',(req, res)=>{
    const body = req.body
    if (!body.content){
        return res.status(400).json({error:"content missing"})
    }
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
    }
    // note.id = generateId()
    // note.test = 'stupid stuff'
    notes = notes.concat(note)
    res.json(note)
})
app.delete('/api/notes/:id',(req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})
// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-type':'application/json'})
//     response.end(JSON.stringify(notes))
// })
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})  
