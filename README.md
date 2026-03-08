# bench-js-fs-cp

Simple benchmark for `fs.promises.cp` on a deep tree with symlinks.

## Install dependencies

Install dependencies

```bash
npm install
```

## Run benchmark

### Node.js

```bash
node --expose-gc index.js
```

### Bun

```bash
bun run index.js
```

### Deno

```bash
deno run -A --v8-flags="--expose-gc" index.js
```
