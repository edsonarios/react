
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { actionsTodo } from "../todos-actions/todos-actions";

type Props = {
  item: ItemProps;
}

const TodoItemStatus = ({ item }: Props) => {
  const { editStatusTodo } = actionsTodo()

  return (
    <div onClick={() => editStatusTodo(item)} title="Update Status"
      className={`${item.status === ItemStatus.IN_PROGRESS ? 'inProgress' : 'done'}`}>
    </div>
  );
}

export default TodoItemStatus;
