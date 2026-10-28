# @_linked/dcat

[DCAT 3](https://www.w3.org/TR/vocab-dcat-3/) for Linked: the Data Catalog Vocabulary as Turtle,
an accessor for every term, and shapes for the core classes. The package mirrors
`http://www.w3.org/ns/dcat#` and holds only its terms.

## Terms

```ts
import * as dcat from '@_linked/dcat/ontologies/dcat';

static targetClass = dcat.DataService;
```

`ontologies/dcat` has one named export per term (52); `ontologies/dcat.data` holds `ns`,
`dataFiles`, `_ontologyResource` and `loadData()`. `linked generate-ontology` writes the modules
from the data (`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale;
never edit them by hand.

## Shapes

`import '@_linked/dcat/shapes/index'` registers them all; each is also `shapes/<Name>`.

| Shape | Class | Properties |
|---|---|---|
| `Resource` | `dcat:Resource` | `title`, `description` |
| `Dataset` (→ `Resource`) | `dcat:Dataset` | `publisher`, `accessRights`, `conformsTo`, `distributions` |
| `Distribution` (→ `Shape`) | `dcat:Distribution` | `title`, `accessURL`, `accessService` |
| `DataService` (→ `Resource`) | `dcat:DataService` | `endpointURL`, `servesDatasets` |

IRI-valued properties (`endpointURL`, `accessURL`, `publisher`, `accessRights`, `conformsTo`) are
object properties: write and read them as `{id}`. `Distribution` extends `Shape` because DCAT
gives `dcat:Distribution` no superclass. DCAT 3 axiomatises `accessURL` as the chain
`accessService`/`endpointURL`, so a distribution with an access service has that service's
`endpointURL` as its `accessURL`.

## The data

`src/data/dcat.ttl` is DCAT 3 (W3C Recommendation, 2024) as the W3C publishes it,
<https://www.w3.org/ns/dcat.ttl> (which redirects to `dcat3.ttl`; `dcat:version "3"`,
Last-Modified 2025-09-03), unchanged apart from a leading comment that names the source. To
refresh, download it with `curl -sSL https://www.w3.org/ns/dcat.ttl`, put the comment back with
the new version, and run `npx linked generate-ontology`.

The official files are the only source of the package's terms: the package never adds a class
or property to a standard's namespace. What the published standard lacks, mainly metadata, goes
in one extra file per prefix, `src/data/<prefix>-added.ttl`, listed in `"linkedOntologies"`' data:

- the ontology entity itself: `owl:Ontology`, title, description,
  `vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`, the source URL and version;
- annotations on terms the standard already defines, such as a missing `rdfs:label`.

New classes or properties never go there; a term a standard lacks belongs in the consumer's own
ontology package.

The official file carries its own ontology header (on `<http://www.w3.org/ns/dcat>`, without the
`#`), so this package has no `-added` file. 
`_ontologyResource` is that ontology IRI, `http://www.w3.org/ns/dcat` (the generator takes it from the
`owl:Ontology` declaration).

## Development

```bash
npx linked build    # checks the ontology modules, compiles, writes lib/esm/data/shapes.ttl
npm test            # runs against lib/
```

## Data license

The package code is MIT licensed (see `LICENSE`). The bundled ontology data is derived from the W3C Data Catalog Vocabulary (DCAT) - Version 3 (https://www.w3.org/ns/dcat) and is not covered by the MIT license: it remains under the Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/, as its vocabulary file declares (dcterms:license). See `NOTICE`.
