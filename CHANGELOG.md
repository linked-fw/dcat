# @\_linked/dcat

## 1.2.0

### Minor Changes

- [#50](https://github.com/linked-fw/dcat/pull/50) [`e96407f`](https://github.com/linked-fw/dcat/commit/e96407f142e4c3f0dcbc0440b1acb6c4c4b7c3d6) Thanks [@flyon](https://github.com/flyon)! - The package ships the W3C DCAT 3 vocabulary as its ontology data: `src/data/dcat.ttl` is `https://www.w3.org/ns/dcat.ttl` unedited (CC-BY-4.0, attribution kept in the file), copied into `lib/esm/data/` by the build. `loadData()` now resolves to the Turtle text (`string[]`, through `@_linked/core`'s `loadOntologyFiles`) instead of an empty JSON-LD document, and the new `dataFiles` export names the files. Its `rdfs:subClassOf` axioms (`Catalog`, `DatasetSeries` ⊑ `Dataset`; `Dataset`, `DataService` ⊑ `Resource`; `DataService` ⊑ `dcmitype:Service`; `dcat:Role` ⊑ `skos:Concept`) reach every app dataset through core's ontology sync.
  
  The package declares that it mirrors `http://www.w3.org/ns/dcat#`, so the shape check reports any DCAT term a shape or export uses that the W3C data does not define. `src/data/dcat.json` is removed.

## 1.1.5

### Patch Changes

- [#46](https://github.com/linked-fw/dcat/pull/46) [`d9f71f0`](https://github.com/linked-fw/dcat/commit/d9f71f0ee8cf2f4b2a1b45e2e1ca8085752b9bf7) Thanks [@flyon](https://github.com/flyon)! - Build with `linked build` instead of a hand-rolled `tsc` + `copyfiles` script, and drop the `rimraf`/`copyfiles` devDependencies. The published `lib/` output is unchanged.

## 1.1.4

### Patch Changes

- [#43](https://github.com/linked-fw/dcat/pull/43) [`c1bd79e`](https://github.com/linked-fw/dcat/commit/c1bd79e6dc472d8e38ec02d8ee0353920597bc43) Thanks [@flyon](https://github.com/flyon)! - Publish only the files consumers need; the tarball no longer includes `.changeset/`, `.gitattributes`, `.github/`, `renovate.json`, `test/` or tsconfig files.

## 1.1.3

### Patch Changes

- [#38](https://github.com/linked-fw/dcat/pull/38) [`fdf4af7`](https://github.com/linked-fw/dcat/commit/fdf4af78814100ce392661199fbabf06dccd2836) Thanks [@flyon](https://github.com/flyon)! - `main` now points at `lib/esm/index.js`. It named `lib/index.js`, which the build has never produced, so any resolver that reads `main` instead of `exports` could not find the package. The unused `tsconfig-cjs.json` is removed, and a test checks the manifest's entry points against the build output.

## 1.1.2

### Patch Changes

- [#31](https://github.com/linked-fw/dcat/pull/31) [`a8890f2`](https://github.com/linked-fw/dcat/commit/a8890f28dfaac6d3b26dbe38d74b3ba706f537d0) Thanks [@flyon](https://github.com/flyon)! - Add `shapes/index`, a side-effect-only module that registers every shape this package defines and nothing else (no components, no CSS), so `import '@_linked/dcat/shapes/index'` loads the shapes in plain node as well as in a bundle. The package entry now imports it instead of listing shapes one by one.

## 1.1.1

### Patch Changes

- [#23](https://github.com/linked-fw/dcat/pull/23) [`59e591f`](https://github.com/linked-fw/dcat/commit/59e591f99fb62d923467e8f7e7f498444a1a564f) Thanks [@flyon](https://github.com/flyon)! - Sourcemaps now embed their TypeScript source, so consumers no longer see 'points to missing source files' warnings.

## 1.1.0

### Minor Changes

- [#20](https://github.com/linked-fw/dcat/pull/20) [`bc2bcbe`](https://github.com/linked-fw/dcat/commit/bc2bcbe04068ff396d8224f559f174a25028619f) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.21.0`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.

## 1.0.7

### Patch Changes

- [#18](https://github.com/linked-fw/dcat/pull/18) [`2826a47`](https://github.com/linked-fw/dcat/commit/2826a47013af5b12b34e0f454d3d6ed3d97032da) Thanks [@flyon](https://github.com/flyon)! - Point `types` at `index.d.ts` so a bare import gets types under node10 resolution.

  `typesVersions` (`{"*": {"*": ["lib/esm/*"]}}`) is applied to the root `types` value, so the
  previous value resolved to a path under `lib/esm/` that the build never emits. Subpath imports
  resolved fine through `exports`, which hid the failure from a bare `import … from '@_linked/dcat'`.

## 1.0.6

### Patch Changes

- [#16](https://github.com/linked-fw/dcat/pull/16) [`6df98df`](https://github.com/linked-fw/dcat/commit/6df98df2bd581f719a3e726faa314445e0b15dff) Thanks [@flyon](https://github.com/flyon)! - The ontology no longer registers by importing itself.

  It carried `import * as _this from './<prefix>.js'` and passed that namespace to
  `linkedOntology()`. Under `tsc` the self-reference survives; under a bundler it does
  not — Rollup treats it as a circular import and elides it, so the binding is
  `undefined` and a consuming app dies at boot with `_this is not defined`.

  Registration now lives in a `<prefix>.register.ts` sibling, imported from the package
  entry. Nothing changes for consumers: importing this package still registers the
  ontology.

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
