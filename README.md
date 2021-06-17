<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Project 13A: Serverless JAMstack Todo App with Gatsby, TypeScript, AppSync, DynamoDB, Cognito, CloudFront and AWS CDK
</h1>

### Link to Web App

The web app has been deployed to AWS CloudFront, and can be accessed [here](https://d3nv2ml46a9t01.cloudfront.net/). The backend code is available [here](https://github.com/SharjeelSafdar/project13a-todo-app-backend-with-aws-cdk).

### Features

The following are some of the features of this project:

- Email authentication with [AWS Cognito User Pool](https://aws.amazon.com/cognito/)
- A dashboard for a user to manage his/her todos
- Fetches and displays the todos of the logged in user only
- Possible interactions with todos: create a new todo, update an existing todo, delete a todo and toggle an existing todo's status
- A [DynamoDB](https://aws.amazon.com/dynamodb/) table to store todos
- A GraphQL API with [AWS AppSync](https://aws.amazon.com/appsync/) to interact with DynamoDB
- Demonstrates CRUD operations using DynamoDB through the GraphQL API
- Uses [Amplify](https://amplify.com/) for GraphQL queries and mutations, and User Pool Auth
- Bootstrapped with [GatsbyJS](https://www.gatsbyjs.com/)
- Additionally, includes TypeScript support for gatsby-config, gatsby-node, gatsby-browser and gatsby-ssr files
- Site hosted on [AWS CloudFront](https://aws.amazon.com/cloudfront/)
- CI/CD with [AWS Code Pipeline](https://aws.amazon.com/codepipeline/) and [AWS Code Build](https://aws.amazon.com/codebuild/)
- Completely typed with Typescript
- Completely interactive and responsive design with [Material-UI](https://material-ui.com/) components.
