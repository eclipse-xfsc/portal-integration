import { ContentContainer } from '../ui/container';
import Articles from './Articles';
import NewsCarousel from './NewsCarousel';
import StaticContent from './StaticContent';
import WelcomeText from './WelcomeText';

const Landing = () => {
  return (
    <ContentContainer>
      <NewsCarousel />
      <WelcomeText />
      <StaticContent />
      <Articles />
    </ContentContainer>
  );
};

export default Landing;
