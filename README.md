# full-stack-interview
This is the results of my full-stack-interview test. The instructions to setup and run this project can be seen directly below. The instructions pertaining to the full-stack-interview test can be found after that.


## Setup

### Install dependencies:

`npm install`

 add `.env` file with the following in the root directory : `MONGODB_PASSWORD=1cuUE6OArJK8FQ9C`
 **Note:** I've temporarily setup a MongoDB database that will allow access for one week
 
### Run:

`npm run start`

App: `localhost:3000`
API `localhost:3001`

### Test Hints

1. Use 'Add Robot' button to Add robots
2. Robot can be edited in the table at all times
3. select two robots to make the Battle! button appear



---
## full-stack-interview Description

Time limit: 4 hours

You are creating an application for managing your robot collection.<br/><br/>
This project is intended to provide you with an easy starting point to demonstrate your skills.<br/>
A bare [Create React App](https://github.com/facebook/create-react-app) project is provided as well as a basic [express](https://expressjs.com/) API.<br/>
The project supports hot reloading.

## Setup

### Install dependencies:

`npm install`

### Run:

`npm run start`

App: `localhost:3000`
API `localhost:3001`

## Requirements:

- Your project must include detailed instructions on any necessary setup and it must be runnable.
- Data created by user interactions must be "persisted" in some way by the API such that the front-end app can retrieve it.
- There are no specific design or style requirements for the UI other than it must be functional.

### App

- View all robots
- View details of a single robot
- A way for a user to create a robot
- A way to delete a specific robot
- A way for robots to fight
- A way to view past battle results

### API

- Create robots, which have the following properties
  - Name
  - Color
  - Attack
  - Defense
- Get a robot
- Modify the color, attack and defense of a robot
- Delete a robot
- Store battle results

### Extra Credit

You are encouraged to have fun with the project. Feel free to add anything you like to the app.<br/>
A few ideas:<br/>

- Provide a working database solution for the project
- Style the app
- Add new capabilities to your robots (more types of attacks, super moves, healing, etc.)
- Support multiple users of the application
