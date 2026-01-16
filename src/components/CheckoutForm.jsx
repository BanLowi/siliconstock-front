import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //toggle form show
  const [showForm, setShowForm] = useState('user-data')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/complete",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    setShowForm('user-data')
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  //User data form logic

  const { cart, order, setOrder } = useCart();

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [shipping_address, setShippingAddress] = useState('')
  // const [discountCode, setDiscountCode] = useState('')

  const [formError, setFormError] = useState('')



  console.log(cart);

  function saveOrder(order) {
    axios.post('http://localhost:3000/api/orders/newOrder', { order })
      .then(res => {
        console.log(res.data)
        console.log(res.data.status);


        if (res.data.status === 400) {
          setShowForm('user-data')
          setFormError(res.data.error)
        } else if (res.data.request === 'received') {
          setShowForm('payment')
          setFormError('')
          console.log('success');
          setFirstName(''),
            setLastName(''),
            setPhone(''),
            setEmail(''),
            setShippingAddress('')

        }
      })
      .catch(err => {

        console.log(err)
      })


  }

  async function handleUserDataSubmit(e) {
    e.preventDefault();

    let total = 0

    cart.forEach(item => {

      total += Number(item.price)
      console.log(item.price);

    })

    const newOrder = {
      id: Date.now(),
      first_name,
      last_name,
      phone,
      email,
      shipping_address,
      total_amount: total,
      products: cart,
      discount_code_id: 2
    }


    await setOrder(newOrder)
    // console.log(total);
    // console.log(order);

    saveOrder(newOrder)



  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        {showForm === 'user-data' &&
          <div>
            <form className="user-form " onSubmit={handleUserDataSubmit}>
              {formError !== '' && <p >{formError}</p>}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input type="text" className="form-control" id="name"
                  value={first_name} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">Cognome</label>
                <input type="text" className="form-control" id="surname"
                  value={last_name} onChange={e => setLastName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="phone">Numero di telefono</label>
                <input type="text" className="form-control" id="phone"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="shipping-address" className="form-label">Indirizzo di spedizione</label>
                <input type="text" className="form-control" id="shipping-address"
                  value={shipping_address} onChange={e => setShippingAddress(e.target.value)} />
              </div>

              {/* <div className="mb-3">
          <label className="form-label" htmlFor="discount-code">Codice sconto</label>
          <input type="text" className="form-control" id="discount-code" />
        </div> */}
              <button type="submit" className="btn btn-primary">Conferma</button>
            </form>
          </div>}
        {showForm === 'payment' &&
          <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>}
      </div>
    </>
  );
}