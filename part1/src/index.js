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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header name={course} />
      <Content part={[part1,part2,part3]}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))