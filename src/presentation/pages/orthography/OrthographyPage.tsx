import { useState } from "react";
import {
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TransitionPage,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";
import { GptOrthographyMessage } from "../../components";

interface Messsage {
    text: string;
    isGpt: boolean;
    info?: {
        userScore: number;
        errors: string[];
        message: string;
    };
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

        const response = await orthographyUseCase(message);

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
                text: response.message,
                isGpt: true,
                info: {
                    errors: response.errors,
                    message: response.message,
                    userScore: response.userScore,
                },
            },
        ]);

        setLoading(false);
    };

    return (
        <TransitionPage>
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="Hola, escribe tu texto en español y te ayudo con las correciones" />
                    {messages.map((message, index) =>
                        message.isGpt ? (
                            <GptOrthographyMessage
                                key={index}
                                errors={message.info!.errors}
                                message={message.info!.message}
                                userScore={message.info!.userScore}
                            />
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
