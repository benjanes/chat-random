# Chat Random

## Description

This simple chat app utilizes Express and Socket.io on the backend and React/Redux and Socket.io on the frontend.

## To Run

First, install: `npm install`

The client side code is in the `/client` folder. To build the front-end: `npm run build`

This will build the client-side app into the `/build` folder, which is where the Express server servers static files from.

Now that you have the client built, you can serve up the app by running: `npm run start`. Development can be done while running `npm run dev`, but beware... the socket connections can be a little finicky with the development server.
