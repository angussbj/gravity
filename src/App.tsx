import React, { useCallback, useState } from "react";
import { Content, Controls, Environment } from "components";
import { Universe, UniverseContextProvider } from "logic";

function App(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_renderHelper, setRenderHelper] = useState(false);
  const render = useCallback(
    (): void => setRenderHelper((x): boolean => !x),
    []
  );
  const [universe] = useState(() => new Universe(render));

  return (
    <>
      <UniverseContextProvider universe={universe}>
        <Environment>
          <Content />
        </Environment>
        <Controls />
      </UniverseContextProvider>
    </>
  );
}

export default App;
