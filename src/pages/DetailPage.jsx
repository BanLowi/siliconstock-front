import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import SingleCard from "../components/SingleCard";

export default function DetailPage() {
  const { slug } = useParams();
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    axios
      .get(`http://localhost:3000/api/products/${slug}`)
      .then((res) => setTodos(res.data));
  }

  useEffect(fetchTodos, []);
  console.log(todos);

  return (
    <>
      <SingleCard key={todos.id} todo={todos} />
    </>
  );
}
