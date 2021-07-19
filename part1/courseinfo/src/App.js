import React from "react";
const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};
const Content = ({ items }) => (
  <div>
    {items.map((item, index) => (
      <p key={index}>
        {item.name}: {item.exercises}
      </p>
    ))}
  </div>
);
const Total = ({ exercises }) => (
  <p>Total Exercises: {exercises.reduce((a, b) => a + b, 0)}</p>
);
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header title={course.name} />
      <Content items={course.parts} />
      <Total exercises={course.parts.map((x) => x.exercises)} />
    </div>
  );
};

export default App;
