
import { ItemProps, ItemStatus } from "@/types/todo-item";
import { DoneStatus, InProgressStatus, StatusContainer } from "./todo-item.status.styles";
import { actionsTodo } from "../todos-actions/todos-actions";

type Props = {
  item: ItemProps;
}

const TodoItemStatus = ({ item }: Props) => {
  const { editStatusTodo } = actionsTodo()

  return (
    <div onClick={() => editStatusTodo(item)} title="Update Status"
    className={`${item.status === ItemStatus.IN_PROGRESS ? 'inProgress':'done'}`}>
      {/* {item.status === ItemStatus.IN_PROGRESS ? <InProgressStatus /> : <DoneStatus />} */}
    </div>
  );
}

export default TodoItemStatus;
