import React from "react";
import styles from "../styles/styles";

const Content = ({ items }) =>
  items.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td style={styles.stats}>{item.exercises}</td>
    </tr>
  ));

export default Content;
