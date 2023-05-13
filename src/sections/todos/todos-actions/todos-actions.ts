import { deleteTodo, fetchTodos, editTodo } from "@/slices/todos/todoSlice";
import { useAppDispatch } from "@/store/store";
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { useEffect, useMemo } from "react";
import { todoActions } from "@/slices/todos/todoSlice";
import { effectTransition } from "@/utils/utils";

export const actionsTodo = () => {
    const dispatch = useAppDispatch();

    const onOffItem = (item: ItemProps | null) => {
        dispatch(todoActions.onOffItem(item));
    }

    const editDescriptionTodo = (item: ItemProps, description: string) => {
        onOffItem(null);
        effectTransition(item.id)
        const itemtoEdited: ItemProps = {
            id: item.id,
            description: description,
            status: item.status,
        };
        dispatch(editTodo({ itemtoEdited, item }));
    };

    const removeTodo = (item: ItemProps) => {
        dispatch(deleteTodo(item));
    }

    const listTodos = () => {
        useEffect(() => {
            dispatch(fetchTodos(''));
        }, []);
    }

    const editStatusTodo = (item: ItemProps) => {
        effectTransition(item.id)
        const itemtoEdited: ItemProps = {
            id: item.id,
            description: item.description,
            status: item.status === ItemStatus.IN_PROGRESS ? ItemStatus.DONE : ItemStatus.IN_PROGRESS
        };
        dispatch(editTodo({ itemtoEdited, item }));
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
