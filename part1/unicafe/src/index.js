import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({name}) => (
  <h1>{name}</h1>
)

const Statistics = (props) => (
  <p>{props.name} {props.value}</p>
)

const Button = ({handleClick,name}) => (
  <>
    <button onClick={handleClick}>{name}</button>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title name="give feedback"/>
      <Button handleClick={()=>setGood(good+1)} name="good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} name="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} name="bad"/>
      <Title name="statistics"/>
      <Statistics name="good" value={good}/>
      <Statistics name="neutral" value={neutral}/>
      <Statistics name="bad" value={bad}/>
      <Statistics name="all" value={good+neutral+bad}/>
      <Statistics name="average" value={(good-bad)/(good+neutral+bad)}/>
      <Statistics name="positive" value={(good/(good+neutral+bad))*100+'%'}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)