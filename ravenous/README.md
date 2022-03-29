# Ravenous  
## A React app used to search for restaurants through the use of the Yelp API.  This is a multi part project as a part of the "Create a Front-End App with React Skill Path" course.
### Project parts
  - [x] Part One: Beginning the project.  Use create-react-app to create a new project and start creating basic components without any props or state
  - [x] Part Two: Use props to pass information from parent components to child components
  - [x] Part Three: Begin to implement stateful logic to the search bar component preparing to use the Yelp API to display results
  - [x] Part Four: Query Yelp API using the components to display results on the home page 

## HOW TO RUN:
1. Clone this repository to your local machine
2. cd into the directory and run `npm install`
3. Add a yelp API key
   1. If you don't already have an account for the yelp API, make one [here](https://www.yelp.com/login?return_url=%2Fdevelopers%2Fv3%2Fmanage_app) and create a new project
   2. In the root directory of this project create a .env.local file and in it add REACT_APP_API_KEY = '<your api key>'
4. Request temporary CORS anywhere access from [here](https://cors-anywhere.herokuapp.com/corsdemo)
5. In your terminal run `npm start`.  This should run the dev server and you will now have a working app!  The api calls are very slow due to having to go through the CORS anywhere app, unfortunately.