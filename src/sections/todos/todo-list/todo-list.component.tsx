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
import { SnackbarCloseReason } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type Props = {}

const TodoList = ({ }: Props) => {
  const { data, loading, activeItem } = useAppSelector(state => state.todo);
  const { listTodos, sortedData } = actionsTodo()
  const dispatch = useAppDispatch();
  const { errorSnackbar, message, typeAlert } = useAppSelector(state => state.auth);

  listTodos()

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    dispatch(errorAlert(false));
  };

  const renderNoDataMessage = () => {
    if (!loading && data.length === 0) {
      return <div className="noItem">Error: No items</div>;
    }
    return null;
  }

  return (
    <React.Fragment>
      {loading &&
        <Box textAlign="center">
          <CircularProgress size={40} />
        </Box>
      }
      <TransitionGroup component={null}>
        {sortedData(data).map((item: ItemProps) => (
          <CSSTransition key={item.id} classNames="item" timeout={300}>
            <div className="item">
              {activeItem?.id === item.id ? (
                <TodoItemEdit item={item} />
              ) : (
                <TodoItem item={item} />
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {renderNoDataMessage()}
      <ErrorSnackbar
        open={errorSnackbar}
        message={message}
        handleCloseSnackbar={handleCloseSnackbar}
        typeAlert={typeAlert}
      />
    </React.Fragment>
  );
};

export default TodoList;
