/**
 *
 * Asynchronously loads the component for GoogleMap
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
