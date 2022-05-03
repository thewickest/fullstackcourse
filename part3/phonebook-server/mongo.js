const mongoose = require('mongoose')

const args = process.argv

const password = args[2]

if (args.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const url =
    `mongodb+srv://graubuntu:${password}@cluster0.yttzt.mongodb.net/phoneBookDB?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

if(args.length===3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const person = new Person({
        name: args[3],
        number: args[4]
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}