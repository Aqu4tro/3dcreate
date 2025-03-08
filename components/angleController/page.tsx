import React from "react";
import { Box } from "@mui/material";
import { SmallBlockController } from "@/components/blockController/page"; 

export type AngleTop = {
  f: number; 
  l: number;
  r: number; 
  b: number; 
};


type AngleControllerProps = {
  angle_Top: AngleTop; 
  setAngle_Top: React.Dispatch<React.SetStateAction<AngleTop>>; 
};

export default function AngleController({ angle_Top, setAngle_Top }: AngleControllerProps)  {
  return (
    <Box display={"flex"} gap={".5vw"} padding={".1vw"}>
      <SmallBlockController
        name="Front"
        value={angle_Top.f}
        setValue={(newF) =>
          setAngle_Top((prev) => ({ ...prev, f: newF as number }))
        }
      />
      <SmallBlockController
        name="Left"
        value={angle_Top.l}
        setValue={(newL) =>
          setAngle_Top((prev) => ({ ...prev, l: newL as number }))
        }
      />
      <SmallBlockController
        name="Right"
        value={angle_Top.r}
        setValue={(newR) =>
          setAngle_Top((prev) => ({ ...prev, r: newR as number }))
        }
      />
      <SmallBlockController
        name="Back"
        value={angle_Top.b}
        setValue={(newB) =>
          setAngle_Top((prev) => ({ ...prev, b: newB as number }))
        }
      />
    </Box>
  );
};


