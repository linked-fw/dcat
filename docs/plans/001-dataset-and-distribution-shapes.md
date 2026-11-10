---
summary: >
  Sub-plan of the host app's datasets master plan for @_linked/dcat: a `Dataset` and a `Distribution`
  shape, `DataService.endpointURL` as an IRI (DCAT 3 makes it an object property) and
  `DataService.servesDatasets`, released as a minor (1.4.0) on integration branch `dev`.
status: Plan
---

# 001 — Dataset and Distribution shapes (sub-plan of the host app's datasets plan)

Master plan: the host app's datasets master plan (rules, decisions, status). This repository's step is **S1**. The step lands on integration branch `dev` with a
changeset; no PR until the owner asks for a release.

## Contracts

- **C5 DCAT shapes** (provider: this repo; consumers: the host app's steps S2, R1). `@_linked/dcat` ^1.4.0:
  - `shapes/Dataset`: `targetClass = dcat:Dataset`, extends `Resource`; properties `publisher`
    (`dct:publisher`, object), `accessRights` (`dct:accessRights`, object), `conformsTo`
    (`dct:conformsTo`, object), `distributions` (`dcat:distribution` → `Distribution`).
  - `shapes/Distribution`: `targetClass = dcat:Distribution`, extends `Shape` (DCAT gives
    `dcat:Distribution` no superclass); `accessURL` (`dcat:accessURL`, object, `{id}`),
    `accessService` (`dcat:accessService` → `DataService`), `title` (`dct:title`).
  - `shapes/DataService`: `endpointURL` becomes an object property (`{id}`, maxCount 1);
    new `servesDatasets` (`dcat:servesDataset` → `Dataset`).
  - How the host app uses them: each dataset has its own `dcat:DataService` whose `endpointURL` is
    the dataset's root, and a `dcat:Distribution` whose `accessURL` equals that `endpointURL`
    (DCAT 3 axiomatises `accessURL` as the chain `accessService`/`endpointURL`, §5.9).

## S1 — Dataset and Distribution shapes, endpointURL as an IRI

**Depends on:** nothing. **Size:** small, 1 phase.

**Goal.** Give the host app the DCAT shapes it extends, and make `endpointURL` IRI-valued as DCAT
specifies.

**Scope.** C5 above. All the terms already exist in `src/ontologies/dcat.ts`; `dct:*` comes from
`@_linked/dcmi`.

**Files.** `src/shapes/{DataService,Resource,index}.ts`, new `src/shapes/{Dataset,Distribution}.ts`
(registered through `src/shapes/index.ts`; `src/package.ts` declares `linkedPackage(…,
{mirrors: dcat})`); the object-property-as-`{id}` pattern is the one `sioc:about` uses in
`_linked-sioc/src/shapes/Item.ts`; README's shape list; `.changeset/<name>.md` (minor).

**Pitfalls.**
- `Distribution` must extend `Shape`, not `Resource`: the package's shape check fails an
  `extends` with no `rdfs:subClassOf` behind it.
- The `endpointURL` change reaches the host app at once (the localized checkout is linked). Its
  only users are two legacy call sites in the host app (one writes it, one reads it as a string);
  the host app stores 0 `dcat:endpointURL` triples. Adapt those two call sites in the same landing
  (write `{id: url}`, read `.endpointURL?.id`); the host app's step R1 removes them later.

**Tests.** Quick: `npx linked build && npm test` (node --test: `test/shape-check.test.mjs`,
`test/manifest-targets.test.mjs`, both on `lib/`). Host app: its typecheck gate and its
shape-check test. Landing gate: the host app's regular test set.

**Verify.** Build prints `✔ Build successful`; `npm test` shows `# fail 0`;
`ls -l node_modules/@_linked/dcat` in the host app points at `packages-local`; a host app boot
logs `shape check: 0 error(s), 0 warning(s)`.

## Progress

- [x] S1 — [report 002](../reports/002-dataset-distribution-endpointurl.md)
