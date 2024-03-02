import React from "react";

import "./ViewContainer.css";

function ViewContainer({ children }: React.PropsWithChildren): React.ReactNode {
    return <div className="viewContainer">{children}</div>;
}

export { ViewContainer };
