import React, { useState } from "react";
import TodoItemStatus from "../todo-item-status/todo-item-status.component";
import { CustomTextField, Wrapper } from "./todo-item-edit.styles";
import { useDispatch } from 'react-redux';
import { ItemProps } from "@/types/todo-item";
import { Types } from "@/reducer/actions";

type Props = {
  item: ItemProps;
}

const TodoItemEdit = ({ item }: Props) => {
  const [value, setValue] = useState(item.description);
  const dispatch = useDispatch();

  const handleUpdateItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: Types.Update,
      payload: {
        id: item.id, dataUpdated: { description: value }
      }
    });
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <Wrapper>
      <TodoItemStatus item={item} />
      <form style={{ display: 'inline' }} onSubmit={handleUpdateItem}>
        <CustomTextField
          id={`todo-item-${item.id}`}
          variant="outlined"
          size="small"
          autoFocus
          value={value}
          onChange={handleChangeDescription}
        />
      </form>
    </Wrapper>
  );
}

export default TodoItemEdit;

