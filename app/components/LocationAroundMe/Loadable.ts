/**
 *
 * Asynchronously loads the component for LocationAroundMe
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
