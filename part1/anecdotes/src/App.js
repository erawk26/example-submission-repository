import React, { useState } from "react";
const Card = (props) =>
  props.anecdote == null ? (
    ''
  ) : (
    <div>
      <h3>{props.headline}</h3>
      <p>{props.anecdote}</p>
      <p>{props.votes} Votes</p>
    </div>
  );
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];
  const getRandom = () => Math.round(Math.random() * (anecdotes.length - 1));
  const getNew = (x) => {
    const y = getRandom();
    return y === x ? getNew(x) : y;
  };
  const sortVotes = (list) => {
    const keysSorted = Object.keys(list).sort(function(a, b) {
      return list[b] - list[a];
    });
    const mostVotes = keysSorted[0];
    return Object.keys(list).length ? mostVotes : null;
  };
  const [selected, setSelected] = useState(getRandom);
  const [votes, setVotes] = useState({});
  const submitVote = (key, obj) => {
    if (key in obj) {
      obj[key] += 1;
    } else {
      obj[key] = 1;
    }
    console.log({ votes: obj });
    return obj;
  };
  return (
    <>
      <Card
        headline="Quote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected] || 0}
      />
      <div>
        <button onClick={() => setSelected(getNew(selected))}>Next Anecdote</button>
        <button onClick={() => setVotes({ ...submitVote(selected, votes) })}>
          Vote
        </button>
      </div>
      <Card
        headline="Most Popular"
        anecdote={anecdotes[sortVotes(votes)] || null}
        votes={votes[sortVotes(votes)] || 0}
      />
    </>
  );
};

export default App;
