require('dotenv').config()
const { application, response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (res, req) => `${JSON.stringify(res.body)}`)
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {skip: (req, res) => req.method != 'POST'}
))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments({},function (err, count) {
        response.send(
            `<p>Phonebook has info for ${count} people</p>`
            + `<p>${new Date()}</p>`
        )
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(personRemoved => {
            console.log('Id para borrar:',id)
            console.log('Persona borrada:',personRemoved)
            console.log(`${personRemoved.name} removed from dataBase`)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id',(request, response, next) => {
    Person.findOneAndUpdate({name: request.body.name}, {number: request.body.number})
        .then(updatedPerson => {
            response.json({name: updatedPerson.name, number: request.body.number})
        })
        .catch(error => next(error))

})

/**Processing errors */
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running in port...${PORT}`)
})