import React, { useState } from "react";

import "./App.css";
import { ViewContainer } from "@/components/ViewContainer";
import { fetchData } from "@/api";

type ExpectedResponse = {
    message: string;
};

function App(): React.ReactNode {
    const [response, setResponse] = useState<null | ExpectedResponse>(null);
    const [responseIsLoading, setResponseIsLoading] = useState(false);

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
