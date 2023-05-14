import { ItemProps, ItemStatus } from "@/types/todo-item";

export const staticData: ItemProps[] = [
  {
    description: "Item 1",
    id: '1',
    status: ItemStatus.IN_PROGRESS
  },
  {
    description: "Item 2",
    id: '2',
    status: ItemStatus.DONE
  },
  {
    description: "Item 3",
    id: '3',
    status: ItemStatus.IN_PROGRESS
  }
];
