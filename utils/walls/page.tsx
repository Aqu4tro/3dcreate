export type wall = {
  x: number;
  y: number;
  z: number;
  H: number;
  W: number;
  L: number;
  N: string;
};
export default function walls({
  width,
  length,
  tickLot,
  size,
  height,
  angle_Top,
  topSize,
}: {
  width: number;
  length: number;
  tickLot: number;
  size: number;
  height: number;
  angle_Top: { f: number; l: number; r: number; b: number };
  topSize?: number;
}) {
  const walls = [];
  const sizePin = size / 2;
  const _topSize = topSize ? topSize : 0.1;
  walls.push({
    x: 0,
    y: height / 2 + (_topSize - tickLot) / 2 + angle_Top.f * length/2,
    z: -length / 2 + sizePin,
    H: height - (_topSize + tickLot) + (angle_Top.f * length),
    W: width,
    L: size,
    N: "F",
  });
  walls.push({
    x: 0,
    y: height / 2 - (_topSize - tickLot) / 2 + angle_Top.b * length/2,
    z: length / 2 - sizePin,
    H: height - (_topSize + tickLot) + (angle_Top.b * length),
    W: width,
    L: size,
    N: "B",
  });
  walls.push({
    x: width / 2 - sizePin,
    y: height / 2 - (_topSize - tickLot) / 2 + angle_Top.l * width/2,
    z: 0,
    H: height - (_topSize + tickLot) + (angle_Top.l * width),
    W: size,
    L: length,
    N: "R",
  });
  walls.push({
    x: -width / 2 + sizePin,
    y: height / 2 - (_topSize - tickLot) / 2 + angle_Top.r * width/2,
    z: 0,
    H: height - (_topSize + tickLot) + (angle_Top.r * width),
    W: size,
    L: length,
    N: "L",
  });

  return walls;
}
