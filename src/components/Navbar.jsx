import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    <img src="/content.png" alt="Logo" className="navbar-logo-img" />
                </Link>
                <Link to="/" className="navbar-link">Home</Link>
            </div>

            <div className="navbar-center">
                <img src="/immagine_2026-01-08_164056395-removebg-preview.png" alt="Silicon Stock" className="navbar-logo-text-img" />
            </div>

            <div className="navbar-right">
                <Link to="/products" className="navbar-link">Products</Link>
                <Link to="/cart" className="navbar-cart-link">Cart</Link>
            </div>
        </nav>
    );
}
