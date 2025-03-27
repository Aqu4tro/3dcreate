import React from "react";
import { Box } from "@mui/material";
import { SmallBlockController } from "@/components/blockController/page";

export type AngleTop = {
  f: number;
  l: number;
  r: number;
  b: number;
};

type angles = "Front" | "Right" | "Left" | "Back";

type AngleControllerProps = {
  angle_Top: AngleTop;
  setAngle_Top: React.Dispatch<React.SetStateAction<AngleTop>>;
};

export default function AngleController({ angle_Top, setAngle_Top }: AngleControllerProps) {

  function angleInsertVerify(angle: angles): boolean {
    const { f, l, r, b } = angle_Top;

    if (angle === "Front") {
      return (r !== 0 || l !== 0 || b !== 0);
    }
    else if (angle === "Left") {
      return (r !== 0 || f !== 0 || b !== 0);
    }
    else if (angle === "Right") {
      return (f !== 0 || l !== 0 || b !== 0);
    }
    else if (angle === "Back") {
      return (r !== 0 || l !== 0 || f !== 0);
    }
    else {
      return false;
    }

  }





  return (
    <Box display={"flex"} gap={".5vw"} padding={".1vw"}>
      <SmallBlockController
      name="Front"
      value={angle_Top.f}
      setValue={(newF) => {
        if (typeof newF === "number" && newF >= 0 && newF <= 1) {
        setAngle_Top((prev) => ({ ...prev, f: newF as number }));
        }
      }}
      disable={angleInsertVerify("Front")}
      maxValue={1}
      minValue={0}
      />
      <SmallBlockController
      name="Left"
      value={angle_Top.l}
      setValue={(newL) => {
        if (typeof newL === "number" && newL >= 0 && newL <= 1) {
        setAngle_Top((prev) => ({ ...prev, l: newL as number }));
        }
      }}
      disable={angleInsertVerify("Left")}
      maxValue={1}
      minValue={0}
      />
      <SmallBlockController
      name="Right"
      value={angle_Top.r}
      setValue={(newR) => {
        if (typeof newR === "number" && newR >= 0 && newR <= 1) {
        setAngle_Top((prev) => ({ ...prev, r: newR as number }));
        }
      }}
      disable={angleInsertVerify("Right")}
      maxValue={1}
      minValue={0}
      />
      <SmallBlockController
      name="Back"
      value={angle_Top.b}
      setValue={(newB) => {
        if ( typeof newB === "number" && newB >= 0 && newB <= 1) {
        setAngle_Top((prev) => ({ ...prev, b: newB as number }));
        }
      }}
      disable={angleInsertVerify("Back")}
      maxValue={1}
      minValue={0}
      />
    </Box>
  );
};


