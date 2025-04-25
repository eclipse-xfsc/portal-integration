import QRCode from 'qrcode.react';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import classes from './Ftu.module.scss';

// ftu --> first-time-user
interface FtuQrCodeProps {
  title: string;
  qrcodeData: string;
}

// ftu --> first-time-user
const FtuQrCode = (props: FtuQrCodeProps) => {
  return (
    <NoPaddingFlexColumnContainer className={classes['ftu-qr-code-container']}>
      <p>{props.title}</p>
      <QRCode
        bgColor='#e9eaea'
        size={127}
        renderAs='svg'
        value={props.qrcodeData}
      />
    </NoPaddingFlexColumnContainer>
  );
};

export default FtuQrCode;
