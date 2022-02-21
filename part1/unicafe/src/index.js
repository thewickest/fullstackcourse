import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({name}) => (
  <h1>{name}</h1>
)

const Statistic = (props) => (
  <p>{props.name} {props.value}</p>
)

const Button = ({handleClick,name}) => (
  <button onClick={handleClick}>{name}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <Title name="give feedback"/>
      <Button handleClick={()=>setGood(good+1)} name="good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} name="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} name="bad"/>
      <Title name="statistics"/>
      <Statistic name="good" value={good}/>
      <Statistic name="neutral" value={neutral}/>
      <Statistic name="bad" value={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)