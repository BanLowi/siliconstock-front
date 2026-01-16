import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";



const stripePromise = loadStripe("pk_test_51Spt043QAbcI7ymjPNwEEa1ZIxziokSjfG08wX818CVLIsPKBrzR8PQDhq8THoMlDPFl7GnEJMMRxWUbz2wDUDwP00F6BU5lPO");

export default function PaymentLayout() {

    const { cart } = useCart();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:3000/api/orders/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: cart }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';





    return (
        <>

            {clientSecret != "" && <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance, loader }}
            >
                <Outlet />
            </Elements>}

        </>
    );
}
