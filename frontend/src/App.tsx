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

    useEffect(() => {
        const ws = new W3CWebSocket("ws://localhost:3000");

        ws.onopen = (): void => {
            console.log("WebSocket connected");
            ws.send("Hello server!");
        };

        ws.onmessage = (event: IMessageEvent): void => {
            console.log("Received message:", event.data);
        };

        ws.onclose = (): void => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.close();
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

    return (
        <ViewContainer>
            <h1>Websockets Test</h1>
            <button onClick={handleMakeRequest}>Make async call</button>
            {responseIsLoading && <div>Loading...</div>}
            {response !== null && <pre>{JSON.stringify(response)}</pre>}
        </ViewContainer>
    );
}

export default App;
