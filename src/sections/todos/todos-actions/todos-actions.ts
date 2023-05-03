import { deleteTodo } from "@/slices/todos/todoSlice";
import { useAppDispatch } from "@/store/store";
import { ItemProps } from "@/types/todo-item";
import { Types } from "@/reducer/actions";


export const actionsTodo = () => {
    const dispatch = useAppDispatch();

    const selectionItem = (item: ItemProps) => {
        dispatch({ type: Types.Select, payload: item.id });
    }

    const removeTodo = (item: ItemProps) => {
        dispatch(deleteTodo(item));
    }

    return { removeTodo, selectionItem }
}