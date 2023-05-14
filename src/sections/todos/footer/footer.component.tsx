import { Box } from "@mui/system";
import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "@/slices/todos/todoSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ItemStatus } from "@/types/todo-item";
import { AddIcon, AddIconDisable, AddText, AddTextDisable, Wrapper } from "./footer.styles";

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addingItem } = useSelector((state: RootState) => state.todo);

  const handleClick = async () => {
    try {
      dispatch(postTodo({ description: 'new Item', status: ItemStatus.IN_PROGRESS }));
    } catch (error: any) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <>
      <Wrapper onClick={handleClick} disabled={addingItem}>
        {addingItem ? <AddIconDisable /> : <AddIcon />}
        {addingItem ? <AddTextDisable>Create New Item</AddTextDisable> : <AddText>Create New Item</AddText>}
        {addingItem ? <CircularProgress size={25} /> : null}
      </Wrapper>
    </>
  )
};

export default Footer;
