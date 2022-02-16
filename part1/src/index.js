import React from 'react'
import ReactDOM from 'react-dom'

const Header = (prop) => {
  return (
    <>
      <h1>{prop.name}</h1>
    </>
  )
}

const Content = (prop) => {
  console.log(prop.part)
  return (
    <div>
      <Part part={prop.part[0]}/>
      <Part part={prop.part[1]}/>
      <Part part={prop.part[2]}/>
    </div>
  )
}

const Part = (prop) => {
  return (
    <>
      <p>{prop.part.name} {prop.part.exercises}</p>
    </>
  )
}

const Total = (prop) =>{
  return (
    <>
      <p>Number of exercises {prop.total}</p>
    </>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header name={course} />
      <Content part={parts}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))