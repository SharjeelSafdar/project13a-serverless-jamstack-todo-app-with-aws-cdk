import React, { FC, useState } from "react";
import { API } from "aws-amplify";
import { Container, Box, IconButton, Typography } from "@material-ui/core";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import EditTodoModal from "../editTodoModal";
import {
  Todo,
  ToggleTodoStatusMutation,
  ToggleTodoStatusMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
} from "../../graphql/API";
import { toggleTodoStatus, deleteTodo } from "../../graphql/mutations";
import { useStyles } from "./styles";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const toggleTodoStatusHandler = async () => {
    setLoading(true);

    try {
      const variables: ToggleTodoStatusMutationVariables = {
        id: todo.id,
        newStatus: !todo.status,
      };
      const response = (await API.graphql({
        query: toggleTodoStatus,
        variables,
      })) as { data: ToggleTodoStatusMutation };
      console.log("Toggled Todo: ", response);
    } catch (err) {
      console.log("Error toggling the status of todo: ", err);
    }

    setLoading(false);
  };

  const deleteTodoHandler = async () => {
    setLoading(true);

    try {
      const variables: DeleteTodoMutationVariables = {
        id: todo.id,
      };
      const response = (await API.graphql({
        query: deleteTodo,
        variables,
      })) as { data: DeleteTodoMutation };
      console.log("Todo Deleted: ", response);
    } catch (err) {
      console.log("Error deleting the todo: ", err);
    }

    setLoading(false);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.toggleBtn}>
        <IconButton
          onClick={toggleTodoStatusHandler}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
