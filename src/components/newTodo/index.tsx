import React, { FC, useState } from "react";
import { Container, IconButton, TextField } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";

import { useTodosContext } from "../../context/todosContext";
import { useStyles } from "./styles";

const NewTodo: FC = () => {
  const classes = useStyles();
  const [newTodoContent, setNewTodoContent] = useState("");
  const { isBusy, createNewTodo } = useTodosContext();

  const createNewTodoHandler = () => {
    createNewTodo(newTodoContent);
    setNewTodoContent("");
  };

  return (
    <Container className={classes.container}>
      <TextField
        value={newTodoContent}
        onChange={e => setNewTodoContent(e.target.value)}
        onKeyPress={e => {
          if (e.key === "Enter") {
            createNewTodoHandler();
          }
        }}
        disabled={isBusy}
        variant="standard"
        label="Todo Content"
        fullWidth
      />
      <IconButton
        onClick={createNewTodoHandler}
        className={classes.addBtn}
        disabled={isBusy}
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
