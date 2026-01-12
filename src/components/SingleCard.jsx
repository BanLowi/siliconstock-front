import { Link } from "react-router";

export default function SingleCard({ todo }) {

  return (
    <>
      <div className="card h-100">
        <img
          src={`http://localhost:3000/${todo.img}`}
          className="card-img-top"
          alt={todo.name}
        />
        <div className="card-body">
          <h5 className="card-title">{todo.name}</h5>
          <p className="card-text">{todo.description}</p>
          <span>{todo.price}</span>
          <p>{todo.technicalSpecs}</p>
          <Link to={`/products/${todo.slug}`} className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>
    </>
  );
}
