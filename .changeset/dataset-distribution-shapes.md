---
'@_linked/dcat': minor
---

New `Dataset` (`dcat:Dataset`, extends `Resource`: `publisher`, `accessRights`, `conformsTo`,
`distributions`) and `Distribution` (`dcat:Distribution`, extends `Shape`: `title`, `accessURL`,
`accessService`) shapes. `DataService` gains `servesDatasets` (`dcat:servesDataset`).

Breaking for `DataService.endpointURL`: it is now an object property, as DCAT specifies
(`dcat:endpointURL` ranges over resources). Write it as `{id: url}` and read `endpointURL.id`;
it was a string literal.
