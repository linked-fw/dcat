---
date: 2026-10-26
summary: >
  `Dataset` and `Distribution` shapes, `DataService.endpointURL` as an IRI (`{id}`) and
  `DataService.servesDatasets`; Create Now's two `endpointURL` call sites adapted in the same
  landing. Minor (1.4.0). Step S1 of sub-plan 001 (Create Now master plan 080).
---

# 002 — Dataset and Distribution shapes, endpointURL as an IRI

## PR

### Summary

Gives Create Now the DCAT shapes its dataset records extend (contract C5 of
[sub-plan 001](../plans/001-dataset-and-distribution-shapes.md)): a `Dataset` and a
`Distribution` shape, and `DataService.endpointURL` as an object property, as DCAT specifies.
Changeset: minor (1.4.0); the `endpointURL` type change is breaking for its two Create Now call
sites, adapted in the same landing.

### Changes

dcat:
- `src/shapes/Dataset.ts` (new): `Dataset extends Resource`, `dcat:Dataset`; `publisher`
  (`dct:publisher`, maxCount 1), `accessRights` (`dct:accessRights`, maxCount 1), `conformsTo`
  (`dct:conformsTo`), `distributions` (`dcat:distribution` → `Distribution`).
- `src/shapes/Distribution.ts` (new): `Distribution extends Shape`, `dcat:Distribution`; `title`
  (`dct:title`), `accessURL` (`dcat:accessURL`, maxCount 1), `accessService`
  (`dcat:accessService` → `DataService`, maxCount 1).
- `src/shapes/DataService.ts`: `endpointURL` is an object property (maxCount 1, `{id}`);
  new `servesDatasets` (`dcat:servesDataset` → `Dataset`).
- `src/shapes/index.ts` registers both; README gains a Shapes section; changeset
  `dataset-distribution-shapes.md` (minor).

Create Now:
- `src/backend/shapes/ApplicationProvider.ts`: writes `endpointURL: {id: url}`.
- `src/backend/shapes/ProjectProvider.ts` (`getEndPoint`): reads `endpointURL?.id`.

### Verification

- dcat `npx linked build`: `✔ Build successful`.
- dcat `npm test`: `# pass 4` / `# fail 0`.
- `ls -l node_modules/@_linked/dcat` in Create Now:
  `node_modules/@_linked/dcat -> ../../packages-local/_linked-dcat`; in the worktree,
  `npx linked doctor resolve`: `@_linked/dcat  s1/packages-local/_linked-dcat … overlay`.
- Create Now boot on 4052 (worktree): `Up and running at http://localhost:4052`,
  `[dataset-audit] all 15 recorded datasets of 6 projects are present`, and no `shape check` line:
  `@_linked/server`'s ontology phase prints `shape check: N error(s), M warning(s)` only when
  there are findings (`if (findings.length) log(…)`), so a clean check prints nothing.
- `npx vitest run src/__tests__/shapeCheck.test.ts`: `Test Files 1 passed (1)`,
  `Tests 4 passed (4)`.
- `npm run typecheck:gate` with the worktree's dcat `lib/` (see Deviations):
  `No new type errors. 0 pre-existing errors still in the baseline.` After landing and rebuilding
  dcat in the main checkout, in the main checkout: see Details, "Gate after landing".
- `CN_TEST_PORT=4402 npm run test:regular` (worktree):
  ```
  typecheck:gate                                   FAIL   14s
  unit (vitest)                                    PASS   39s
  packages                                         PASS    8s
  playwright (integration + sign-in e2e)           PASS  139s
  ```
  Vitest `Tests 2739 passed | 5 skipped (2744)`; packages `47 passed`, `418 passed`, `9 passed`;
  Playwright `274 passed (2.3m)`. The typecheck FAIL is the resolution described in Deviations
  (`TS2353: … 'id' does not exist in type 'ExpressionNode'`, read from the main checkout's old
  dcat `lib/`).

### Deviations

- **Cyclic shape references by name.** `DataService` → `Dataset` → `Distribution` →
  `DataService` is a module cycle, so each of the three cross references is declared as
  `shape: ['@_linked/dcat', '<Name>']` with a side-effect import of the target module and a
  type-only import for the getter's type (the pattern `@_linked/schema` uses). A class reference
  would hit the temporal dead zone for whichever module loads first, and `linked build`'s
  shape-reference check requires the side-effect import.
- **Typecheck in a worktree reads the main checkout's dcat.** The worktree's `node_modules` is the
  main checkout's, whose `@_linked/dcat` link resolves to the main checkout's
  `packages-local/_linked-dcat/lib`; Vite overlays the worktree's copy, `tsc` does not. The gate
  was run in the worktree with a temporary `paths` entry for `@_linked/dcat/*` (not committed),
  and again in the main checkout after landing and rebuilding.
- **No `shape check: 0 error(s), 0 warning(s)` line.** The server logs that line only when there
  are findings; its absence is the clean result.

### Follow-ups

- Create Now's legacy `getEndPoint` chain and the `DataService` write in `ApplicationProvider`
  go with Create Now's step R1 (master plan 080, step R1, "legacy chain … removed").

## Details

### Gate after landing

GATE_AFTER_LANDING
