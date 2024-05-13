import type { ArcOptions } from "./arc-options";
import type { CurveOptions } from "./curve-options";

export class Path {
  private currentPath: (string | number)[];
  private lastCommand: string;
  private isRelative: boolean;

  constructor(path?: string) {
    this.currentPath = path ? [path] : [];
    this.lastCommand = "";
    this.isRelative = false;

    if (path) {
      const lastCommandMatch = path.match(/[a-zA-Z]/g);

      if (lastCommandMatch) {
        this.lastCommand = lastCommandMatch[lastCommandMatch.length - 1];
      }
    }
  }

  toString() {
    return this.end();
  }

  /**
   * Moves the current position to x, y without drawing anything.
   *
   * @param x - The x-coordinate of the new position
   * @param y - The y-coordinate of the new position
   */
  moveTo(x: number, y: number) {
    this.appendData("M", x, y);
    return this;
  }

  /**
   * Closes the current path
   */
  close() {
    this.appendData("Z");
    return this;
  }
  /**
   * Returns the final path string.
   *
   * @returns The final path string
   */
  end() {
    return this.currentPath.join(" ").trim();
  }

  /**
   * Moves the current position to x, y while drawing a line from previous position.
   *
   * @param x - The x-coordinate of the new position
   * @param y - The y-coordinate of the new position
   */
  lineTo(x: number, y: number) {
    this.appendData("L", x, y);
    return this;
  }

  /**
   * Moves from the previous position along the x axis, drawing a line.
   *
   * @param x - The x-coordinate of the new position
   */
  horizontalLineTo(x: number) {
    this.appendData("H", x);
    return this;
  }

  /**
   * Moves from the previous position along the y axis, drawing a line.
   *
   * @param y - The y-coordinate of the new position
   */
  verticalLineTo(y: number) {
    this.appendData("V", y);
    return this;
  }

  /**
   * Draws a curve to x, y. The type of curve is determined by the provided curve options.
   *
   * If the curve is cubic, a cubic Bézier curve will be drawn from the current point to (x, y) using a control point at the beginning of the curve and a control point at the end of the curve.
   * If the curve is cubic and smooth is true, a cubic Bézier curve will be drawn from the current point to (x, y). The first control point is assumed to be the reflection of the second control point on the previous command relative to the current point.
   * If the curve is quadratic, a quadratic Bézier curve will be drawn from the current point to (x, y) using the control point specified in the control option.
   * If the curve is quadratic and smooth is true, a quadratic Bézier curve will be drawn from the current point to (x, y). The control point is assumed to be the reflection of the control point on the previous command relative to the current point.
   *
   * @param x - The x-coordinate of the new position
   * @param y - The y-coordinate of the new position
   * @param options - The curve options
   */
  curveTo(x: number, y: number, options: CurveOptions) {
    let x1, y1, x2, y2;
    let command;

    switch (options.type) {
      case "cubic": {
        if ("controls" in options) {
          command = "C";
          [x1, y1, x2, y2] = options.controls.flat();
        } else {
          command = "S";
          [x2, y2] = options.control;
        }
        break;
      }
      case "quadratic": {
        if ("control" in options) {
          command = "Q";
          [x1, y1] = options.control;
        } else {
          command = "T";
        }
        break;
      }
    }

    this.appendData(
      command,
      ...([x1, y1, x2, y2, x, y].filter(Boolean) as number[]),
    );
    return this;
  }

  /**
   * Draws an arc to x, y. Additional arguments are defined in the arc options.
   *
   * @param x - The x-coordinate of the new position
   * @param y - The y-coordinate of the new position
   * @param options - The arc options
   */
  arc(x: number, y: number, options: ArcOptions) {
    const { angle, rx, ry, large, sweep } = options;

    const largeFlag = large ? 1 : 0;
    const sweepFlag = sweep ? 1 : 0;

    this.appendData("A", rx, ry, angle, largeFlag, sweepFlag, x, y);

    return this;
  }

  /**
   * Call before any method to have the following method accept relative coordinates instead of absolute coordinates.
   */
  relative() {
    this.isRelative = true;
    return this;
  }

  /**
   * Appends data to the current curve.
   *
   * @param command - The path command to append
   * @param args - Any additional arguments
   */
  private appendData(command: string, ...args: number[]) {
    let cmd = command;

    if (this.isRelative) {
      cmd = command.toLowerCase();
      this.isRelative = false;
    }

    let appendCommand = cmd !== this.lastCommand;

    this.lastCommand = cmd;

    if (appendCommand) {
      this.currentPath.push(cmd);
    }

    this.currentPath = [...this.currentPath, ...args];
  }
}
