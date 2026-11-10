import {linkedPackage} from '@_linked/core/utils/Package';

export const {
  linkedShape,
  linkedUtil,
  registerOntologies,
  registerPackageExport,
  packageExports,
  getPackageShape
} = linkedPackage('@_linked/dcat', {mirrors: 'http://www.w3.org/ns/dcat#'});
