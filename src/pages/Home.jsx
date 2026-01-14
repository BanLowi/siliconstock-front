import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../components/SingleCard";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { useProducts } from "../contexts/ProductsContext";
import Chatbot from "../components/Chatbot";



export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { loading, setLoading } = useProducts()

    useEffect(() => {
        const categories = ["scheda-video", "processore", "ram", "ssd", "case", "scheda-madre"];
        setLoading(true)

        Promise.all(
            categories.map((c) =>
                axios.get(`http://localhost:3000/api/products/category/${c}`)
            )
        )
            .then((res) => {
                const featured = res.map((r) => r.data[0]).filter(Boolean);
                setProducts(featured);
            })
            .catch(() => setError("error load products"))
            .finally(() => setTimeout(setLoading(false), 1000))
    }, []);

    return (
        <>
            {loading
                ?
                <div className="loader_div">
                    <Quantum
                        size="150"
                        speed="1.75"
                        color="rgba(28, 38, 48, 1)"
                    />
                </div>
                : <div className="container mt-5">
                    <section className="hero-image" aria-label="SiliconStock hero" />

                    <section className="products">
                        <h2>Prodotti in evidenza</h2>
                        <div className="card-grid">
                            {products.map((p) => (
                                <SingleCard key={p.id} todo={p} />
                            ))}
                        </div>
                    </section>
                    <Chatbot 
                    products={products}
                    />
                </div>}
        </>
    );
}
