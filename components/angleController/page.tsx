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

export default function AngleController({ angle_Top, setAngle_Top }: AngleControllerProps)  {

  function angleInsertVerify(angle : angles){
    switch(angle){
      case("Front"):
      (angle_Top.r || angle_Top.l ||angle_Top.b ) ? false : true;       
      case("Left"):
      (angle_Top.r || angle_Top.f ||angle_Top.b ) ? false : true; 
      case("Right"):
      (angle_Top.f || angle_Top.l ||angle_Top.b ) ? false : true; 
      case("Back"):
      (angle_Top.r || angle_Top.l ||angle_Top.f ) ? false : true; 

    }

  }

return (
    <Box display={"flex"} gap={".5vw"} padding={".1vw"}>
      <SmallBlockController
        name="Front"
        value={angle_Top.f}
        setValue={(newF) =>
          setAngle_Top((prev) => ({ ...prev, f: newF as number }))
        }
        disable={angleInsertVerify("Front")}
      />
      <SmallBlockController
        name="Left"
        value={angle_Top.l}
        setValue={(newL) =>
          setAngle_Top((prev) => ({ ...prev, l: newL as number }))
        }
        disable={angleInsertVerify("Left")}
      />
      <SmallBlockController
        name="Right"
        value={angle_Top.r}
        setValue={(newR) =>
          setAngle_Top((prev) => ({ ...prev, r: newR as number }))
        }
        disable={angleInsertVerify("Right")}
      />
      <SmallBlockController
        name="Back"
        value={angle_Top.b}
        setValue={(newB) =>
          setAngle_Top((prev) => ({ ...prev, b: newB as number }))
        }
        disable={angleInsertVerify("Back")}
      />
    </Box>
  );
};


