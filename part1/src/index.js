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
      <Part part={prop.part[0]} exercise={prop.exercise[0]}/>
      <Part part={prop.part[1]} exercise={prop.exercise[1]}/>
      <Part part={prop.part[2]} exercise={prop.exercise[2]}/>
    </div>
  )
}

const Part = (prop) => {
  return (
    <>
      <p>{prop.part} {prop.exercise}</p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part={[part1,part2,part3]} exercise={[exercises1,exercises2,exercises3]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))