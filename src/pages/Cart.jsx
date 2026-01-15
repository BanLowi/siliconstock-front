import { useCart } from "../contexts/CartContext"

export default function Cart() {

    const { cart, setCart } = useCart();

    function reduceProd(product) {
        setCart((prevProds) => {
            const checkProduct = prevProds.find((item) => item.id === product.id);

            if (!checkProduct) {
                return prevProds;
            }

            if (checkProduct.quantity === 1) {
                return prevProds.filter((item) => item.id !== product.id);
            }

            return prevProds.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        });
    }

    function removeProd(product) {

        setCart((prevProds) => prevProds.filter((item) => item.id !== product.id))

    }

    function addProd(product) {

        setCart((prevProds) => {

            return prevProds.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)

        })
    }

    return (
        <>
            <h1 className="text-primary text-center">CART PAGE</h1>
            <div className="container cart-size rounded-3 p-5">

                {cart.length === 0 ? <h1 className="text-center text-color">CARRELLO VUOTO</h1> :
                    cart.map((product) => (
                        <div
                            key={product.id}
                            className="d-flex align-items-center justify-content-between py-3 border-bottom"
                        >
                            <div className="flex-grow-1 d-flex">


                                <div className="me-5 cart-image">
                                    <img src={`http://localhost:3000/${product.img}`} alt="" height={100} />
                                </div>

                                <div>

                                    <h4 className="fw-semibold text-white mb-3">
                                        {product.product_name}
                                    </h4>

                                    <button
                                        className="btn btn-outline-light"
                                        onClick={() => reduceProd(product)}
                                    >
                                        <i className="bi bi-cart-dash" />
                                    </button>

                                    <small className="text-white mx-2">
                                        Quantità: {product.quantity}
                                    </small>

                                    <button
                                        className="btn btn-outline-light"
                                        onClick={() => addProd(product)}
                                    >
                                        <i className="bi bi-cart-plus" />
                                    </button>
                                </div>

                            </div>





                            <button
                                className="btn btn-danger"
                                onClick={() => removeProd(product)}
                            >
                                <i className="bi bi-x-lg" />
                            </button>

                        </div>
                    ))
                }

                {cart.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-white">
                            Totale: {cart.reduce((tot, p) => tot + p.price * p.quantity, 0).toFixed(2)} €
                        </h4>
                    </div>
                )}

            </div>


        </>
    )
}