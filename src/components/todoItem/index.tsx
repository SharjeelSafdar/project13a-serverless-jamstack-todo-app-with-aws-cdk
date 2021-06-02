import React, { FC, useState } from "react";
import { Container, Box, IconButton, Typography } from "@material-ui/core";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import EditTodoModal from "../editTodoModal";
import { useToggleTodoStatusMutation, useDeleteTodoMutation } from "../../api";
import { useStyles } from "./styles";
import { Todo } from "../../types/types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [
    toggleTodoStatus,
    { loading: toggling },
  ] = useToggleTodoStatusMutation();
  const [deleteTodo, { loading: deleting }] = useDeleteTodoMutation();

  const toggleTodoStatusHandler = async () => {
    const res = await toggleTodoStatus({
      variables: { id: todo.id, newStatus: !todo.status },
    });
    console.log("Todo Status Toggled: ", res?.data);
  };

  const deleteTodoHandler = async () => {
    const res = await deleteTodo({ variables: { id: todo.id } });
    console.log("Todo Deleted", res?.data);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.toggleBtn}>
        <IconButton
          onClick={toggleTodoStatusHandler}
          disabled={toggling}
          title="Toggle status."
          size="small"
        >
          {todo.status ? (
            <BsCheckCircle color="#0f0" />
          ) : (
            <BsCircle color="#888" />
          )}
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body2">{todo.content}</Typography>
      </Box>
      <Box className={classes.editBtn}>
        <IconButton
          onClick={() => setShowEditTaskModal(true)}
          title="Edit todo."
          color="primary"
          size="small"
          aria-label="edit task"
        >
          <MdEdit />
        </IconButton>
        <EditTodoModal
          modalStatus={showEditTaskModal}
          closeModal={() => setShowEditTaskModal(false)}
          todoId={todo.id}
          oldTodoContent={todo.content}
        />
      </Box>
      <Box className={classes.deleteBtn}>
        <IconButton
          onClick={deleteTodoHandler}
          disabled={deleting}
          title="Delete todo."
          color="primary"
          size="small"
          aria-label="delete task"
        >
          <AiTwotoneDelete />
        </IconButton>
      </Box>
    </Container>
  );
};

export default TodoItem;
