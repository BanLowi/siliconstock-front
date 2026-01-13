import { Link } from "react-router";

export default function SingleCard({ todo }) {

  return (
    <>
      <div className="card h-100">
        <div>
          <img
            src={`http://localhost:3000/${todo.img}`}
            className="card-img-top"
            alt={todo.name}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title mb-3">{todo.product_name}</h5>
          </div>
          <div className="mb-3">
            <span>{todo.price}€</span>
          </div>
          <div className="d-flex flex-column">
            <Link to={`/products/${todo.product_slug}`} className="btn btn-primary mb-3">
              Dettagli
            </Link>
            <Link to={'/cart'} className="btn btn-primary">
              Aggiungi al carrello
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
