---
date: 2026-10-24
summary: >
  `_ontologyResource` is the ontology IRI `http://www.w3.org/ns/dcat` that the data declares with `owl:Ontology`,
  not the namespace `http://www.w3.org/ns/dcat#`. Regenerated with `@_linked/cli` 1.57.1. Patch.
---

# 001 — The ontology IRI

## Why

`@_linked/cli` 1.57.1 (cli report 028) takes the generated `_ontologyResource` from the
subject the data types `owl:Ontology`. `src/data/dcat.ttl` declares `<http://www.w3.org/ns/dcat> a owl:Ontology`, the
official ontology IRI, without the namespace's `#`. With cli 1.57.1, `linked build` reported
the committed module stale:

```
dcat: Out of date: src/ontologies/dcat.data.ts. Run `linked generate-ontology`.
```

## What changed

- `src/ontologies/dcat.data.ts`, regenerated: `export const _ontologyResource = {id: 'http://www.w3.org/ns/dcat'};`
  (was `ns('')`). The terms and register modules are unchanged.
- `package.json`: `@_linked/cli` (dev) ^1.57.1; lockfile refreshed.
- README: `_ontologyResource` is the ontology IRI.

## Gate

- `npx linked build`: "✔ Checking ontology modules … ✔ Build successful".
- `npm test`: "# pass 4 / # fail 0".

## PR

### Summary

`_ontologyResource` is the ontology IRI `http://www.w3.org/ns/dcat` the data declares, regenerated with cli 1.57.1.

### Changes

- `src/ontologies/dcat.data.ts` regenerated: `_ontologyResource = {id: 'http://www.w3.org/ns/dcat'}`.
- `@_linked/cli` (dev) ^1.57.1; README updated.

### Verification

- `npx linked build`: "✔ Checking ontology modules … ✔ Build successful".
- `npm test`: "# pass 4 / # fail 0".

### Deviations

None.

### Follow-ups

None.
