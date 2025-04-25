import { Form } from 'react-bootstrap';
import React, { ChangeEventHandler, useMemo } from 'react';
import { GxfsTextMode } from '../util/common-model';
import { useTranslation } from 'react-i18next';

interface GxfsTextareaProps {
  name: string;
  valueChanged?: ChangeEventHandler | undefined;
  placeholder?: string;
  value?: string;
  label?: string;
  rows?: number;
  mode?: GxfsTextMode;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
}

const GxfsTextarea = (props: GxfsTextareaProps) => {
  const mode = props.mode || GxfsTextMode.SMALL;
  const labelClass = mode === GxfsTextMode.SMALL ? '' : 'gxfs-font-dark-medium';
  const rows = props.rows || 6;
  const required = !!props.required;

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
    <Form.Group className='mb-2'>
      {props.label && <Form.Label className={labelClass}>{props.label}</Form.Label>}
      <Form.Control
        as='textarea'
        rows={rows}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.valueChanged}
        value={props.value}
        disabled={props.disabled}
        isValid={validationMessages.length === 0}
        isInvalid={validationMessages.length > 0}
      />
      <Form.Control.Feedback type='invalid'>{validationMessages.join(', ')}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default GxfsTextarea;
