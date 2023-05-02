import React, { useEffect } from "react";
import TodoItemEdit from "../todo-item-edit/todo-item-edit.component";
import TodoItem from "../todo-item/todo.item.component";
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTodos } from "@/slices/todos/todoSlice";
import { ItemProps } from "@/types/todo-item";

type Props = {}

const TodoList = ({ }: Props) => {
  const { data, loading, activeItem } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchTodos({ searchParam: '', token }));
  }, []);

  return (
    <React.Fragment>
      {loading &&
        <Box textAlign="center">
          <CircularProgress size={10} />
        </Box>
      }
      {data.map((item: ItemProps) => (
        <React.Fragment key={item.id}>
          {activeItem?.id === item.id ?
            <TodoItemEdit item={item} /> :
            <TodoItem item={item} />
          }
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default TodoList;
