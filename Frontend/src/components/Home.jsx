import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.buttonContainer}>
        <Link to="/countries-analytics">
            <button style={styles.button}>Countries Analytics</button>
        </Link>
        <Link to="/customer-analytics">
            <button style={styles.button}>Detailed Customer Analytics</button>
        </Link>
        <Link to="/consumer-metrics">
            <button style={styles.button}>Customer metrics</button>
        </Link>
        <Link to="/chat">
            <button style={styles.button}>Chat History</button>
        </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
