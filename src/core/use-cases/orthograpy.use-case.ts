import { OrthographyResponse } from "../../interfaces";
import { httpClient } from "../../presentation/plugins";

export const orthographyUseCase = async (prompt: string) => {
    try {
        const resp = await httpClient.POST("ortography-check", prompt);

        if (!resp.ok) throw new Error("No se realizo la correcion");

        const data = (await resp.json()) as OrthographyResponse;

        return {
            ok: true,
            ...data,
        };
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo realizar la conexion",
        };
    }
};
