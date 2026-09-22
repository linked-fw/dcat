# @\_linked/dcat

## 1.0.5

### Patch Changes

- [#14](https://github.com/linked-fw/dcat/pull/14) [`d419f0b`](https://github.com/linked-fw/dcat/commit/d419f0bd9fe1f3574ba19d495891861a4a2994fe) Thanks [@flyon](https://github.com/flyon)! - Compile the whole `src` folder, and let a bare import resolve under Node10.

  The build only emitted what an entry transitively reached, so any module
  nothing imported was never built — and never type-checked, so it rotted
  quietly. `include` now covers `src/**/*` with tests excluded explicitly.

  `typesVersions` maps every specifier through `lib/esm/*`, so a `types` value
  that already carried that prefix had it applied twice and no consumer on
  classic Node10 resolution could `import` the package by its bare name.

## 1.0.4

### Patch Changes

- [#11](https://github.com/linked-fw/dcat/pull/11) [`fe15831`](https://github.com/linked-fw/dcat/commit/fe158314cb299a1bb07e1dd59d2fab16336481f8) Thanks [@flyon](https://github.com/flyon)! - Declare npm as the package manager for this repo, convert the build scripts off `yarn`, and mark `package-lock.json` as a generated file.

## 1.0.2

### Patch Changes

- [#4](https://github.com/linked-cm/dcat/pull/4) [`4b7c06b`](https://github.com/linked-cm/dcat/commit/4b7c06bdfe1329607d477a5f58771bbf49844cd2) Thanks [@flyon](https://github.com/flyon)! - loadData: ESM-only JSON import — drop the dead CJS branch, add the `{ with: { type: 'json' } }` import attribute.

## 1.0.1

### Patch Changes

- [`48eb3b2`](https://github.com/linked-cm/dcat/commit/48eb3b2a8d02c28fdc46f6fa7d98c6c529cdc1ae) - Initial release under the new publishing setup.
