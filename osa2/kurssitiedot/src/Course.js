import React from "react"

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  );
}
  

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }

  const Total = ({ course }) => {
    let initialValue = 0
    const sumValues = (previousValue, currentValue) => previousValue + currentValue.exercises
    const sum = course.parts.reduce(sumValues, initialValue)
    return (
      <p><strong>Number of exercises {sum}</strong></p>
    )
  }


  export default Course