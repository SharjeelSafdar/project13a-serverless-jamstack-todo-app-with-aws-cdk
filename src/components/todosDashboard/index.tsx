import React, { FC } from "react";
import { Container, Box } from "@material-ui/core";

import NewTodo from "../newTodo";
import TodoItem from "../todoItem";
import { useTodosContext } from "../../context/todosContext";

const TodosDashboard: FC = () => {
  const { todos, isFetchingTodos } = useTodosContext();

  return (
    <Container maxWidth="sm">
      {isFetchingTodos && <p>Loading...</p>}
      {!isFetchingTodos && todos && (
        <>
          <NewTodo />
          <Box marginTop={3}>
            {todos.length === 0 ? (
              <p>There are no tasks; enjoy. ;)</p>
            ) : (
              todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default TodosDashboard;
