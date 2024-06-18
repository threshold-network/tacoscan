import React from "react";
import styles from "./styles.module.css";
import * as Const from "../../utils/Cons";

const About = () => {
  return (
    <div className={styles.about_content}>
      <h3>The Idea</h3>
      <p>Provide insight into the workings of the TACo system.</p>
      <div className={styles.div_bottom}>
        <a target="_blank" href={"https://github.com/nucypher/taco-subgraphs"}>[Subgraph code] - </a>
        <a target="_blank" href={"https://github.com/threshold-network/tacoscan"}>[Website code] </a>
      </div>
    </div>
  )
};

export default About;
