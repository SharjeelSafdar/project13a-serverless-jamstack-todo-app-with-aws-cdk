import React, { FC } from "react";
import { Container, Box } from "@material-ui/core";

import NewTodo from "../newTodo";
import TodoItem from "../todoItem";
import { useGetAllTodosQuery } from "../../api";

const TodosDashboard: FC = () => {
  const { data, loading, error } = useGetAllTodosQuery();

  return (
    <Container maxWidth="sm">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && data && (
        <>
          <NewTodo />
          <Box marginTop={3}>
            {data.todos.length === 0 ? (
              <p>There are no tasks; enjoy. ;)</p>
            ) : (
              data.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default TodosDashboard;
