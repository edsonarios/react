
import React from "react";
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { DoneStatus, InProgressStatus, StatusContainer } from "./todo-item.status.styles";
import { actionsTodo } from "../todos-actions/todos-actions";

type Props = {
  item: ItemProps;
}

const TodoItemStatus = ({ item }: Props) => {
  const { editStatusTodo } = actionsTodo()

  return (
    <StatusContainer onClick={() => editStatusTodo(item)} title="Update Status">
      {item.status === ItemStatus.IN_PROGRESS ? <InProgressStatus /> : <DoneStatus />}
    </StatusContainer>
  );
}

export default TodoItemStatus;
