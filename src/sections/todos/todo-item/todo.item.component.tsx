import TodoItemStatus from "../todo-item-status/todo-item-status.component";
import { ButtonContainer, IconRemove, TodoDescription, Wrapper } from "./todo-item.styles";
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { actionsTodo } from "../todos-actions/todos-actions";

type Props = {
  item: ItemProps;
}

const TodoItem = ({ item }: Props) => {
  const { onOffItem, removeTodo } = actionsTodo()

  const { id, description, status } = item;

  return (
    <Wrapper>
      <TodoItemStatus item={item} />
      <TodoDescription
        style={{ textDecoration: status === ItemStatus.DONE ? 'line-through' : '' }}
        onClick={() => onOffItem(item)}
      >
        {description}
      </TodoDescription>
      <ButtonContainer onClick={() => removeTodo(item)} size="small" data-action='remove' title="Remove Todo">
        <IconRemove />
      </ButtonContainer>
    </Wrapper>
  );
}

export default TodoItem;
