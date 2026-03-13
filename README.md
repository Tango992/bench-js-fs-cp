# bench-js-fs-cp

Simple benchmark for `fs.cpSync` and `fs.promises.cp` on a deep tree with symlinks.

## Install dependencies

```bash
npm install
```

## Run benchmark

Pass `sync` or `async` as the first argument to select the variant. Defaults to `sync` when no argument (or an invalid one) is provided.

### Node.js

```bash
node --expose-gc index.js         # sync (default)
node --expose-gc index.js sync
node --expose-gc index.js async
```

### Bun

```bash
bun run index.js         # sync (default)
bun run index.js sync
bun run index.js async
```

### Deno

```bash
deno run -A --v8-flags="--expose-gc" index.js         # sync (default)
deno run -A --v8-flags="--expose-gc" index.js sync
deno run -A --v8-flags="--expose-gc" index.js async
```
