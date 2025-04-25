import { Col, Container, Row } from 'react-bootstrap';
import GxfsNavDropdown from './GxfsNavDropdown';
import classes from './Header.module.scss';
import useSecurityService from '../../hooks/useSecurityService';

const NavigationBar = () => {
  const { menuItems } = useSecurityService();
  return (
    <>
      {menuItems && (
        <Container className={classes.navigation}>
          <Row className={classes['navigation-row']}>
            {menuItems.map((item) => {
              return (
                <Col
                  className={classes['navigation-col']}
                  key={item.id}
                  md='auto'
                >
                  <GxfsNavDropdown menuItem={item}></GxfsNavDropdown>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
};

export default NavigationBar;
