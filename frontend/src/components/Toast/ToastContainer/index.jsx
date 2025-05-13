import { useEffect, useState, useCallback } from "react";

import ToastMessage from "../ToastMessage";

import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  const handleRemoveToast = useCallback((id) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== id)
    );
  }, []);

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
          onRemoveMessage={handleRemoveToast}
          id={message.id}
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </div>
  );
}
