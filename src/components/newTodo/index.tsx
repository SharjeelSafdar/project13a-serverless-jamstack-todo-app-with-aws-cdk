import React, { FC, useState } from "react";
import { API } from "aws-amplify";
import { Container, IconButton, TextField } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";

import { createTodo } from "../../graphql/mutations";
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
} from "../../graphql/API";
import { useStyles } from "./styles";

const NewTodo: FC = () => {
  const classes = useStyles();
  const [newTodoContent, setNewTodoContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewTodoAddition = async () => {
    setLoading(true);

    try {
      const variables: CreateTodoMutationVariables = {
        content: newTodoContent,
      };
      const response = (await API.graphql({
        query: createTodo,
        variables,
      })) as { data: CreateTodoMutation };
      console.log("New todo added: ", response);
    } catch (err) {
      console.log("Error creating new todo: ", JSON.stringify(err, null, 2));
    }
    setNewTodoContent("");
    setLoading(false);
  };

  return (
    <Container className={classes.container}>
      <TextField
        value={newTodoContent}
        onChange={e => setNewTodoContent(e.target.value)}
        onKeyPress={e => {
          if (e.key === "Enter") {
            handleNewTodoAddition();
          }
        }}
        disabled={loading}
        variant="standard"
        label="Todo Content"
        fullWidth
      />
      <IconButton
        onClick={handleNewTodoAddition}
        className={classes.addBtn}
        disabled={loading}
        title="Add new todo."
        color="primary"
        aria-label="add"
      >
        <FaPlus />
      </IconButton>
    </Container>
  );
};

export default NewTodo;
