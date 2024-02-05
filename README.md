## CRUD Table

This project is a personal endeavor aimed at showcasing proficiency in React and web development skills. Built as a demonstration of individual capabilities rather than for a specific real-world objective, the website serves as a portfolio piece to exhibit expertise in frontend technologies.



## Overview

This project is built in ReactJS and uses CSS, ESLint, Prettier, Axios and React Query.


Functionalities:

A modal which shows up when the Create or Edit button is clicked.

Fields like email, phone number and website have a proper validation so that incorrect values are not accepted.

Used Google Places API to show address suggestions while user starts typing in the address field.

For the address user will have 2 options :

A simpler address form for where user can enter the details manually.

User can check the “Use Google Places” option, in which case 2 more fields will show up, Latitude and Longitude.

The autosuggestion from Google Places API will be activated when user starts to type in the Address bar.


Key Features:

Enhanced user experience by integrating Google Places API to provide location suggestions.

Demonstrated high proficiency in coding practices.

Developed mostly from scratch without relying on manyexternal libraries.

Showcased exceptional CSS skills by employing advanced styling techniques to create visually appealing design.

Utilizesd Axios for making HTTP requests and React Query for managing asynchronous data fetching, providing efficient and scalable data handling capabilities within the application.



## Getting Started

Clone the repository to your local machine.

Navigate to the project directory.

Install dependencies: "npm install".

Start the development server: "npm start".

Open your browser and navigate to [http://localhost:5173] to view the application.

You can find a live preview of the webpage online here : [https://crud-table-lalimadhi.netlify.app/].



## Project Structure

App.css: Contains the styles specific to the App component, ensuring consistent visual presentation throughout the application.

Assets: This directory houses static assets such as images utilized within the project.

api: Holds API-related functionality, such as fetching data from external sources, in this case JSONPlaceholder and pushing data to a server (just for showcasing purposes). Also, data manipulation functionalities are included using hooks in react.

App.js: Serves as the main entry point for the React application.

Components: Contains reusable UI components that encapsulate specific functionalities or visual elements used across multiple parts of the application.

index.css: Provides global styles for the project, used to add fonts to the project.

Containers: Houses container components responsible for managing state, data fetching and the main component for the table

index.js: Acts as the entry point for the React application, rendering the root component within the DOM and initializing the application's runtime environment.

