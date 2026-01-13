import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import SingleCard from "../components/SingleCard";

export default function DetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);

  function fetchProduct() {
    axios
      .get(`http://localhost:3000/api/products/${slug}`)
      .then((res) => setProduct(res.data));
  }

  useEffect(fetchProduct, []);
  console.log(product);

  return (
    <>
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
      </div>
    </>
  );
}
