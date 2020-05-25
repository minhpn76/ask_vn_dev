/**
 *
 * Asynchronously loads the component for MapsCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
