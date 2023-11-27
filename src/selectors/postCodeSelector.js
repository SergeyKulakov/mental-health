import { createSelector } from 'reselect';
import { NAME } from '../redux/postCode/postCode';

const selectPostCode = (state) => state[NAME];

export const selectFetchedPostCodes = createSelector(selectPostCode, ({ fetchedPostCodes }) => fetchedPostCodes);
