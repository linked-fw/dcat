import * as dcterms from '@_linked/dcmi/ontologies/dcterms';
import { objectProperty } from '@_linked/core/shapes/SHACL';
import { Shape } from '@_linked/core/shapes/Shape';
import * as dcat from '../ontologies/dcat.js';
import { linkedShape } from '../package.js';
import type { Distribution } from './Distribution.js';
import './Distribution.js';
import { Resource } from './Resource.js';

@linkedShape
export class Dataset extends Resource {
  static targetClass = dcat.Dataset;

  @objectProperty({
    path: dcterms.publisher,
    shape: Shape,
    maxCount: 1,
  })
  get publisher(): Shape {
    return undefined as any;
  }

  @objectProperty({
    path: dcterms.accessRights,
    shape: Shape,
    maxCount: 1,
  })
  get accessRights(): Shape {
    return undefined as any;
  }

  @objectProperty({
    path: dcterms.conformsTo,
    shape: Shape,
  })
  get conformsTo(): Shape[] {
    return undefined as any;
  }

  @objectProperty({
    path: dcat.distribution,
    shape: ['@_linked/dcat', 'Distribution'],
  })
  get distributions(): Distribution[] {
    return undefined as any;
  }
}
