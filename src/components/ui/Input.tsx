import { FormControl, FormControlProps, FormGroup, FormLabel } from 'react-bootstrap';

interface InputProps extends FormControlProps {
  required?: boolean;
  disabled?: boolean;
  name?: string;
}

const Input = (props: InputProps) => {
  return (
    <FormGroup hidden={props.hidden}>
      <FormLabel>{`${props.title}${props.required ? '*' : ''}`}</FormLabel>
      <FormControl
        placeholder={props.title}
        {...props}
      ></FormControl>
    </FormGroup>
  );
};

export default Input;
