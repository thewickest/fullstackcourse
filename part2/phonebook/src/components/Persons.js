
const Name = ({person,click}) => (
  <>
    <p>{person.name} {person.number}
    <button onClick={()=>click(person)}>delete</button>
    </p>
  </>
)

const Persons = ({people,handleOnClick}) => (
  people.map(person => 
    <Name key={person.id} person={person} click={handleOnClick}/>
  )
)

export default Persons