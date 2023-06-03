import { IconButton } from "../../ui/IconButton";
import { Tooltip } from "@material-ui/core";
import { IoMdAddCircleOutline } from "react-icons/all";
import React, { ReactElement, useCallback } from "react";
import { useUniverse } from "logic";

export function AddBodyButton(): ReactElement {
  const universe = useUniverse();

  const addBody = useCallback((): void => {
    universe.addBody();
    universe.update();
  }, []);

  return (
    <IconButton onClick={addBody} style={{}}>
      <Tooltip title={"Add new body"}>
        <div>
          <IoMdAddCircleOutline />
        </div>
      </Tooltip>
    </IconButton>
  );
}
