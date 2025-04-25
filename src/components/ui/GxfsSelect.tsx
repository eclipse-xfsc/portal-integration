import { Form } from 'react-bootstrap';
import React, { ChangeEventHandler } from 'react';

interface GxfsSelectProps {
  name: string;
  label?: string;
  valueChanged?: ChangeEventHandler | undefined;
  value: number | undefined;
  defaultText?: string;
  items: SelectItem[];
  className?: string;
  skipLabel?: true;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface SelectItem {
  id: number;
  value: string;
}

const GxfsSelect = (props: GxfsSelectProps) => {
  const className = props.className || 'mb-2';
  const skipLabel = !!props.skipLabel;
  const disabled = !!props.disabled;
  const required = !!props.required;
  const selectValue = (input: any) => {
    if (input === undefined || input === null) {
      return '';
    }
    return input;
  };

  const showOptions = () => {
    return props.items.map((item) => {
      return (
        <option
          value={item.id}
          key={item.id}
        >
          {item.value}
        </option>
      );
    });
  };

  const isValid = () => {
    return props.value !== -1;
  };

  return (
    <Form.Group className={className}>
      {!skipLabel && <Form.Label className='modal-form-label'>{props.label}</Form.Label>}
      <Form.Select
        name={props.name}
        onChange={props.valueChanged}
        value={selectValue(props.value)}
        disabled={disabled}
        isValid={!required || isValid()}
        isInvalid={required && !isValid()}
      >
        <option
          hidden
          defaultValue={-1}
          key={-1}
        >
          {props.defaultText || ''}
        </option>
        {showOptions()}
      </Form.Select>
      {required && (
        <Form.Control.Feedback type='invalid'>Please select value in a field {props.label}.</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default GxfsSelect;
