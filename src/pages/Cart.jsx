import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useEffect } from "react";

export default function Cart() {
  const { cart, addProd, removeProd, reduceProd } = useCart();

  useEffect(() => {
    localStorage.removeItem("order");
  }, []);

  return (
    <>
      <h1 className="text-primary text-center">CART PAGE</h1>
      <div className="container cart-size rounded-3 p-5">
        {cart.length === 0 ? (
          <h1 className="text-center text-color">CARRELLO VUOTO</h1>
        ) : (
          cart.map((product) => (
            <div
              key={product.id}
              className="d-flex align-items-center justify-content-between py-3 border-bottom"
            >
              <div id="cart-section" className="flex-grow-1 d-flex justify-content-between">
                <div className="me-5 mb-3 cart-image">
                  <img
                    src={`http://localhost:3000/${product.img}`}
                    alt=""
                  />
                </div>

                <div className="d-flex">
                  <div>
                    <h4 className="fw-semibold text-white mb-3">
                      {product.product_name || product.name}
                    </h4>

                    <button
                      className="btn btn-outline-light cart-btn"
                      onClick={() => reduceProd(product)}
                    >
                      <i className="bi bi-cart-dash cart-icon" />
                    </button>

                    <small className="text-white mx-2">
                      Quantità: {product.quantity}
                    </small>

                    <button
                      className="btn btn-outline-light cart-btn"
                      onClick={() => addProd(product)}
                    >
                      <i className="bi bi-cart-plus cart-icon" />
                    </button>
                  </div>
                  <div className="align-self-center ms-3">
                    <button
                      className="btn btn-danger btn-remove"
                      onClick={() => removeProd(product)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4 className="text-white m-0">
              Totale:{" "}
              {cart
                .reduce((tot, p) => tot + p.price * p.quantity, 0)
                .toFixed(2)}{" "}
              €
            </h4>

            <Link to="/checkout" className="btn btn-light">
              Procedi al checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
