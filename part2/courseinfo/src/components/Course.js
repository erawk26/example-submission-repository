import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <table>
      <Header title={course.name} />
      <tbody>
        <Content items={course.parts} />
        <Total exercises={course.parts.map((x) => x.exercises)} />
      </tbody>
    </table>
  );
};

export default Course;
