# Kanban Board

### What is kanban board

Kanban is work management system designed to help visualize work, limit work in progress and maximize efficiency (flow). Kan-Ban is Japanese word for visual signal. Learn more from the [wiki](https://en.wikipedia.org/wiki/Kanban_board) page.

## About this project

With this application user can easily sign up using existing Github account, and start creating projects. Every project has own dashboard and kanban board. After creating project, administrator can create tasks, invite other users to join the project and split up work.
This is project management application with goal to simplify workflow for teams and help them done work faster.

Start using 👉 [Kanban Board](https://kanban-board-899e2.web.app) application now!

## Goals of the project

Create a larger scale project without cloning existing project TypeScript along the way.

## Technologies used to build this project

1. React
2. TypeScript
3. Firebase - authentication with Github, firestore and hosting
4. Styling with CSS Modules
5. Zustand for global state
6. Vite and Vitest

## Features

1. Authentication - login and logout using Github account.
2. Responsive - app can be used on all screen size (BEST used on desktop size, more then 900px).
3. Search - user can search for other developers and invite them to collaborate on project, or request to join on other projects. User can search for projects and other users.
4. Tags - useful labels to show other users what is project about or what user can contribute to project. Tags are used as search filter (e.g type react and get list of projects/users with tag react).
5. Messages - every project has own simple messages state for communication.
6. Notifications - user gets useful notes for actions in projects (e.g. when is invited to project or someone leave project, admin marks task as complete...)
7. Project - create project. Label project using tags for other user to find it and collaborate. Split up work using tasks.
8. Project kanban board - for easier task manipulation use drag and drop interface.
9. Create task - set up title and description. Use deadline to mark timeline when task needs to be completed. Set priority. Task has multiple stages: backlog, assignment, development, test, complete and finished.

## Screenshots

### Profile

![Profile page.](/public/screenshot-profile.png 'This is a sample image.')

### Dashboard

![Project dashboard.](/public/screenshot-dashboard.png 'This is a sample image.')

### Dashboard mobile

![Project dashboard mobile.](/public/screenshot-dashboard-mobile.png 'This is a sample image.')

### New Task

![New task modal.](/public/screenshot-new-task.png 'This is a sample image.')

### Project Details Modal

![Project kanban board.](/public/screenshot-projects-details-admin.png 'This is a sample image.')

### Task Details

![Task details modal.](/public/screenshot-task-details.png 'This is a sample image.')

### Kanban Board

![Project kanban board.](/public/screenshot-kanban-board.png 'This is a sample image.')

### View Other Project Details

![Project details.](/public/screenshot-project-details.png 'This is a sample image.')

### Search for Project or Collaborators

![Search ui.](/public/screenshot-search.png 'This is a sample image.')
