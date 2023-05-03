import { deleteTodo, fetchTodos, editTodo } from "@/slices/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ItemEditPropsMongo, ItemProps, ItemPropsMongo, ItemStatus } from "@/types/todo-item";
import { Types } from "@/reducer/actions";
import { useEffect } from "react";


export const actionsTodo = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);

    const selectionItem = (item: ItemProps) => {
        console.log(item)
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

    const editStatusTodo = (item: ItemProps) => {
        console.log(item)
        dispatch(editTodo(
            {
                id: item.id,
                body: {
                    id: item.id,
                    description: item.description,
                    status: item.status === ItemStatus.IN_PROGRESS ? ItemStatus.DONE : ItemStatus.IN_PROGRESS
                },
            }));
    }



    return { removeTodo, selectionItem, listTodos, editStatusTodo }
}
