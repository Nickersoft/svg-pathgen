import { describe, it, expect } from "bun:test";

import { Path } from "../src/path";

describe("svg-path-generator tests", () => {
  it("should draw a triangle", () => {
    var path = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .lineTo(10, 25)
      .end();

    expect(path).toBe("M 10 25 L 10 75 60 75 10 25");
  });

  it("should draw a triangle with a relative lineTo", () => {
    var path = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .relative()
      .lineTo(-50, -50)
      .end();

    expect(path).toBe("M 10 25 L 10 75 60 75 l -50 -50");
  });

  it("should draw a line with multiple input pairs", () => {
    var path = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .lineTo(10, 25)
      .end();

    expect(path).toBe("M 10 25 L 10 75 60 75 10 25");
  });

  it("should convert Path object to string with toString", () => {
    var path = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .lineTo(10, 25);

    expect(path.toString()).toBe("M 10 25 L 10 75 60 75 10 25");
  });

  it("should work with an initial path", () => {
    var path = new Path("M 10 25")
      .lineTo(10, 75)
      .lineTo(60, 75)
      .lineTo(10, 25)
      .end();

    expect(path).toBe("M 10 25 L 10 75 60 75 10 25");
  });

  it("should work with a closed path", () => {
    var path1 = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .relative()
      .lineTo(-50, -50)
      .close()
      .end();

    var path2 = new Path()
      .moveTo(10, 25)
      .lineTo(10, 75)
      .lineTo(60, 75)
      .relative()
      .lineTo(-50, -50)
      .close()
      .end();

    expect(path1).toBe(path2);

    expect(path1).toBe("M 10 25 L 10 75 60 75 l -50 -50 Z");
  });
});
