import { literalProperty } from '@_linked/core/shapes/SHACL';
import * as dcat from '../ontologies/dcat.js';
import { linkedShape } from '../package.js';
import { Resource } from './Resource.js';

@linkedShape
export class DataService extends Resource {
  static targetClass = dcat.DataService;

  @literalProperty({
    path: dcat.endpointURL,
    maxCount: 1,
  })
  get endpointURL(): string {
    return '' as string;
  }
}
