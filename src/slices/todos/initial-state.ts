import { ItemProps } from "@/types/todo-item";

export type StateProps = {
  data: ItemProps[];
  activeItem: ItemProps | null;
  selectOnFocus?: boolean
  loading: boolean;
  addingItem: boolean;
}

export const initialState: StateProps = {
  data: [],
  activeItem: null,
  selectOnFocus: false,
  loading: false,
  addingItem: false
};
