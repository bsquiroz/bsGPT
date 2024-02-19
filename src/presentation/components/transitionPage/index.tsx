import React from "react";

interface Props {
    children: React.ReactNode[] | React.ReactNode;
}

export const TransitionPage = ({ children }: Props) => {
    return <div className="chat-container fade-in">{children}</div>;
};
