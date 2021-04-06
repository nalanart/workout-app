# About The Project
This workout app is modelled after a PPL program (Push, Pull, and Legs) and it allows users to follow along with some customizable options to suit their needs. It also records workouts so users can track their progression over time.

## Built With
- React/CSS
- Node/Express
- MongoDB
- jsonwebtoken

# Getting Started
To get a local copy up and running, follow these simple steps.

## Installation
1. Clone the repo
   ```
   git clone https://github.com/nalanart/workout-app.git
   ```
2. In the project directory, install NPM packages for backend
   ```
   npm install
   ```
3. Start the Express server
   ```
   npm run start
   ```
4. In another terminal, install NPM packages for frontend and start the React development server
   ```
   cd frontend
   npm install
   npm start
   ```

# Usage
Upon logging in, you will see what planned day it is for you, as well as the details of the last workout of the same type (push, pull, or legs), if you have one. If you're not feeling like the planned day, simply skip to the next.

![Recent workout](https://i.ibb.co/HgSN2rn/image.png)

Your workout will have predetermined exercises (main lifts) for the day as per the program. Exercises will have an up arrow, down arrow, or equals sign to represent the movement of weight based on its previous rep and set count. Accessories can be chosen, edited, and added by the user.
![Plan workout](https://i.ibb.co/Gxj2pcN/image.png)

![Edit exercise](https://i.ibb.co/sJbqpY7/image.png)

![Create exercise](https://i.ibb.co/HdVVQzL/image.png)

After creating their workout, the user can input their reps into a chart that is generated based on it.
![Input reps done during workout](https://i.ibb.co/PNYF4VF/image.png)

All workouts are saved and sorted by type so the user can track their progress.
![Workout history](https://i.ibb.co/nzTLCXY/image.png)

# Acknowledgements
- joi
