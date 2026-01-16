import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";

export default function SingleCard({ todo }) {

  const { cart, setCart } = useCart();


  function handleAddCart() {

    setCart((prevProds) => {

      const checkProducts = prevProds.find((item) => item.id === todo.id);

      if (checkProducts) {

        return prevProds.map((item) => item.id === todo.id ? { ...item, quantity: item.quantity + 1 } : item)

      } else {

        return [...prevProds, { ...todo, quantity: 1 }]

      }

    })
  }

  return (
    <>
      <div className="card card_hover h-100">
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
            <button onClick={handleAddCart} className="btn btn-primary">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
