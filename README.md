# FinalProject-GardenHero

<div style="text-align: center;">
  <img src='frontend/src/images/GardenHeroLogo.png' style='width:35%' alt="GardenHero Logo">
</div>
<br/>

### Link to the app : https://garden-hero.vercel.app/

# Tech Stack

This CRUD app uses:

- React
- NodeJS
- Express
- MongoDB
- ESLint
- Auth0
- Axios
- MUI
- Styled-Components
- JavaScript

# Features

- Predictive Search Bar
- Auth0 Authentication (middleware)
- RESTful Api
- Personal Garden Planner
- Weather & Calendar widgets

# Future improvements and optimizations

- Create swagger api documentation
- Email Notifications
- Filter garden by date
- ... more to come!

# Setup

### The Frontend

1. Open a terminal in VS Code
2. Type `cd frontend`
3. Type `yarn install`

Use `yarn dev:frontend` to start the frontend dev environment.

### The Backend

1. Open _another_ terminal in VS Code
2. Type `cd backend`
3. Type `yarn install`

Use `yarn dev:backend` to start the backend dev environment.

---

## The App

### Homepage:

The landing page. Users can search available crops and also log into the app to get access to the planner page.

  <img src='frontend/src/images/Homepage.png' style='width:100%' alt="Homepage">

### CropDetails:

CropDetails shows a more detail view of the selected crop.

  <img src='frontend/src/images/CropDetails.png' style='width:100%' alt="CropDetails">

### Login:

The login page. Handled by Auth0.

<img src='frontend/src/images/Login.png' style='width:100%' alt="Login page">

### Planner:

The main application that allows you to add crops to your garden. It displays the day you planted and harvest date for each crop you add.

  <img src='frontend/src/images/Planner.png' style='width:100%' alt="Planner">
