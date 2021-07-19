import React, { useState } from "react";
const Statistics = ({ items, active }) =>
  !active ? (
    <p>no feedback given</p>
  ) : (
    items.map((x) => (
      <p>
        {x.label}: {x.value}
      </p>
    ))
  );
  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = bad + good + neutral;
  const stats = [
    {
      label: "Bad",
      value: bad,
    },
    {
      label: "Neutral",
      value: neutral,
    },
    {
      label: "Good",
      value: good,
    },
    {
      label: "All",
      value: good + bad + neutral,
    },
    {
      label: "Average",
      value: (-bad + good) / all || 0,
    },
    {
      label: "Positive",
      value: ((good / all) * 100 || 0) + "%",
    },
  ];
  return (
    <div>
      <h2>Give Feedback</h2>
      <button
        onClick={() => {
          setBad(bad + 1);
        }}
      >
        Bad
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
      >
        Neutral
      </button>
      <button
        onClick={() => {
          setGood(good + 1);
        }}
      >
        Good
      </button>

      <h2>Statistics</h2>
      <Statistics items={stats} active={all > 0} />
    </div>
  );
};

export default App;
