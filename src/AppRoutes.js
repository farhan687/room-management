import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import RoomList from './room-list/RoomList';

const AppRoutes = props => (
  <div>
    <AppLayout {...props}>
      <Switch>
        <Route path="/:date" component={RoomList} />
        <Redirect path="*" to="/today" />
      </Switch>
    </AppLayout>
  </div>
);


export default AppRoutes;
