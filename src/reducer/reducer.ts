import { staticData } from "@/data/items";
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { Types } from "./actions";
import { StateProps } from "./initial-state";

const reducer = (state: StateProps, action: any) => {
  // handle logic of the application here
  switch (action.type) {
    case Types.Load: {
      return {
        ...state,
        data: staticData
      };
    }
    case Types.Add: {
      const newItem: ItemProps = {
        id: String(state.data.length + 1),
        description: 'New Item',
        status: ItemStatus.IN_PROGRESS
      };
      return {
        ...state,
        data: [...state.data, newItem],
      }
    }
    case Types.Update: {
      const selectItemIndex = state.data.findIndex(item => item.id === action.payload.id);
      return {
        ...state,
        data: [
          ...state.data.slice(0, selectItemIndex),
          { ...state.data[selectItemIndex], ...action.payload.dataUpdated },
          ...state.data.slice(selectItemIndex + 1),
        ],
        activeItem: null,
      };
    }
    case Types.Select: {
      const selectItemIndex = state.data.findIndex(item => item.id === action.payload);
      return {
        ...state,
        activeItem: state.data[selectItemIndex]
      };
    }
    case Types.Delete: {
      const selectItemIndex = state.data.findIndex(item => item.id === action.payload);
      return {
        ...state,
        data: [
          ...state.data.slice(0, selectItemIndex),
          ...state.data.slice(selectItemIndex + 1),
        ],
      };
    }
    default: return state;
  }
}

export default reducer;
