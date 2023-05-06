import { Container } from "@mui/material";
import React from "react";
import { ItemProps } from "@/types/todo-item";
import Footer from "../footer/footer.component";
import TodoList from "../todo-list/todo-list.component";
import Header from "@/components/header/header.component";
import LogoutButton from "../../auth/logout/logout.item.component";

type StateProps = {
  data: Array<ItemProps>;
  activeItem: ItemProps | null;
  loading: boolean;
}

class TodoContainer extends React.Component<{}, StateProps> {
  render() {
    return (
      <Container maxWidth="xs">
        <Header title="Todos" />
        <TodoList />
        <Footer />
        <LogoutButton />
      </Container>
    );
  }
}

export default TodoContainer;
