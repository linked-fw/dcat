---
'@_linked/dcat': minor
---

The package ships the W3C DCAT 3 vocabulary as its ontology data: `src/data/dcat.ttl` is `https://www.w3.org/ns/dcat.ttl` unedited (CC-BY-4.0, attribution kept in the file), copied into `lib/esm/data/` by the build. `loadData()` now resolves to the Turtle text (`string[]`, through `@_linked/core`'s `loadOntologyFiles`) instead of an empty JSON-LD document, and the new `dataFiles` export names the files. Its `rdfs:subClassOf` axioms (`Catalog`, `DatasetSeries` ⊑ `Dataset`; `Dataset`, `DataService` ⊑ `Resource`; `DataService` ⊑ `dcmitype:Service`; `dcat:Role` ⊑ `skos:Concept`) reach every app dataset through core's ontology sync.

The package declares that it mirrors `http://www.w3.org/ns/dcat#`, so the shape check reports any DCAT term a shape or export uses that the W3C data does not define. `src/data/dcat.json` is removed.
