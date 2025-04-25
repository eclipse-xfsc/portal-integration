import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import classes from './UI.module.scss';

interface GxfsTagsProps {
  label: string;
  value?: string[];
  className?: string;
}

const GxfsTags = (props: GxfsTagsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Stack className={`mb-1 ${props.className}`}>
        <div className='gxfs-font-dark-small-bold'>{props.label}</div>
        <Stack
          direction='horizontal'
          gap={2}
          className={`mt-1 mb-1 ${props.className}`}
        >
          {props.value?.map((tag, index) => (
            <span className={`${classes['tag']} gxfs-font-white-small-normal pl-1 pr-1`}>{props.value?.[index]}</span>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default GxfsTags;
