import React, { FC, useState } from "react";
import { Container, Box, IconButton, Typography } from "@material-ui/core";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import EditTodoModal from "../editTodoModal";
import { Todo } from "../../graphql/API";
import { useTodosContext } from "../../context/todosContext";
import { useStyles } from "./styles";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const { isBusy, toggleTodo, deleteTodoById } = useTodosContext();

  return (
    <Container className={classes.container}>
      <Box className={classes.toggleBtn}>
        <IconButton
          onClick={() => toggleTodo(todo.id, !todo.status)}
          disabled={isBusy}
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
          disabled={isBusy}
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
          onClick={() => deleteTodoById(todo.id)}
          disabled={isBusy}
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
