---
"@_linked/dcat": minor
---

The `dcat` accessor modules are generated from `src/data/dcat.ttl` by `linked generate-ontology`
(`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale.
`ontologies/dcat` exports one named term for each of the 52 subjects of the namespace (up from 5).
`src/data/dcat.ttl` is DCAT 3 as the W3C publishes it at `https://www.w3.org/ns/dcat.ttl`, with a
comment naming the source; a new README records it and the `-added` convention.

Breaking changes:

- The aggregated `dcat` object is gone. Import the module as a namespace:

  ```ts
  import * as dcat from '@_linked/dcat/ontologies/dcat';
  static targetClass = dcat.DataService;
  ```

- `ns`, `dataFiles` and `loadData` moved to `@_linked/dcat/ontologies/dcat.data`; `_self` is now
  `_ontologyResource` there. `import * as dcat` no longer reaches them, and the registered
  ontology carries only its terms.
- The shapes import `@_linked/dcmi` 1.6's namespace modules. Requires `@_linked/core` ^2.41.0
  and `@_linked/dcmi` ^1.6.0.
- No terms were renamed.
