import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddNewButton from './AddNewButton';
import { NoPaddingFlexRowContainer } from './container';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import classes from './UI.module.scss';
import { ReactElement } from 'react';

export interface TableHeader {
  textKey: string;
  width?: string;
}

export interface TableBody {
  id?: number | string;
  data: Array<string | number | undefined>;
}

interface GxfsTableHeaderProps {
  headers: TableHeader[];
  ignoreEmptyHeader?: boolean;
  actionHeaderTitle?: string;
}

interface GxfsTableBodyProps {
  body?: TableBody[];
  bodyContent?: ReactElement;
  onEditClick?: (id?: number | string) => void;
  onDeleteClick?: (id?: number | string) => void;
}

interface GxfsTableFootProps extends GxfsTableHeaderProps {
  onAddClick?: () => void;
}

interface GxfsTableProps extends GxfsTableHeaderProps, GxfsTableBodyProps, GxfsTableFootProps {
  variant?: string;
}

const GxfsTable = (props: GxfsTableProps) => {
  return (
    <Table
      borderless
      hover
      responsive
      variant={props.variant}
    >
      <GxfsTableHeader {...props} />
      <GxfsTableBody {...props} />
      {props.onAddClick && <GxfsTableFoot {...props} />}
    </Table>
  );
};
export default GxfsTable;

export const GxfsTableHeader = (props: GxfsTableHeaderProps) => {
  const { t } = useTranslation();
  return (
    <>
      <thead>
        <tr>
          {props.headers.map((header, index) => (
            <th
              key={index}
              style={header.width ? { width: header.width } : {}}
            >
              {t(header.textKey)}
            </th>
          ))}
          {!props.ignoreEmptyHeader && (
            <th
              key={props.headers.length}
              className={classes['table-action-header']}
            />
          )}
        </tr>
      </thead>
    </>
  );
};

export const GxfsTableBody = (props: GxfsTableBodyProps) => {
  return (
    <>
      <tbody>
        {props.body?.map((item) => (
          <tr key={item.id}>
            {item.data.map((content, index) => (
              <td key={index}>{content}</td>
            ))}
            <td>
              <NoPaddingFlexRowContainer className={classes['table-buttons-container']}>
                {props.onEditClick && (
                  <EditButton editAction={() => props?.onEditClick && props.onEditClick(item.id)}></EditButton>
                )}
                {props.onDeleteClick && (
                  <DeleteButton
                    deleteAction={() => props?.onDeleteClick && props.onDeleteClick(item.id)}
                  ></DeleteButton>
                )}
              </NoPaddingFlexRowContainer>
            </td>
          </tr>
        ))}
        {props.bodyContent}
      </tbody>
    </>
  );
};

export const GxfsTableFoot = (props: GxfsTableFootProps) => {
  return (
    <>
      <tfoot>
        <tr>
          <td colSpan={props.headers.length + 1}>
            <AddNewButton addAction={() => props?.onAddClick && props.onAddClick()}></AddNewButton>
          </td>
        </tr>
      </tfoot>
    </>
  );
};
