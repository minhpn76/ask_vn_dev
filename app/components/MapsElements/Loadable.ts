/**
 *
 * Asynchronously loads the component for MapsElements
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
