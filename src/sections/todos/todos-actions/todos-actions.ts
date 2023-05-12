import { deleteTodo, fetchTodos, editTodo } from "@/slices/todos/todoSlice";
import { useAppDispatch } from "@/store/store";
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { useEffect, useMemo } from "react";
import { todoActions } from "@/slices/todos/todoSlice";
import Cookies from "js-cookie";

export const actionsTodo = () => {
    const dispatch = useAppDispatch();

    const onOffItem = (item: ItemProps | null) => {
        dispatch(todoActions.onOffItem(item));
    }

    const editDescriptionTodo = (item: ItemProps, description: string) => {
        onOffItem(null);
        const itemtoEdit: ItemProps = {
            id: item.id,
            description: description,
            status: item.status,
        };
        dispatch(editTodo({ itemtoEdit, item }));
    };

    const removeTodo = (item: ItemProps) => {
        dispatch(deleteTodo(item));
    }

    const listTodos = () => {
        useEffect(() => {
            dispatch(fetchTodos({ searchParam: '', token: Cookies.get('token') as string }));
        }, []);
    }

    const editStatusTodo = (item: ItemProps) => {
        const itemtoEdit: ItemProps = {
            id: item.id,
            description: item.description,
            status: item.status === ItemStatus.IN_PROGRESS ? ItemStatus.DONE : ItemStatus.IN_PROGRESS
        };
        dispatch(editTodo({ itemtoEdit, item }));
    }

    const sortedData = (data: ItemProps[]) => useMemo(() => {
        const noDoneTodo = data.filter(item => item.status !== "DONE")
            .sort((a, b) => a.description.localeCompare(b.description));
        const doneTodo = data.filter(item => item.status === "DONE")
            .sort((a, b) => a.description.localeCompare(b.description));

        return noDoneTodo.concat(doneTodo);
    }, [data]);

    return { onOffItem, editDescriptionTodo, removeTodo, listTodos, editStatusTodo, sortedData }
}
