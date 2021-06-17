/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($content: String!) {
    createTodo(content: $content) {
      id
      content
      status
    }
  }
`;
export const editTodoContent = /* GraphQL */ `
  mutation EditTodoContent($id: ID!, $newContent: String!) {
    editTodoContent(id: $id, newContent: $newContent) {
      id
      content
      status
    }
  }
`;
export const toggleTodoStatus = /* GraphQL */ `
  mutation ToggleTodoStatus($id: ID!, $newStatus: Boolean!) {
    toggleTodoStatus(id: $id, newStatus: $newStatus) {
      id
      content
      status
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      content
      status
    }
  }
`;
