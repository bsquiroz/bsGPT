import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../components";

interface Messsage {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState<Messsage[]>([]);

  const handlePost = async (message: string) => {
    setLoading(true);
    setMessage((prev) => [
      ...prev,
      {
        text: message,
        isGpt: false,
      },
    ]);

    // todo => useCase
    setLoading(false);
    // todo => añadir el mensaje al state
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, escribe tu texto en español y te ayudo con las correciones" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {loading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        disableCorrections
        placeholder="Que necesitas?"
      />
    </div>
  );
};
