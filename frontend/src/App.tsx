import React, { useState, useEffect } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import "./App.css";
import { ViewContainer } from "@/components/ViewContainer";
import { fetchData } from "@/api";

type ExpectedResponse = {
    message: string;
};

function App(): React.ReactNode {
    const [response, setResponse] = useState<null | ExpectedResponse>(null);
    const [responseIsLoading, setResponseIsLoading] = useState(false);

    const [ws, setWs] = useState<W3CWebSocket | null>(null);

    useEffect(() => {
        const newWs = new W3CWebSocket("ws://localhost:3000");

        newWs.onopen = (): void => {
            console.log("WebSocket connected");
            newWs.send("Hello server!");
        };

        newWs.onmessage = (event: IMessageEvent): void => {
            console.log("Received message:", event.data);
        };

        newWs.onclose = (): void => {
            console.log("WebSocket disconnected");
        };

        setWs(newWs);

        return () => {
            newWs.close();
        };
    }, []);

    const handleMakeRequest = async (): Promise<void> => {
        setResponseIsLoading(true);
        const result = await fetchData<ExpectedResponse>("http://localhost:3000/");
        setResponseIsLoading(false);
        if (result.error) {
            return;
        }
        setResponse(result.data);
    };

    const handleSendMessage = (): void => {
        if (ws !== null) {
            ws.send("This is a static message!");
        }
    };

    return (
        <ViewContainer>
            <h1>Simple HTTP</h1>
            <button onClick={handleMakeRequest}>Make async call</button>
            {responseIsLoading && <div>Loading...</div>}
            {response !== null && <pre>{JSON.stringify(response)}</pre>}
            <div style={{ height: "40px" }}></div>
            <h1>Websockets</h1>
            <button onClick={handleSendMessage}>Send static message</button>
        </ViewContainer>
    );
}

export default App;
