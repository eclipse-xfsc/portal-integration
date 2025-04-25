import { Button, Col, Row } from 'react-bootstrap';
import { LineContainer } from '../container';
import classes from './role.module.scss';

interface RoleButtonProps {
  onClick: () => void;
  title: string;
}

interface RoleButtonRowProps {
  containerClassName?: string;
  leftBtn: RoleButtonProps;
  rightBtn: RoleButtonProps;
  sentBtnDisabled?: boolean;
}

const RoleButtonRow = ({ leftBtn, rightBtn, containerClassName, sentBtnDisabled }: RoleButtonRowProps) => {
  return (
    <LineContainer className={containerClassName ? containerClassName : ''}>
      <Row className={classes['role-row']}>
        <Col
          sm={6}
          md={{ span: 3, offset: 3 }}
        >
          <Button
            variant='secondary'
            onClick={leftBtn.onClick}
          >
            {leftBtn.title}
          </Button>
        </Col>
        <Col
          sm={6}
          md={3}
        >
          <Button
            variant='secondary'
            onClick={rightBtn.onClick}
            disabled={sentBtnDisabled}
          >
            {rightBtn.title}
          </Button>
        </Col>
      </Row>
    </LineContainer>
  );
};

export default RoleButtonRow;
