import { useState } from "react";

export default function Chatbot({ products }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])
  const chat = []

  async function getResponse() {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
      products,
    })
    const data = await response.json();
    console.log(data.reply);
    chat.push({
      author: 'ai',
      time: new Date().toLocaleTimeString(),
      text: data.reply
    })
    setMessages(chat)
    console.log(messages)
  }

  function handleSubmit(e) {
    e.preventDefault();
    getResponse();
    chat.push({
      author: 'user',
      time: new Date().toLocaleTimeString(),
      text: message
    })
  }

  function handleChatOpen() {
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow) {
      chatWindow.classList.toggle("d-none");
    }
  }

  return (
    <>
      <div className="fixed-bottom chat-container z-3">
        <div
          className="card chat-card-spacing z-3 d-none mt-4 p-0"
          id="chat-window"
        >
          <div className="card-header chat-name">
            Parla con Fabrizio, <br /> il tuo agente segreto
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div id="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble ${
                    msg.author === "user" ? "user" : "ai"
                  }`}
                >
                  <div className="chat-meta">
                    <span
                      className={`chat-author ${
                        msg.author === "user" ? "user" : "ai"
                      }`}
                    >
                      {msg.author === "user" ? "Tu" : "FABRIZIO"}
                    </span>
                    <span className="chat-timestamp">{msg.time}</span>
                  </div>
                  <div className="chat-texts">{msg.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <form
            type="submit"
            className="chat-form d-flex"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control rounded-pill chat-select"
              placeholder="Chat"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
          <button
            className="btn-cloce-chat rounded-pill"
            onClick={() => handleChatOpen()}
          >
            Close Chat
          </button>
        </div>

        <div className="chat-button-spacing z-3">
          <button
            type="button"
            style={{ width: "80px", height: "80px" }}
            className="btn-open-chat rounded-circle"
            onClick={() => handleChatOpen()}
          >
            <i className="bi bi-robot"></i>
          </button>
        </div>
      </div>
    </>
  );
}
