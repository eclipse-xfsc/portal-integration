import GxfsArrowButton, { GxfsArrowDirection } from './GxfsArrowButton';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';

interface GxfsPaginatorProps {}

const GxfsPaginator = (props: GxfsPaginatorProps) => {
  const [pageNumber, setPageNumber] = useState(3);
  const pageCount = 23;
  const pagesToDisplay = [1, 2, 3, 4, 5, '...', 21, 22];

  return (
    <>
      <Stack direction='horizontal'>
        <GxfsArrowButton
          direction={GxfsArrowDirection.LEFT}
          clickAction={() => setPageNumber(Math.max(pageNumber - 1, 1))}
        ></GxfsArrowButton>
        {pagesToDisplay.map((pageText) => {
          const fontClass = pageText === pageNumber ? 'gxfs-font-primary-medium' : 'gxfs-font-dark-medium-normal';
          return (
            <div
              key={pageText}
              className={`ml-2 ${fontClass}`}
            >
              {pageText}
            </div>
          );
        })}
        <GxfsArrowButton
          className='ml-2'
          direction={GxfsArrowDirection.RIGHT}
          clickAction={() => setPageNumber(Math.min(pageNumber + 1, pageCount))}
        ></GxfsArrowButton>
      </Stack>
    </>
  );
};

export default GxfsPaginator;
