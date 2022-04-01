const { application, response, request } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (res, req) => `${JSON.stringify(res.body)}`)
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {skip: (req, res) => req.method != 'POST'}
))

let persons = [
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
        + `<p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)
    if (!person) {
        return response.status(404).json({ error: 'resource not found' })
    }

    response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)

    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => body.name == person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port...${PORT}`)
})