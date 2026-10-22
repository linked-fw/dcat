import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

/**
 * The package's shapes agree with its ontology data (the W3C DCAT Turtle): every `extends` is
 * backed by a stated `rdfs:subClassOf`, no shape borrows a class, and every DCAT term the package
 * uses is defined in that data. Runs on the build output, so it checks the shipped Turtle.
 *
 * The test loads the package and its framework dependencies the way an app does (each one's
 * `shapes/index`, which registers its ontology data as well: a dependency's shape modules alone
 * do not, and its terms would read as undefined). Findings about the dependencies' shapes belong
 * to their own packages, so only findings on this package's shapes and in its mirrored namespace
 * count here.
 */

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const NS = 'http://www.w3.org/ns/dcat#';

await import(new URL('lib/esm/index.js', root).href);
for (const dep of Object.keys(pkg.dependencies ?? {})) {
  if (dep.startsWith('@_linked/') && dep !== '@_linked/core') await import(`${dep}/shapes/index`);
}
const {checkShapeHierarchy} = await import('@_linked/core/shapes/checkShapeHierarchy');
const {getAllNodeShapes, getShapeClass} = await import('@_linked/core/utils/ShapeClass');

const ownShape = (iri) => iri !== undefined && getShapeClass(iri)?.packageName === pkg.name;

test('the shape check reports nothing on this package', async () => {
  assert.ok([...getAllNodeShapes().keys()].some(ownShape), 'no shape of this package registered');
  const findings = (await checkShapeHierarchy()).filter(
    (f) => ownShape(f.shape) || (f.kind === 'mirror-undefined-term' && f.iri?.startsWith(NS)),
  );
  assert.deepEqual(findings, []);
});

test('the ontology data holds the DCAT class hierarchy', async () => {
  const {hierarchyFromTurtle} = await import('@_linked/core/ontology/hierarchy');
  const text = readFileSync(new URL('lib/esm/data/dcat.ttl', root), 'utf8');
  const triples = await hierarchyFromTurtle([text]);
  assert.deepEqual(
    triples.map(({s, o}) => `${s} ${o}`),
    [
      `${NS}Catalog ${NS}Dataset`,
      `${NS}DataService http://purl.org/dc/dcmitype/Service`,
      `${NS}DataService ${NS}Resource`,
      `${NS}Dataset ${NS}Resource`,
      `${NS}DatasetSeries ${NS}Dataset`,
      `${NS}Role http://www.w3.org/2004/02/skos/core#Concept`,
    ],
  );
});
