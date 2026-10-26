---
summary: >
  Tasks for step S1 of sub-plan 001: `Dataset` and `Distribution` shapes, `DataService.endpointURL`
  as an IRI and `servesDatasets`; Create Now's two `endpointURL` call sites adapted in the same landing.
status: Tasks
---

# 002 — Dataset and Distribution shapes, endpointURL as an IRI

Plan and contract: [sub-plan 001 §S1 and C5](001-dataset-and-distribution-shapes.md). Ideation and
plan are settled there (Create Now master plan 080, D14 and D16); this doc holds the tasks.

## Phase 1 — shapes and the Create Now call sites

Tasks (dcat):
1. `src/shapes/Dataset.ts`: `Dataset extends Resource`, `targetClass = dcat.Dataset`; object
   properties `publisher` (`dct:publisher`, `Shape`, maxCount 1), `accessRights`
   (`dct:accessRights`, `Shape`, maxCount 1), `conformsTo` (`dct:conformsTo`, `Shape`),
   `distributions` (`dcat:distribution` → `Distribution`).
2. `src/shapes/Distribution.ts`: `Distribution extends Shape`, `targetClass = dcat.Distribution`;
   `accessURL` (`dcat:accessURL`, `Shape`, maxCount 1), `accessService` (`dcat:accessService` →
   `DataService`, maxCount 1), `title` (`dct:title`, literal).
3. `src/shapes/DataService.ts`: `endpointURL` becomes an object property (`Shape`, maxCount 1);
   new `servesDatasets` (`dcat:servesDataset` → `Dataset`).
4. Register both in `src/shapes/index.ts`; README's shape list; changeset (minor).

Tasks (Create Now):
5. `ApplicationProvider.ts`: write `endpointURL: {id: url}`.
6. `ProjectProvider.ts` `getEndPoint`: read `endpointURL?.id`.

Validation: dcat `npx linked build` prints `✔ Build successful`; dcat `npm test` shows `# fail 0`;
`ls -l node_modules/@_linked/dcat` in Create Now points at `packages-local`; a Create Now boot on
4052 logs `shape check: 0 error(s), 0 warning(s)`; `npm run typecheck:gate`,
`npx vitest run src/__tests__/shapeCheck.test.ts` and `npm run test:regular` pass.

Dependencies: tasks 1–4 before 5–6 (Create Now type-checks against dcat's built `lib/`). One
agent, no parallel work.
