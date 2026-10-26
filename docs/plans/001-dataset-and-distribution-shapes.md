---
summary: >
  Sub-plan of Create Now's master plan 080 for @_linked/dcat: a `Dataset` and a `Distribution`
  shape, `DataService.endpointURL` as an IRI (DCAT 3 makes it an object property) and
  `DataService.servesDatasets`, released as a minor (1.4.0) on integration branch `dev`.
status: Plan
---

# 001 — Dataset and Distribution shapes (sub-plan of Create Now 080)

Master plan: Create Now `docs/plans/080-datasets-as-workspace-entities.md` (rules, decisions,
status). This repository's step is **S1**. The step lands on integration branch `dev` with a
changeset; no PR until the owner asks for a release.

## Contracts

- **C5 DCAT shapes** (provider: this repo; consumers: Create Now S2, R1). `@_linked/dcat` ^1.4.0:
  - `shapes/Dataset`: `targetClass = dcat:Dataset`, extends `Resource`; properties `publisher`
    (`dct:publisher`, object), `accessRights` (`dct:accessRights`, object), `conformsTo`
    (`dct:conformsTo`, object), `distributions` (`dcat:distribution` → `Distribution`).
  - `shapes/Distribution`: `targetClass = dcat:Distribution`, extends `Shape` (DCAT gives
    `dcat:Distribution` no superclass); `accessURL` (`dcat:accessURL`, object, `{id}`),
    `accessService` (`dcat:accessService` → `DataService`), `title` (`dct:title`).
  - `shapes/DataService`: `endpointURL` becomes an object property (`{id}`, maxCount 1);
    new `servesDatasets` (`dcat:servesDataset` → `Dataset`).
  - How Create Now uses them: each dataset has its own `dcat:DataService` whose `endpointURL` is
    the dataset's root, and a `dcat:Distribution` whose `accessURL` equals that `endpointURL`
    (DCAT 3 axiomatises `accessURL` as the chain `accessService`/`endpointURL`, §5.9).

## S1 — Dataset and Distribution shapes, endpointURL as an IRI

**Depends on:** nothing. **Size:** small, 1 phase.

**Goal.** Give Create Now the DCAT shapes it extends, and make `endpointURL` IRI-valued as DCAT
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
- The `endpointURL` change reaches Create Now at once (the localized checkout is linked). Its
  only users are Create Now's legacy `ApplicationProvider.ts:260-269` (writes) and
  `ProjectProvider.ts:2412, 2456-2469` (`getEndPoint`, reads it as a string); Create Now stores 0
  `dcat:endpointURL` triples. Adapt those two call sites in the same landing (write `{id: url}`,
  read `.endpointURL?.id`) in a Create Now worktree; Create Now's R1 removes them later.

**Tests.** Quick: `npx linked build && npm test` (node --test: `test/shape-check.test.mjs`,
`test/manifest-targets.test.mjs`, both on `lib/`). Create Now: `npm run typecheck:gate`,
`npx vitest run src/__tests__/shapeCheck.test.ts`. Landing gate: Create Now's
`npm run test:regular`.

**Verify.** Build prints `✔ Build successful`; `npm test` shows `# fail 0`;
`ls -l node_modules/@_linked/dcat` in Create Now points at `packages-local`; a Create Now boot
logs `shape check: 0 error(s), 0 warning(s)`.

## Progress

- [x] S1 — [report 002](../reports/002-dataset-distribution-endpointurl.md)
