import React, { useEffect } from "react";
import TodoContainer from "@/sections/todos/todo-container/todo-container.component";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const TodosPage = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn, navigate]);

  // if (isLoggedIn) {
    return (
      <TodoContainer />
    );
  // } else {
  //   return null;
  // }
}

export default TodosPage;
