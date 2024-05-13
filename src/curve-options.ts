export type Point = [x: number, y: number];

interface CubicOptions {
  type: "cubic";
  controls: [Point, Point];
}

interface SmoothCubicOptions extends Omit<CubicOptions, "controls"> {
  smooth: true;
  control: Point;
}

interface QuadraticOptions {
  type: "quadratic";
  control: Point;
}

interface SmoothQuadraticOptions extends Omit<QuadraticOptions, "control"> {
  smooth: true;
}

export type CurveOptions =
  | CubicOptions
  | SmoothCubicOptions
  | QuadraticOptions
  | SmoothQuadraticOptions;
