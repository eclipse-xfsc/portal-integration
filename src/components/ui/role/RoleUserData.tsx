import { ChangeEventHandler, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import Line from '../Line';
import classes from './role.module.scss';
import GxfsTextInput from '../GxfsTextInput';

export interface RoleUserDataMap {
  [key: string]: string;
}

export const defaultMap = {
  email: '',

  fedId: '',
  fedName: '',
  empId: '',
  empFirstName: '',
  empLastName: '',
};

interface RoleUserDataProps {
  disabled?: boolean;
  onValueChanged?: ChangeEventHandler;
  value: RoleUserDataMap;
  withEmail?: boolean;
}

const RoleUserData = ({ value, onValueChanged, disabled, withEmail }: RoleUserDataProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Line className={classes['line']} />
      <Container className={classes['data-container']}>
        <h3>{t('register-principal.your-data')}</h3>
        {withEmail && (
          <>
            <GxfsTextInput
              name='email'
              label={t('register-principal.data.email')}
              valueChanged={onValueChanged}
              value={value.email}
              disabled={disabled}
              required
              placeholder={t('register-principal.data.email')}
            />
            <GxfsTextInput
              name='empFirstName'
              label={t('register-principal.data.first-name')}
              valueChanged={onValueChanged}
              value={value.empFirstName}
              disabled={disabled}
              required
              placeholder={t('register-principal.data.first-name')}
            />
            <GxfsTextInput
              name='empLastName'
              label={t('register-principal.data.last-name')}
              valueChanged={onValueChanged}
              value={value.empLastName}
              disabled={disabled}
              required
              placeholder={t('register-principal.data.last-name')}
            />
          </>
        )}
        {!withEmail && (
          <>
            <Input
              title={t('register-principal.data.fed-id')}
              name='fedId'
              value={value.fedId}
              disabled={disabled}
              onChange={onValueChanged}
            />
            <Input
              title={t('register-principal.data.fed-name')}
              name='fedName'
              value={value.fedName}
              disabled={disabled}
              onChange={onValueChanged}
            />
            <Input
              title={t('register-principal.data.emp-id')}
              name='empId'
              value={value.empId}
              disabled={disabled}
              onChange={onValueChanged}
            />
            <Input
              title={t('register-principal.data.emp-first-name')}
              name='empFirstName'
              value={value.empFirstName}
              disabled={disabled}
              onChange={onValueChanged}
            />
            <Input
              title={t('register-principal.data.emp-last-name')}
              name='empLastName'
              value={value.empLastName}
              disabled={disabled}
              onChange={onValueChanged}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default RoleUserData;
