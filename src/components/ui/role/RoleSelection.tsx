import React from 'react';
import { ButtonGroup, Container, ToggleButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classes from './role.module.scss';

interface RoleSelectionProps {
  roles: string[];
  selectedRoles: string[];
  onSelect: (roles: string[]) => void;
}

const RoleSelection = ({ roles, selectedRoles, onSelect }: RoleSelectionProps) => {
  const { t } = useTranslation();

  const handleSelect = (idx: number) => {
    const selected = roles[idx];

    selectedRoles.includes(selected)
      ? onSelect(selectedRoles.filter((item) => item !== selected))
      : onSelect([...selectedRoles, selected]);
  };

  return (
    <Container className={classes['available-roles-container']}>
      <h3>{t('register-principal.available-roles')}</h3>
      <ButtonGroup
        vertical
        className={classes['btn-grp']}
      >
        {roles.map((role, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type='checkbox'
            variant='outline-info'
            name='radio'
            value={role}
            checked={selectedRoles.includes(role)}
            onChange={() => handleSelect(idx)}
          >
            {t(`register-principal.roles.${role}`)}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};

export default RoleSelection;
