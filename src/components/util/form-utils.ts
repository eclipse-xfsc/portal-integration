type UpdateFieldFunction<T> = (self: T) => T;

export const onFormChangedFunction = (e: any): UpdateFieldFunction<any> => {
  const key = e.target.name;
  let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  if (e.target.type === 'select-one') {
    value = +value;
  }
  return (item) => ({ ...item, [key]: value });
};

export const submitForm = (formRef: any): void => {
  // @ts-ignore
  formRef?.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
};
