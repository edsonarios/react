import { ItemProps } from "@/types/todo-item";

export const extractErrorMessage = (data: string | { message: string }): string | undefined => {
    if (typeof data === 'object' && 'message' in data) {
        return data.message;
    } else if (typeof data === 'string') {
        return data;
    }
    return undefined;
};

export const effectTransition = (itemId: string) => {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        const updatedItem = JSON.parse(item.getAttribute("data-updated") as string) as ItemProps;
        if (updatedItem.id === itemId) {
            item.classList.add("item-updating");
            setTimeout(() => {
                item.classList.remove("item-updating");
            }, 300);
        }
    });
}
