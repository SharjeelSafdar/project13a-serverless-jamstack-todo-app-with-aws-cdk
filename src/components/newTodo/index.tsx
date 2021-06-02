import React, { FC, useState } from "react";
import { Container, IconButton, TextField } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";

import { useStyles } from "./styles";
import { useCreateTodoMutation } from "../../api";

const NewTodo: FC = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [createTodo, { loading }] = useCreateTodoMutation();

  const handleNewTodoAddition = async () => {
    const res = await createTodo({ variables: { content: text } });
    console.log("New todo added: ", res?.data);
    setText("");
  };

  return (
    <Container className={classes.container}>
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
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
