import { deleteTodo, fetchTodos } from "@/slices/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ItemProps } from "@/types/todo-item";
import { Types } from "@/reducer/actions";
import { useEffect } from "react";


export const actionsTodo = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);

    const selectionItem = (item: ItemProps) => {
        dispatch({ type: Types.Select, payload: item.id });
    }

    const removeTodo = (item: ItemProps) => {
        dispatch(deleteTodo(item));
    }

    const listTodos = () => {
        useEffect(() => {
            dispatch(fetchTodos({ searchParam: '', token }));
        }, []);
    }

    return { removeTodo, selectionItem, listTodos }
}
