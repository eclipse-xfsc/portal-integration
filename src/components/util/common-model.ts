export interface Identifiable {
  id?: number | string;
}

export interface AbstractEntity extends Identifiable {
  rowversion?: number;
}
export enum GxfsTextMode {
  SMALL = 'SMALL', // 18px
  BOLD_SMALL = 'BOLD_SMALL', // 18px with bold label
  FIELD_MIDSMALL = 'FIELD_MIDSMALL', // 19px
  FIELD_BOLD_MIDSMALL = 'FIELD_BOLD_MIDSMALL', // 19px with bold label
  MEDIUM = 'MEDIUM', // 20px
}
