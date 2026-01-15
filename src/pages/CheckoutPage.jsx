import CheckoutForm from "../components/CheckoutForm";



export default function CheckoutPage() {



    if (!clientSecret) return null; // oppure loader

    return (
        <>
            <CheckoutForm />
        </>
    );
}