/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id: string,
  content: string,
  status: boolean,
};

export type CreateTodoMutationVariables = {
  content: string,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    content: string,
    status: boolean,
  },
};

export type EditTodoContentMutationVariables = {
  id: string,
  newContent: string,
};

export type EditTodoContentMutation = {
  editTodoContent:  {
    __typename: "Todo",
    id: string,
    content: string,
    status: boolean,
  },
};

export type ToggleTodoStatusMutationVariables = {
  id: string,
  newStatus: boolean,
};

export type ToggleTodoStatusMutation = {
  toggleTodoStatus:  {
    __typename: "Todo",
    id: string,
    content: string,
    status: boolean,
  },
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    content: string,
    status: boolean,
  },
};

export type TodosQuery = {
  todos:  Array< {
    __typename: "Todo",
    id: string,
    content: string,
    status: boolean,
  } >,
};
