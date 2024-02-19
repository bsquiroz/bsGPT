import { useState } from "react";
import {
    GptMessage,
    MyMessage,
    TextMessageBox,
    TransitionPage,
    TypingLoader,
} from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";

interface Messsage {
    text: string;
    isGpt: boolean;
}

export const ProsConsPage = () => {
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

        const response = await prosConsUseCase(message);

        if (!response.ok) {
            setMessage((prev) => [
                ...prev,
                {
                    text: "No se pudo realizar la correcion",
                    isGpt: true,
                },
            ]);
        }

        setMessage((prev) => [
            ...prev,
            {
                text: response.content,
                isGpt: true,
            },
        ]);

        setLoading(false);
    };

    return (
        <TransitionPage>
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="Necesitas comparar algo? bueno escribe que es lo que necesitas, te dare los mejores puntos de vista" />
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
        </TransitionPage>
    );
};
