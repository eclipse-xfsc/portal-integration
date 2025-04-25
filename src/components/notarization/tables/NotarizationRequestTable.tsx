import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../store/app-context';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import { NOTARIZATION_REQUEST_HEADERS } from '../utils/Notarization-config';
import useNotarizationRequestService from '../../../hooks/useNotarizationRequestService';
import { NOTARIZATION_REQUESTS } from '../utils/Notarization-data';
import { convertNotarizationRequestToTableBody } from '../utils/Notarization-converter';
import { NotarizationRequest } from '../utils/Notarization-model';
import NotarizationRequestEditModal from '../modal/NotarizationRequestEditModal';

interface NotarizationRequestTableProps {}

const NotarizationRequestTable = (props: NotarizationRequestTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<NotarizationRequest>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteNotarizationRequest }] = useNotarizationRequestService<NotarizationRequest[]>(setError);

  // TODO: Bring back commented code when BE is working
  // const [notarizationRequests, { load: loadNotarizationRequests }] = useNotarizationRequestService<NotarizationRequestItem[]>(setError);
  //
  // useEffect(() => {
  //   loadNotarizationRequests();
  // }, [loadNotarizationRequests]);
  const notarizationRequests = NOTARIZATION_REQUESTS;

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => {
    console.log('TODO: Save Request when Backend is ready');
    //loadNotarizationRequests();
  };

  const handleEditNotarizationRequestAction = (notarizationRequestId?: number | string) => {
    setShowEditWindow(true);
    setEditData(notarizationRequests!.find((item) => item.id === notarizationRequestId));
  };

  return (
    <>
      <NoPaddingFlexColumnContainer className='row-gap-1rem'>
        <h3 className='pt-4 pb-2'>{t('notarization.request-overview')}</h3>
        <GxfsTable
          headers={NOTARIZATION_REQUEST_HEADERS}
          body={convertNotarizationRequestToTableBody(notarizationRequests)}
          onEditClick={handleEditNotarizationRequestAction}
        />
        <NotarizationRequestEditModal
          show={showEditWindow}
          title={t('notarization.review-request')}
          data={editData as NotarizationRequest}
          handleSave={handleSave}
          handleClose={handleClose}
        />
      </NoPaddingFlexColumnContainer>
    </>
  );
};
export default NotarizationRequestTable;
