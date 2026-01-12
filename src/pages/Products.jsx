import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "../components/SingleCard";

export default function Products() {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setTodos(res.data));
  }

  useEffect(fetchTodos, []);

  return (
    <div className="container mt-4">
      <h1 className="text-uppercase my-3">products</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
        {todos.map((item) => (
          <div className="col">
            <SingleCard key={item.id} todo={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
