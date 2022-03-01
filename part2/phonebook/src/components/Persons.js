
const Name = ({name,number}) => (
    <>
      <p>{name} {number}</p>
    </>
)

const Persons = ({people}) => (
    people.map(person => <Name key={person.id} name={person.name} number={person.number}/>)
)

export default Persons