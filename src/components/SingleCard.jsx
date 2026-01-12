export default function SingleCard({ todo }) {
  return (
    <>
      <div className="card">
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
          <a href="#" className="btn btn-primary">
            Dettagli
          </a>
        </div>
      </div>
    </>
  );
}
