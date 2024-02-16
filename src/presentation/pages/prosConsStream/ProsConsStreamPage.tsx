/* eslint-disable no-constant-condition */
import { useRef, useState } from "react";
import {
    GptMessage,
    MyMessage,
    TextMessageBox,
    TypingLoader,
} from "../../components";
import { prosConsStreamGeneratorUseCase } from "../../../core/use-cases";

interface Messsage {
    text: string;
    isGpt: boolean;
}

export const ProsConsStreamPage = () => {
    const abortController = useRef(new AbortController());
    const isRunning = useRef(false);

    const [loading, setLoading] = useState(false);
    const [messages, setMessage] = useState<Messsage[]>([]);

    const handlePost = async (message: string) => {
        if (isRunning.current) {
            abortController.current.abort();
            abortController.current = new AbortController();
        }

        setLoading(true);
        isRunning.current = true;
        setMessage((prev) => [
            ...prev,
            {
                text: message,
                isGpt: false,
            },
        ]);

        const stream = prosConsStreamGeneratorUseCase(
            message,
            abortController.current.signal
        );
        setLoading(false);

        setMessage((prev) => [...prev, { text: "", isGpt: true }]);

        for await (const text of stream) {
            setMessage((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = text;
                return newMessages;
            });
        }

        isRunning.current = false;
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="Que deseas comparar hoy?" />
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
