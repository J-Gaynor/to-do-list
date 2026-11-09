# To-Do List

A Kanban-style to-do list web application built with vanilla JavaScript, HTML, CSS, and Webpack.

## Features

- **Project Management:** Organize tasks into separate projects. Create new projects and switch between them using the dropdown menu.
- **Task Creation:** Add tasks with a title, description, due date, and priority level.
- **Status Columns:** View tasks across three status columns: "To Do", "In Progress", and "Complete".
- **Status Shifting:** Move tasks forward and backward between columns using left (`<`) and right (`>`) buttons.
- **Task Deletion:** Remove tasks using the delete (`X`) button.
- **Local Persistence:** Saves all projects and tasks in the browser's `localStorage` so data persists across page reloads.

## Tech Stack

- JavaScript (ES6 Modules)
- HTML5
- CSS3
- Webpack & Webpack Dev Server

## Getting Started

### Prerequisites

Node.js and npm installed on your machine.

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

