import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { FlexColumnContainer, NoPaddingFlexRowContainer } from '../ui/container';
import EditButton from '../ui/EditButton';
import GxfsTextarea from '../ui/GxfsTextarea';
import Line from '../ui/Line';
import classes from './Invitation.module.scss';

interface InvitationMessageProps {
  valueChanged?: ChangeEventHandler | undefined;
  value?: string;
  disabled?: boolean;
  onEditClick?: () => void;
  textAreaLabel?: string;
}

const InvitationMessage = (props: InvitationMessageProps) => {
  const { t } = useTranslation();
  const label = props.textAreaLabel || t('invitation.message');

  return (
    <FlexColumnContainer>
      <Line />
      <NoPaddingFlexRowContainer className={classes['message-row']}>
        <p>{label}</p>
        <EditButton
          btnClassName={classes['edit-btn']}
          editAction={props.onEditClick}
        />
      </NoPaddingFlexRowContainer>
      <GxfsTextarea
        {...props}
        name='message'
      />
    </FlexColumnContainer>
  );
};

export default InvitationMessage;
