import { createSelector } from 'reselect';
import { NAME } from '../redux/authorization/authorization';
import { documentsEnumTypes } from '../constants/documentsTypes';

const selectAuth = (state) => state[NAME];

export const selectAuthError = createSelector(selectAuth, ({ error }) => error);

export const fetchingState = createSelector(selectAuth, ({ isFetching }) => isFetching);

export const selectUserToken = createSelector(selectAuth, ({ token }) => token);

export const selectRestorationEmail = createSelector(selectAuth, ({ restoredEmail }) => restoredEmail);

export const selectImageUri = createSelector(selectAuth, ({ avatarUrl }) => avatarUrl || null);

export const selectDocumentLoaded = createSelector(selectAuth, ({ isDocumentLoaded }) => isDocumentLoaded);

export const selectCashedDocuments = createSelector(selectAuth, ({ cashedDocuments }) => cashedDocuments);

export const selectAvatarFromStorage = createSelector(selectAuth, ({ avatarImage }) => {
  if (avatarImage) {
    const { _parts } = avatarImage;
    const url = _parts.map((image) => {
      return image.find(({ uri }) => {
        return uri;
      });
    });
    return url[0];
  }
  return null;
});

export const selectDocuments = createSelector(selectAuth, ({ documents }) => {
  if (!documents) {
    return documentsEnumTypes;
  }

  const formattedDocuments = [];
  for (let i = 0; i < documentsEnumTypes.length; i++) {
    const template = {};
    template.id = documentsEnumTypes[i].id;
    template.type = documentsEnumTypes[i].type;
    template.documentType = documentsEnumTypes[i].documentType;

    for (let j = 0; j < documents.length; j++) {
      const document = documents[j];

      if (template.documentType === document.documentType) {
        template.url = document.url;
        template.id = document.id;
        template.title = document.title;
        template.url = document.url;
        template.isValid = document.isValid;
        template.isCurrent = document.isCurrent;
        template.isExpiresInAFewDays = document.isExpiresInAFewDays;

        break;
      }
    }

    formattedDocuments.push(template);
  }

  return formattedDocuments;
});
export const selectUserCredentials = createSelector(selectAuth, ({ userCredentials }) => userCredentials);
export const selectRegistrationKeyValidValue = createSelector(
  selectAuth,
  ({ registrationKeyValidValue }) => registrationKeyValidValue,
);
export const selectResetPasswordFinishData = createSelector(
  selectAuth,
  ({ resetPasswordFinishData }) => resetPasswordFinishData,
);

export const selectStripeApiKey = createSelector(selectAuth, ({ stripeToken }) => stripeToken);
export const selectUpdatedProfile = createSelector(selectAuth, ({ updatedProfile }) => updatedProfile);
