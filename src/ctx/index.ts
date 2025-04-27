import { functions } from 'src/utils/functions';
import { selections } from 'src/utils/selections';

/**
 * Context throughout the app
 * This is used to access the actions and other functions in the whole app
 */
const ctx = {
  functions,
  selections,
};

export default ctx;
