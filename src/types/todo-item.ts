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

export type fechTodosProps = {
  searchParam: string
  token: string
}

export type ItemEditProps = {
  id: string;
  body: ItemProps;
};

export type errorResponseProps = {
  status: string
  originalStatus: number
}

export type responseProps = {
  status: string;
  endpointName: string;
  isSuccess: boolean;
  isError: boolean;
  data: ItemPropsMongo | undefined;
  error: errorResponseProps;
}
