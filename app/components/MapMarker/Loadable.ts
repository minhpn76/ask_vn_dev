/**
 *
 * Asynchronously loads the component for MapMarker
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
