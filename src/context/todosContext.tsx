import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { API } from "aws-amplify";

import { todos as getAllTodosQuery } from "../graphql/queries";
import {
  createTodo,
  editTodoContent,
  toggleTodoStatus,
  deleteTodo,
} from "../graphql/mutations";
import {
  Todo,
  TodosQuery,
  CreateTodoMutation,
  CreateTodoMutationVariables,
  EditTodoContentMutation,
  EditTodoContentMutationVariables,
  ToggleTodoStatusMutation,
  ToggleTodoStatusMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
} from "../graphql/API";

type ContextType = {
  todos: Todo[];
  isFetchingTodos: boolean;
  isBusy: boolean;
  getAllTodos: () => void;
  createNewTodo: (content: string) => void;
  updateTodoContent: (id: string, newContent: string) => void;
  toggleTodo: (id: string, newStatus: boolean) => void;
  deleteTodoById: (id: string) => void;
};

const initialValues: ContextType = {
  todos: [],
  isFetchingTodos: false,
  isBusy: false,
  getAllTodos: () => {},
  createNewTodo: () => {},
  updateTodoContent: () => {},
  toggleTodo: () => {},
  deleteTodoById: () => {},
};

export const TodosContext = createContext<ContextType>(initialValues);

export const useTodosContext = () => useContext(TodosContext);

export const TodosProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState(initialValues.todos);
  const [isFetchingTodos, setIsFetchingTodos] = useState(
    initialValues.isFetchingTodos
  );
  const [isBusy, setIsBusy] = useState(initialValues.isBusy);

  const getAllTodos = async () => {
    setIsFetchingTodos(true);

    try {
      const response = (await API.graphql({
        query: getAllTodosQuery,
      })) as { data: TodosQuery };
      setTodos(response.data.todos);
    } catch (err) {
      console.log("Error fetching todo: ", JSON.stringify(err, null, 2));
    }

    setIsFetchingTodos(false);
  };

  const createNewTodo = async (content: string) => {
    setIsBusy(true);

    try {
      const variables: CreateTodoMutationVariables = { content };
      const response = (await API.graphql({
        query: createTodo,
        variables,
      })) as { data: CreateTodoMutation };
      setTodos(prev => [response.data.createTodo, ...prev]);
    } catch (err) {
      console.log("Error creating new todo: ", JSON.stringify(err, null, 2));
    }

    setIsBusy(false);
  };

  const updateTodoContent = async (id: string, newContent: string) => {
    setIsBusy(true);

    try {
      const variables: EditTodoContentMutationVariables = { id, newContent };
      const response = (await API.graphql({
        query: editTodoContent,
        variables,
      })) as { data: EditTodoContentMutation };

      setTodos(prev => {
        const todoIndex = prev.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
          prev[todoIndex].content = response.data.editTodoContent.content;
        }
        return prev;
      });
    } catch (err) {
      console.log("Error updating todo: ", err);
    }

    setIsBusy(false);
  };

  const toggleTodo = async (id: string, newStatus: boolean) => {
    setIsBusy(true);

    try {
      const variables: ToggleTodoStatusMutationVariables = { id, newStatus };
      const response = (await API.graphql({
        query: toggleTodoStatus,
        variables,
      })) as { data: ToggleTodoStatusMutation };

      setTodos(prev => {
        const todoIndex = prev.findIndex(
          todo => todo.id === response.data.toggleTodoStatus.id
        );
        if (todoIndex !== -1) {
          prev[todoIndex].status = response.data.toggleTodoStatus.status;
        }
        return prev;
      });
    } catch (err) {
      console.log("Error toggling the status of todo: ", err);
    }

    setIsBusy(false);
  };

  const deleteTodoById = async (id: string) => {
    setIsBusy(true);

    try {
      const variables: DeleteTodoMutationVariables = { id };
      const response = (await API.graphql({
        query: deleteTodo,
        variables,
      })) as { data: DeleteTodoMutation };

      setTodos(prev => {
        const remainingTodos = prev.filter(
          todo => todo.id !== response.data.deleteTodo.id
        );
        return remainingTodos;
      });
    } catch (err) {
      console.log("Error deleting the todo: ", err);
    }

    setIsBusy(false);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const value: ContextType = {
    ...initialValues,
    todos,
    isFetchingTodos,
    isBusy,
    getAllTodos,
    createNewTodo,
    updateTodoContent,
    toggleTodo,
    deleteTodoById,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
