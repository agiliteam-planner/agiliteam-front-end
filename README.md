# AgiliTeam Planner front-end

## Introduction

AgiliTeam is a project management app based on Agile management style. It allows a team of developers to add tasks, mark progress and communicate issues.

Inspired by kanban boards, AgiliTeam is designed to help teams visualize the status of the project at a glance, with each task name, owner, and priority clearly visible. Tasks can be easily created, staged, assigned, and updated.

This repository is the backend part of a full stack application. Please see the [AgiliTeam Frontend repository](https://github.com/agiliteam-planner/agiliteam-back-end) for information about the backend.

AgiliTeam was developed by Elad Sadeh, Oscar Sanchez de Zulueta, and Kurt Shields as part of a General Assembly SEIR1115 cohort project.

## Deployed application

https://agiliteam.netlify.app/

## How to use the AgiliTeam

AgiliTeam implements the Kanaban method to visualize the project workflow. Tasks are moving through the following stages:

- To Do: Also known as "Backlog" is a list of tasks that need to be done but havn't started yet. Generally, and by default, new tasks are added to this stage.
- In Progress: tasks that are being worked on.
- In Review: Tasks that are done and are waiting for review.
- Done: completed tasks.

### Main View
The Main (home) view show all the tasks sorted into the appropriate stages.
(future development: ability to filter and sort tasks)

![Screen Shot 2022-01-31 at 1 14 08 PM](https://user-images.githubusercontent.com/93807931/151850324-b7fbf870-3ab6-47e2-84e2-4f53a75ff9ce.png)

- Click on **New Task** to add a new task.
- Click on any existing task to see more details and edit or delete the task.

### Task View

When clicking on 'New Task' or an existing task, the task view will be oppened, allowing the user to add or change the following:

#### New Task
![Screen Shot 2022-01-31 at 1 25 30 PM](https://user-images.githubusercontent.com/93807931/151851314-51b03038-aec4-48e0-a8e6-16966619e371.png)

#### Edit Task
![Screen Shot 2022-01-31 at 1 20 27 PM](https://user-images.githubusercontent.com/93807931/151850535-e2eda0d1-c47e-40c7-99a4-ffeb389de782.png)

- Task title: This is the only required field. Save/Update will be disabled if the title is empty.
- Due Date (optional, default to none): set the due date for completing the task
- Stage (default to 'To Do'): Set the stage the task belong too. Normally, it will be the 'To Do' stage.
- Priority (default to 'Normal'): Can be set to High, Normal, or Low.
- Owner (optional): Set the owner of the task from a list of users.
- Description (optional): Additional information about the task
- Comments (optional): Add comments to communicate with the task owner
- Click 'Save', 'Update', 'Delete', or 'Cancel'

### Login

Adding or editing a task  is disabled if a user is not logged-in. To login, either click on the alert at the bottom of the task view, or click 'Login' at the navigation menu.

### Settings

The settings view allow the user to add, remove, and edit the team users.

- Click on existing user to edit the user details or delete the user.

### About

Information about the application.

## API

The application use an API developed by the same team. The API is deployed at https://arcane-plateau-58687.herokuapp.com/. More information can be found at [AgiliTeam Frontend repository](https://github.com/agiliteam-planner/agiliteam-back-end)

## Technologies Used

- JavaScript
- React
  - React Router
- CSS

## Instalation

You are welcome to copy this repository.

- Fork and clone the repository
- go to the new directory (`cd agiliteam-front-end`)
- To set the url of the API, use the variable REACT_APP_BACKEND_URL
  add `REACT_APP_BACKEND_URL="your-api-url"` to your `.env.local` file.
- run `npm install` to install dependencies.
- run `npm start` to run the app on local server

## Contribution
