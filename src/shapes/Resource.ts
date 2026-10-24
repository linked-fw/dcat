import * as dcterms from '@_linked/dcmi/ontologies/dcterms';
import { literalProperty } from '@_linked/core/shapes/SHACL';
import { Shape } from '@_linked/core/shapes/Shape';
import * as dcat from '../ontologies/dcat.js';
import { linkedShape } from '../package.js';

@linkedShape
export class Resource extends Shape {
  static targetClass = dcat.Resource;

  @literalProperty({
    path: dcterms.title,
  })
  get title() {
    return '' as string;
  }

  @literalProperty({
    path: dcterms.description,
  })
  get description() {
    return '' as string;
  }
}
