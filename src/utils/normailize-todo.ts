import { ItemPropsMongo, ItemStatus } from "@/types/todo-item";

export const normalizeTodoData = (data: ItemPropsMongo[]) => data.map(item => ({ ...item, id: item._id, status: item.status.toUpperCase() === ItemStatus.DONE ? ItemStatus.DONE : ItemStatus.IN_PROGRESS }));

export const normalizeData = (item: ItemPropsMongo) => {
    return { ...item, id: item._id, status: item.status.toUpperCase() === ItemStatus.DONE ? ItemStatus.DONE : ItemStatus.IN_PROGRESS };
};
