import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {

    const [order, setOrder] = useState(() => {

        const savedOrder = localStorage.getItem("order")

        return savedOrder ? JSON.parse(savedOrder) : {}
    })

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart")

        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)) }, [cart])
    useEffect(() => { localStorage.setItem("order", JSON.stringify(order)) }, [order])

    return (

        <CartContext.Provider
            value={{
                cart,
                setCart, order, setOrder
            }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {

    const context = useContext(CartContext);

    return context
}

export { CartProvider, useCart };