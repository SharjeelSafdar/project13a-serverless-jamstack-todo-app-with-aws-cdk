import React, { FC, useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { API } from "aws-amplify";

import NewTodo from "../newTodo";
import TodoItem from "../todoItem";
import { todos as getAllTodos } from "../../graphql/queries";
import { Todo, TodosQuery } from "../../graphql/API";

const TodosDashboard: FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = (await API.graphql({
          query: getAllTodos,
        })) as { data: TodosQuery };
        setTodos(response.data.todos);
        console.log("Todos: ", response);
      } catch (err) {
        console.log("Error creating new todo: ", JSON.stringify(err, null, 2));
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      {loading && <p>Loading...</p>}
      {!loading && todos && (
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
