const { application } = require('express')
const express = require('express')

app = express()
app.use(express.json())

const persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info por ${persons.length} people</p>`
        +`<p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id',(request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)
    if(!person){
        return response.status(404).json({error:'resource not found'})
    }

    response.send(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port...${PORT}`)
})