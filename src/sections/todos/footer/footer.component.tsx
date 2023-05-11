import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
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
      {addingItem && (
        <Box display="flex" alignItems="center" paddingX={1}>
          <Box width={16}>
            <Typography variant="overline">
              <Skeleton variant="circular" />
            </Typography>
          </Box>
          <Box width="100%" paddingX={2.5}>
            <Typography variant="caption">
              <Skeleton />
            </Typography>
          </Box>
        </Box>
      )}
      <Wrapper onClick={handleClick} disabled={addingItem}>
        {addingItem ? <AddIconDisable /> : <AddIcon />}
        {addingItem ? <AddTextDisable>Create New Item</AddTextDisable> : <AddText>Create New Item</AddText>}
      </Wrapper>
    </>
  )
};

export default Footer;
