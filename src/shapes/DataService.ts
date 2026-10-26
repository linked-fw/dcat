import { objectProperty } from '@_linked/core/shapes/SHACL';
import { Shape } from '@_linked/core/shapes/Shape';
import * as dcat from '../ontologies/dcat.js';
import { linkedShape } from '../package.js';
import type { Dataset } from './Dataset.js';
import './Dataset.js';
import { Resource } from './Resource.js';

@linkedShape
export class DataService extends Resource {
  static targetClass = dcat.DataService;

  /** The root location or primary endpoint of the service, an IRI (`{id}`). */
  @objectProperty({
    path: dcat.endpointURL,
    shape: Shape,
    maxCount: 1,
  })
  get endpointURL(): Shape {
    return undefined as any;
  }

  @objectProperty({
    path: dcat.servesDataset,
    shape: ['@_linked/dcat', 'Dataset'],
  })
  get servesDatasets(): Dataset[] {
    return undefined as any;
  }
}
