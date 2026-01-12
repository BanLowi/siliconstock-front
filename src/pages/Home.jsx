import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../components/SingleCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const categories = ["scheda-video", "processore", "ram", "ssd", "case", "scheda-madre"];

        Promise.all(
            categories.map((c) =>
                axios.get(`http://localhost:3000/api/products/category/${c}`)
            )
        )
            .then((res) => {
                const featured = res.map((r) => r.data[0]).filter(Boolean);
                setProducts(featured);
            })
            .catch(() => setError("error load products"));
    }, []);

    return (
        <main className="home">
            <section className="hero-image" aria-label="SiliconStock hero" />

            <section className="products">
                <h2>Prodotti in evidenza</h2>
                <div className="card-grid">
                    {products.map((p) => (
                        <SingleCard key={p.id} todo={p} />
                    ))}
                </div>
            </section>
        </main>
    );
}
