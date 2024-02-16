export const httpClient = {
    POST: async (url: string, prompt: string) => {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        return response;
    },
    "POST-STREAM": async (url: string, prompt: string) => {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        return response;
    },
};
