import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { UpdateState } from "./hooks/useState/UpdateState";

// import { MultStates } from "./hooks/useState/MultStates";

// import { StateObject } from "./hooks/useState/StateObject";

// import { CounterState } from "./hooks/useState/CounterState";

// import { BasicEffect } from "./hooks/useEffect/BasicEffect";

// import { CleanupEffect } from "./hooks/useEffect/CleanupEffect";

// import { MultEffects } from "./hooks/useEffect/MultEffects";

// import { DependencyEffect } from "./hooks/useEffect/DependencyEffect";

// import { SkipEffect } from "./hooks/useEffect/SkipEffect";

// import { ChangeTheme } from "./hooks/useContext/ChangeTheme";

// import { LayoutEffect } from "./hooks/useLayoutEffect/LayoutEffect";

// import { BasicReducer } from "./hooks/useReducer/BasicReducer";

// import { LazyState } from "./hooks/useReducer/LazyState";

// import { NewState } from "./hooks/useReducer/NewState";

// import { CallbackTemplate } from "./hooks/useCallback/CallbackTemplate";

// import { BasicCallback } from "./hooks/useCallback/BasicCallback";

// import { InlineCallback } from "./hooks/useCallback/InlineCallback";

// import { MemoTemplate } from "./hooks/useMemo/MemoTemplate";

// import { BasicMemo } from "./hooks/useMemo/BasicMemo";

// import { DomAccess } from "./hooks/useRef/DomAccess";

// import { StringVal } from "./hooks/useRef/StringVal";

// import { IntervalRef } from "./hooks/useRef/IntervalRef";

function App() {
  return (
    <>
      <UpdateState />

      {/* <MultStates /> */}

      {/* <StateObject /> */}

      {/* <CounterState /> */}

      {/* <BasicEffect /> */}

      {/* <CleanupEffect /> */}

      {/* <MultEffects /> */}

      {/* <DependencyEffect /> */}

      {/* <SkipEffect /> */}

      {/* <ChangeTheme /> */}

      {/* <LayoutEffect /> */}

      {/* <BasicReducer /> */}

      {/* <LazyState /> */}

      {/* <NewState /> */}

      {/* <CallbackTemplate /> */}

      {/* <BasicCallback /> */}

      {/* <InlineCallback /> */}

      {/* <MemoTemplate /> */}

      {/* <BasicMemo /> */}

      {/* <DomAccess /> */}

      {/* <StringVal /> */}

      {/* <IntervalRef /> */}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
