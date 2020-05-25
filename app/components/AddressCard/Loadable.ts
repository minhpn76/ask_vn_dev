/**
 *
 * Asynchronously loads the component for AddressCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
