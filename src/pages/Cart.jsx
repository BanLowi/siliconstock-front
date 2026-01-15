import { useCart } from "../contexts/CartContext"

export default function Cart() {

    const { cart, setCart } = useCart();

    function removeProd(product) {
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

    return (
        <>
            <h1 className="text-primary text-center">CART PAGE</h1>

            {
                cart.map((product) => {
                    return <div key={product.id}>
                        <h2>{product.product_name}</h2>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => removeProd(product)}>REMOVE</button>
                    </div>

                })
            }

        </>
    )
}