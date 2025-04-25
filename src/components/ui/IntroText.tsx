import { PropsWithChildren } from 'react';

export interface IntroTextProps {
  text: string;
  className?: string;
}

const IntroText = (props: PropsWithChildren<IntroTextProps>) => {
  return (
    <p
      className={`gxfs-font-dark-small-normal mb-2 ${props.className}`}
      dangerouslySetInnerHTML={{ __html: props.text }}
    />
  );
};

export default IntroText;
