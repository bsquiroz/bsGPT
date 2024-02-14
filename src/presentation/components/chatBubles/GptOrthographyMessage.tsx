interface Props {
    userScore: number;
    errors: string[];
    message: string;
}

export const GptOrthographyMessage = ({
    errors,
    message,
    userScore,
}: Props) => {
    const Errors = errors.length ? (
        <>
            <h2>Errores encontrados</h2>

            <ul>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        </>
    ) : (
        <></>
    );

    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    <span></span>
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                    <h3 className="text-2xl font-bold">Puntaje: {userScore}</h3>
                    <p>{message}</p>
                    {Errors}
                </div>
            </div>
        </div>
    );
};
