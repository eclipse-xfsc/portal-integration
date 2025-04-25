import { Stack } from 'react-bootstrap';
import React from 'react';
import classes from './UI.module.scss';
import documentIcon from '../../icons/text-file_outline.svg';

interface GxfsDocumentLinkProps {
  text?: string;
  label?: string;
  link?: string;
  className?: string;
}

const GxfsDocumentLink = (props: GxfsDocumentLinkProps) => {
  return (
    <Stack className={`mb-1 ${props.className}`}>
      <div className='gxfs-font-dark-medium'>{props.label}</div>
      <a
        href={props.link}
        target='_blank'
        className={`gxfs-font-dark-medium-normal ${classes['document-link']}`}
      >
        <img
          src={documentIcon}
          alt='Download document'
          className={`${classes['document-image']} ${classes['button-action-image']}`}
        />
        {props.text}
      </a>
    </Stack>
  );
};

export default GxfsDocumentLink;
