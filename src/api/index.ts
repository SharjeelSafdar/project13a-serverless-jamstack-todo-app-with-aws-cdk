import {
  gql,
  useQuery,
  QueryHookOptions,
  useMutation,
  MutationHookOptions,
} from "@apollo/client";
import { Todo } from "../types/types";

// **************************************
// Get All Todos Query
// **************************************
export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      id
      content
      status
    }
  }
`;

export type GetAllTodosQueryResponse = {
  todos: Todo[];
};

export type GetAllTodosQueryVariables = { [key: string]: never };

export const useGetAllTodosQuery = (
  baseOptions?: QueryHookOptions<
    GetAllTodosQueryResponse,
    GetAllTodosQueryVariables
  >
) => {
  return useQuery<GetAllTodosQueryResponse, GetAllTodosQueryVariables>(
    GET_ALL_TODOS,
    baseOptions
  );
};

// **************************************
// Create New Todo Mutation
// **************************************
export const CREATE_NEW_TODO = gql`
  mutation CreateNewTodo($content: String!) {
    createTodo(content: $content) {
      id
      content
      status
    }
  }
`;

export type CreateNewTodoMutationResponse = {
  createTodo: Todo;
};

export type CreateNewTodoMutationVariables = {
  content: string;
};

export const useCreateTodoMutation = (
  baseOptions?: MutationHookOptions<
    CreateNewTodoMutationResponse,
    CreateNewTodoMutationVariables
  >
) => {
  return useMutation<
    CreateNewTodoMutationResponse,
    CreateNewTodoMutationVariables
  >(CREATE_NEW_TODO, {
    update: (cache, { data }) => {
      if (data) {
        const existingTodos = cache.readQuery<GetAllTodosQueryResponse>({
          query: GET_ALL_TODOS,
        }) || { todos: [] };

        cache.writeQuery({
          data: { todos: [...existingTodos.todos, data.createTodo] },
          query: GET_ALL_TODOS,
        });
      }
    },
    ...baseOptions,
  });
};

// **************************************
// Update Todo Content Mutation
// **************************************
export const UPDATE_TODO_CONTENT = gql`
  mutation UpdateTodoContent($id: ID!, $newContent: String!) {
    editTodoContent(id: $id, newContent: $newContent) {
      id
      content
      status
    }
  }
`;

export type UpdateTodoContentMutationResponse = {
  editTodoContent: Todo;
};

export type UpdateTodoContentMutationVariables = {
  id: string;
  newContent: string;
};

export const useUpdateTodoContentMutation = (
  baseOptions?: MutationHookOptions<
    UpdateTodoContentMutationResponse,
    UpdateTodoContentMutationVariables
  >
) => {
  return useMutation<
    UpdateTodoContentMutationResponse,
    UpdateTodoContentMutationVariables
  >(UPDATE_TODO_CONTENT, baseOptions);
};

// **************************************
// Toggle Todo Status Mutation
// **************************************
export const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: ID!, $newStatus: Boolean!) {
    toggleTodoStatus(id: $id, newStatus: $newStatus) {
      id
      content
      status
    }
  }
`;

export type ToggleTodoStatusMutationResponse = {
  toggleTodoStatus: Todo;
};

export type ToggleTodoStatusMutationVariables = {
  id: string;
  newStatus: boolean;
};

export const useToggleTodoStatusMutation = (
  baseOptions?: MutationHookOptions<
    ToggleTodoStatusMutationResponse,
    ToggleTodoStatusMutationVariables
  >
) => {
  return useMutation<
    ToggleTodoStatusMutationResponse,
    ToggleTodoStatusMutationVariables
  >(TOGGLE_TODO_STATUS, baseOptions);
};

// **************************************
// Delete Todo Mutation
// **************************************
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      content
      status
    }
  }
`;

export type DeleteTodoMutationResponse = {
  deleteTodo: Todo;
};

export type DeleteTodoMutationVariables = {
  id: string;
};

export const useDeleteTodoMutation = (
  baseOptions?: MutationHookOptions<
    DeleteTodoMutationResponse,
    DeleteTodoMutationVariables
  >
) => {
  return useMutation<DeleteTodoMutationResponse, DeleteTodoMutationVariables>(
    DELETE_TODO,
    {
      update: (cache, { data }) => {
        if (data) {
          const existingTodos = cache.readQuery<GetAllTodosQueryResponse>({
            query: GET_ALL_TODOS,
          }) || { todos: [] };

          const remainingTodos = existingTodos.todos.filter(
            todo => todo.id !== data.deleteTodo.id
          );

          cache.writeQuery({
            data: {
              todos: [...remainingTodos],
            },
            query: GET_ALL_TODOS,
          });
        }
      },
      ...baseOptions,
    }
  );
};
