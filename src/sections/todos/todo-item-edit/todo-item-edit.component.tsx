import React, { useState } from "react";
import TodoItemStatus from "../todo-item-status/todo-item-status.component";
import { CustomTextField, Wrapper } from "./todo-item-edit.styles";
import { ItemProps } from "@/types/todo-item";
import { actionsTodo } from "../todos-actions/todos-actions";
import { useAppSelector } from "@/store/store";

type Props = {
  item: ItemProps;
}

const TodoItemEdit = ({ item }: Props) => {
  const [value, setValue] = useState(item.description);
  const { onOffItem, editDescriptionTodo } = actionsTodo()
  const { selectOnFocus } = useAppSelector(state => state.todo);

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (selectOnFocus) {
      event.target.select();
    }
  };

  return (
    <Wrapper>
      <TodoItemStatus item={item} />
      <form style={{ display: 'inline' }} onSubmit={() => editDescriptionTodo(item, value)}>
        <CustomTextField
          id={`todo-item-${item.id}`}
          variant="outlined"
          size="small"
          autoFocus
          value={value}
          onChange={handleChangeDescription}
          onBlur={() => onOffItem(null)}
          onFocus={handleFocus}
        />
      </form>
    </Wrapper>
  );
}

export default TodoItemEdit;
