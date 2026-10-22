import {createNameSpace} from '@_linked/core/utils/NameSpace';
import {loadOntologyFiles} from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module: the W3C DCAT Turtle, unedited (copied into `lib/` by the build). */
export const dataFiles = ['../data/dcat.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

/**
 * The namespace of this ontology, which can be used to create NamedNodes with URI's not listed in this file
 */
export var ns = createNameSpace('http://www.w3.org/ns/dcat#');

/**
 * The NamedNode of the ontology itself
 */
export var _self = ns('');

//A list of all the entities (Classes & Properties) of this ontology, each exported as a NamedNode
export var DataService = ns('DataService');
export var Resource = ns('Resource');
export var Dataset = ns('Dataset');
export var endpointURL = ns('endpointURL');
export var servesDataset = ns('servesDataset');

//An extra grouping object so all the entities can be accessed from the prefix/name
export const dcat = {
  DataService,
  Resource,
  Dataset,
  endpointURL,
  servesDataset,
};

