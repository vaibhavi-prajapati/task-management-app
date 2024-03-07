import React from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";

function Home() {
  return (
    <Layout>
      Home
      <Link to="tasks">View All Tasks</Link>
    </Layout>
  );
}

export default Home;
