import React from "react";
import TodoItemEdit from "../todo-item-edit/todo-item-edit.component";
import TodoItem from "../todo-item/todo.item.component";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ItemProps } from "@/types/todo-item";
import { actionsTodo } from "../todos-actions/todos-actions";
import { errorAlert } from "@/slices/auth/authSlice";
import ErrorSnackbar from "@/components/alert/error-snackbar";

type Props = {}

const TodoList = ({ }: Props) => {
  const { data, loading, activeItem } = useAppSelector(state => state.todo);
  const { listTodos } = actionsTodo()
  const dispatch = useAppDispatch();
  const { errorSnackbar, errorMessage } = useAppSelector(state => state.auth);
  listTodos()

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(errorAlert(false))
  };

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
      <ErrorSnackbar
        open={errorSnackbar}
        errorMessage={errorMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </React.Fragment>
  );
};

export default TodoList;
