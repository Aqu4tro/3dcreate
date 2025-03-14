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
    y: height / 2 + length * Math.tan(angle_Top.f) / 2,
    z: -length / 2 + sizePin,
    H: height - tickLot * 2 + length * Math.tan(angle_Top.f),
    W: width,
    L: size,
    N: "F",
  });
  walls.push({
    x: 0,
    y: height / 2 + tickLot / 2 + length * Math.tan(angle_Top.b) / 2,
    z: length / 2 - sizePin,
    H: height - tickLot + length * Math.tan(angle_Top.b),
    W: width,
    L: size,
    N: "B",
  });
  walls.push({
    x: width / 2 - sizePin,
    y: height / 2 + tickLot / 2 + width * Math.tan(angle_Top.l) / 2,
    z: 0,
    H: height - tickLot + width * Math.tan(angle_Top.l),
    W: size,
    L: length,
    N: "R",
  });
  walls.push({
    x: -width / 2 + sizePin,
    y: height / 2 + tickLot / 2 + width * Math.tan(angle_Top.r) / 2,
    z: 0,
    H: height - tickLot + width * Math.tan(angle_Top.r),
    W: size,
    L: length,
    N: "L",
  });

  return walls;
}
