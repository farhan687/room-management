## Room Booking project
I have used `React` framework for this project and it is bootstrapped with `create-react-app`.

### Dependencies
- `redux`: For state management
- `react-router`: For front-end routing
- `material-ui-next`
- `moment`: To work with `date` and `time` related function
- `react-slick`: For image slider

## Project structure

- src
  - index.js: Entry point of app
  - App.js: App component which initiates Redux and react-router
  - AppRoutes.js: It contains AppRoutes information
  - config.js: Which stores API urls
  - actions
    - roomActions: Action to fetch data, and update other states
    - actionTypes: Types of actions
  - components:
    - AppLayout: Which is parent component of internal routes
    - Carousel: Which is used to implement image slider
    - DateFilter: To navigate between dates
    - Error: Error component can be used to display error
    - TimeBar: Which display available time on room
  - helpers:
    - deviceHelper: Which provides height of window and check whether it is mobile device
    - historyHelper: History API, which can be used to change front-end routes.
  - reducers
    - roomReducers: Reducer to update state
    - index.js: Which combines reducers.
  - room-list
    - RoomList.js: It is main container component, which contains list of rooms and also room description as nested route
    - RoomSummary: Item of Room list
    - RoomDescription: Which displays all the detail about room.
  - store
    - configureStore: Apply Middleware thunk and dev tools for development.
    - initialState: Initial state of app.

### Install Dependencies
```
npm install
```

### Start React app
```
npm start
```
It will open browser tab automatically on port `3000`


