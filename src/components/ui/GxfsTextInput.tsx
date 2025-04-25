import { Form } from 'react-bootstrap';
import React, { ChangeEventHandler, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface GxfsTextInputProps {
  name: string;
  valueChanged?: ChangeEventHandler | undefined;
  placeholder?: string;
  value?: string;
  label?: string;
  skipLabel?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const GxfsTextInput = (props: GxfsTextInputProps) => {
  const skipLabel = !!props.skipLabel;
  const className = props.className || 'mb-2';
  const disabled = !!props.disabled;
  const { t } = useTranslation();

  const getValidationErrorMessages = (): string[] => {
    console.log('getValidationErrorMessages');
    const errorMsgs = [];
    if (props.required && props.value?.length === 0) {
      errorMsgs.push(t('validation.required', { fieldName: props.label }));
    }
    if (props.max && (props.value?.length || 0) > props.max) {
      errorMsgs.push(t('validation.max', { fieldName: props.label, max: props.max }));
    }
    if (props.min && (props.value?.length || 0) < props.min) {
      errorMsgs.push(t('validation.min', { fieldName: props.label, min: props.min }));
    }
    return errorMsgs;
  };

  const validationMessages = useMemo(() => getValidationErrorMessages(), [props]);

  return (
    <Form.Group className={className}>
      {!skipLabel && <Form.Label className='modal-form-label'>{props.label}</Form.Label>}
      <Form.Control
        type='text'
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.valueChanged}
        value={props.value}
        isValid={validationMessages.length === 0}
        isInvalid={validationMessages.length > 0}
        disabled={disabled}
      />
      <Form.Control.Feedback type='invalid'>{validationMessages.join(', ')}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default GxfsTextInput;
