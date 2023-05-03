export enum ItemStatus {
  IN_PROGRESS = 'inProgress',
  DONE = 'DONE'
}

export type ItemProps = {
  id: string;
  description: string;
  status: ItemStatus;
};

export type ItemPropsMongo = {
  _id: string;
  description: string;
  status: ItemStatus;
};

export type ItemEditProps = {
  id: string;
  body: ItemProps;
};
