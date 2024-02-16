import { ProsConsResponse } from "../../interfaces";
import { httpClient } from "../../presentation/plugins";

export const prosConsUseCase = async (prompt: string) => {
    try {
        const resp = await httpClient.POST("pros-cons-discusser", prompt);

        if (!resp.ok) throw new Error("No se realizo la comparacion");

        const data = await resp.json() as ProsConsResponse

        return {
            ok: true,
            ...data,
        };
    } catch (error) {
        return {
            ok: false,
            role: null,
            content: ''
        };
    }
};
