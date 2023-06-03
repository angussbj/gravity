import { IconButton } from "../../ui/IconButton";
import { Tooltip } from "@material-ui/core";
import { IoMdRemoveCircleOutline } from "react-icons/all";
import React, { CSSProperties, ReactElement, useCallback } from "react";
import { useUniverse } from "logic";

interface Props {
  bodyId: string;
  style?: CSSProperties;
}

export function RemoveBodyButton({ bodyId, style }: Props): ReactElement {
  const universe = useUniverse();

  const removeBody = useCallback((): void => {
    universe.removeBody(bodyId);
    universe.update();
  }, [universe]);

  return (
    <IconButton onClick={removeBody} style={style}>
      <Tooltip title={"Remove body"}>
        <div>
          <IoMdRemoveCircleOutline size={16} />
        </div>
      </Tooltip>
    </IconButton>
  );
}
