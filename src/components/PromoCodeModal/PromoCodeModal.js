import React from 'react';
import DialogInput from 'react-native-dialog-input';
import { func, bool } from 'prop-types';

import { i18n } from '../../constants/i18n';

const PromoCodeModal = ({ show, onSubmitNo, onSubmitSave }) => {
  return (
    <DialogInput
      isDialogVisible={show}
      title={i18n.promoCodeDialog.title}
      hintInput={i18n.promoCodeDialog.hintInput}
      submitText={i18n.promoCodeDialog.continueBtn}
      cancelText={i18n.promoCodeDialog.noBtn}
      submitInput={(inputText) => inputText && inputText.length && onSubmitSave(inputText)}
      closeDialog={onSubmitNo}
    />
  );
};

PromoCodeModal.propTypes = {
  show: bool.isRequired,
  onSubmitNo: func.isRequired,
  onSubmitSave: func.isRequired,
};

export default PromoCodeModal;
