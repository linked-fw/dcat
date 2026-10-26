import * as dcterms from '@_linked/dcmi/ontologies/dcterms';
import { literalProperty, objectProperty } from '@_linked/core/shapes/SHACL';
import { Shape } from '@_linked/core/shapes/Shape';
import * as dcat from '../ontologies/dcat.js';
import { linkedShape } from '../package.js';
import type { DataService } from './DataService.js';
import './DataService.js';

/**
 * A representation of a dataset. DCAT gives `dcat:Distribution` no superclass, so this shape
 * extends `Shape` rather than `Resource`.
 *
 * DCAT 3 axiomatises `accessURL` as the chain `accessService`/`endpointURL`: when a distribution
 * has an access service, its `accessURL` is that service's `endpointURL`.
 */
@linkedShape
export class Distribution extends Shape {
  static targetClass = dcat.Distribution;

  @literalProperty({
    path: dcterms.title,
  })
  get title() {
    return '' as string;
  }

  @objectProperty({
    path: dcat.accessURL,
    shape: Shape,
    maxCount: 1,
  })
  get accessURL(): Shape {
    return undefined as any;
  }

  @objectProperty({
    path: dcat.accessService,
    shape: ['@_linked/dcat', 'DataService'],
    maxCount: 1,
  })
  get accessService(): DataService {
    return undefined as any;
  }
}
