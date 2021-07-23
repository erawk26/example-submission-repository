import React from "react";
import styles from "../styles/styles";

const Total = ({ exercises }) => (
  <tr>
    <td>Total Exercises</td>
    <td style={styles.stats}>{exercises.reduce((a, b) => a + b, 0)}</td>
  </tr>
);

export default Total;
