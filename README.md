<div align="center">
<img src="logo.svg" width="400px" />
</div>

---

PathGen is a tiny, zero-dependency path generator based on the [now outdated path generator library](https://github.com/mathisonian/svg-path-generator) by [Matthew Conlen](https://github.com/mathisonian). It aims to provide a declarative way to write SVG paths, as the SVG [`d` commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) can be pretty hard to read at a glance.

This library has full TypeScript support and should be fairly intuitive to use.

You can use it as follows:

```typescript
const path = new Path("M 20 30")
  .moveTo(10, 25)
  .lineTo(10, 75)
  .lineTo(60, 75)
  .lineTo(10, 25)
  .close()
  .end();

console.log(path); // M 20 30 10 25 L 10 75 60 75 10 25 Z
```

You can install it via your favorite NPM package manager:

```
$ npm install svg-pathgen
$ bun add svg-pathgen
$ pnpm add svg-pathgen
$ yarn add svg-pathgen
```