import React, { useState } from "react";
import { render } from "react-dom";

function App() {
    const [state, setState] = useState("CLICK ME");

    return <button onClick={() => setState("CLICK On")}>{state}</button>;
}

render(<App />, document.getElementById("root"));