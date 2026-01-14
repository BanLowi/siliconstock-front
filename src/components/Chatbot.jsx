import { useState } from "react";

export default function Chatbot({ products }) {
  const [message, setMessage] = useState("");

  async function getResponse() {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
      products,
    });
    const data = await response.json();
    console.log(data.reply);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getResponse();
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
          />
          <button className="btn btn-primary" type="submit">
            Cliccami
          </button>
        </form>
      </div>
    </>
  );
}
