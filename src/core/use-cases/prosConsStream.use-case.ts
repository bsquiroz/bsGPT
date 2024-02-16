import { httpClient } from "../../presentation/plugins";

export const prosConsStreamUseCase = async (prompt: string) => {
    try {
        const resp = await httpClient["POST-STREAM"](
            "pros-cons-discusser-stream",
            prompt
        );

        if (!resp.ok) throw new Error("No se realizo la comparacion");

        const reader = resp.body?.getReader();
        if (!reader) return null;

        return reader;
    } catch (error) {
        return null;
    }
};
