import React, { FC, useState } from "react";
import { API } from "aws-amplify";
import {
  Modal,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { editTodoContent } from "../../graphql/mutations";
import {
  EditTodoContentMutation,
  EditTodoContentMutationVariables,
} from "../../graphql/API";
import { useStyles } from "./styles";

export interface EditTaskModalProps {
  modalStatus: boolean;
  closeModal: () => void;
  todoId: string;
  oldTodoContent: string;
}

const EditTodoModal: FC<EditTaskModalProps> = ({
  modalStatus,
  closeModal,
  todoId,
  oldTodoContent,
}) => {
  const classes = useStyles();
  const [newTodoContent, setNewTodoContent] = useState(oldTodoContent);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (todoContent: string) => {
    let error = "";
    if (todoContent.trim().length === 0) {
      error = "Should not be empty.";
      setIsError(true);
    } else {
      setIsError(false);
    }
    setErrorMessage(error);
    return error;
  };
  const validateOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    validate(newContent);
    setNewTodoContent(newContent);
  };
  const editTodoHandler = async () => {
    setLoading(true);

    const error = validate(newTodoContent);
    if (error === "") {
      try {
        const variables: EditTodoContentMutationVariables = {
          id: todoId,
          newContent: newTodoContent,
        };
        const response = (await API.graphql({
          query: editTodoContent,
          variables,
        })) as { data: EditTodoContentMutation };
        console.log("Updated Todo: ", response);
        closeModal();
      } catch (err) {
        console.log("Error updating todo: ", err);
      }
    }

    setLoading(false);
  };

  return (
    <Modal open={modalStatus} onClose={closeModal}>
      <Paper elevation={3} className={classes.modal}>
        <Typography variant="h5" component="h2">
          Edit Todo
        </Typography>
        <Box marginTop={3} marginBottom={3}>
          <TextField
            value={newTodoContent}
            onChange={validateOnChange}
            error={isError}
            helperText={errorMessage}
            disabled={loading}
            onKeyPress={e => {
              if (e.key === "Enter") {
                editTodoHandler();
              }
            }}
            variant="outlined"
            label="New Task"
            fullWidth
            autoFocus
          />
        </Box>
        <Button
          onClick={editTodoHandler}
          disabled={loading}
          startIcon={loading ? <CircularProgress size="1rem" /> : undefined}
          variant="contained"
          color="primary"
          fullWidth
        >
          {loading ? "Updating Todo" : "Update Todo"}
        </Button>
      </Paper>
    </Modal>
  );
};

export default EditTodoModal;
