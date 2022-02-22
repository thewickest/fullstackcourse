import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({name}) => (
  <>
    <h1>{name}</h1>
  </>
)

const Button = ({handleClick,name}) => (
  <button onClick={handleClick}>{name}</button>
)

const Anecdote = ({anecdote, count}) => (
  <>
    <p>{anecdote}</p>
    <p>has {count} votes</p>
  </>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  const getRandom = () => {
    setSelected(Math.floor(Math.random()*6))
  }

  const vote = (s) => {
    const arr = [...votes]
    arr[s] += 1
    setVotes(arr)
  }

  const getMaxVotes = () => {
    const arr = [...votes]
    let max = 0
    let maxIndex = 0
    arr.forEach((element,index) => {
      if (element > max) {
        maxIndex = index
        max = element
      }
    });
    return maxIndex
  }

  return (
    <div>
      <Title name="Anecdote of the day"/>
      <Anecdote anecdote={props.anecdotes[selected]} count={votes[selected]}/>
      <Button handleClick={() => vote(selected)} name="vote"/>
      <Button handleClick={getRandom} name="next anecdote"/>
      <Title name="Anecdote with most votes"/>
      <Anecdote anecdote={props.anecdotes[getMaxVotes()]} count={votes[getMaxVotes()]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)