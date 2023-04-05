type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};


export enum Types {
  Load = 'LOAD_TODO_ITEMS',
  Add = 'ADD_NEW_TODO_ITEM',
  Update ='UPDATE_TODO_ITEM'
};


export type ItemPayload = {
  [Types.Load]: undefined;
  [Types.Add]: undefined;
  [Types.Update]: undefined;
};

export type ItemActions = ActionMap<ItemPayload>[keyof ActionMap<
  ItemPayload
>];