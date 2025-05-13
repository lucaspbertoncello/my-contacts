import { useEffect, useState } from "react";

import ToastMessage from "../ToastMessage";

import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => toastEventManager.removeListener("addtoast", handleAddToast);
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
