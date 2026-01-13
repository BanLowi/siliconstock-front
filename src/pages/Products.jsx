import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "../components/SingleCard";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { useProducts } from "../contexts/ProductsContext";

export default function Products() {
  const [todos, setTodos] = useState([]);
  const { loading, setLoading } = useProducts();

  function fetchTodos() {
    setLoading(true)

    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setTodos(res.data))
      .finally(() => setTimeout(setLoading(false), 1000))
  }

  useEffect(fetchTodos, []);

  return (

    <div className="container mt-4">

      {loading
        ?
        <div className="loader_div">
          <Quantum
            size="150"
            speed="1.75"
            color="rgba(28, 38, 48, 1)"
          />
        </div>
        : <div>
          <h1 className="text-uppercase my-3">products</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {todos.map((item) => (
              <div key={item.id} className="col mb-3">
                <SingleCard todo={item} />
              </div>
            ))}
          </div>
        </div>}

    </div>
  );
}
