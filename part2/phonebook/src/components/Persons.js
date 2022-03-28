
const Name = ({name,number,deletePerson}) => (
    <>
      <p>{name} {number}
      <button onClick={deletePerson}>delete</button>
      </p>
    </>
)

const Persons = ({people}) => (
    people.map(person => <Name key={person.id} name={person.name} number={person.number}/>)
)

export default Persons