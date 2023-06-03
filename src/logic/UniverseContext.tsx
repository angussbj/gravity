import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { Universe } from "./Universe";

const UniverseContext = createContext<Universe>(new Universe(() => {}));

export function UniverseContextProvider({
  children,
  universe,
}: {
  children: ReactNode;
  universe: Universe;
}): ReactElement {
  return (
    <UniverseContext.Provider value={universe}>
      {children}
    </UniverseContext.Provider>
  );
}

export function useUniverse(): Universe {
  return useContext(UniverseContext);
}
