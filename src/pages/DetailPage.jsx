import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { useProducts } from "../contexts/ProductsContext";

export default function DetailPage() {
  const { slug } = useParams();
  const { loading, setLoading } = useProducts();
  const [product, setProduct] = useState([]);

  function fetchProduct() {
    setLoading(true)

    axios
      .get(`http://localhost:3000/api/products/${slug}`)
      .then((res) => setProduct(res.data))
      .finally(() => setTimeout(setLoading(false), 1000))
  }

  useEffect(fetchProduct, []);
  console.log(product);

  return (
    <div className="container mt-5">

      {loading
        ?
        <div className="loader_div">
          <Quantum
            size="150"
            speed="1.75"
            color="rgba(28, 38, 48, 1)"
          />
        </div>
        :

        <div className="card flex-row detail-card">
          <div className="detail-image">
            <img src={`http://localhost:3000/${product.img}`} alt="product image" />
          </div>
          <div className="d-flex flex-column justify-content-around details">
            <h5 className="title">{product.name}</h5>
            <p className="description">{product.description}</p>

            <span>{product.price}€</span>
            <Link to={'/cart'} className="btn btn-primary">
              Aggiungi al carrello
            </Link>

            <p>specifiche tecniche: {product.technical_specs}</p>
          </div>
        </div>}

    </div>
  );
}
