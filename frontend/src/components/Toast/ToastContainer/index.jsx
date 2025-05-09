import { useEffect, useState } from "react";

import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    document.addEventListener("addtoast", handleAddToast);

    return () => document.removeEventListener("addtoast", handleAddToast);
  }, []);

  return (
    <div className="fixed bottom-14 left-1/2 translate-x-[-50%] z-50">
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </div>
  );
}
