import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Appbar from './components/Appbar/Appbar';
import Contacts from './views/Contacts/Contacts';
import HomeView from './views/HomeView/HomeView';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import authOperations from './redux/auth/auth-operations';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Appbar />
      <Switch>
        <PublicRoute exact path="/">
          <HomeView />
        </PublicRoute>
        <PublicRoute path="/signup" restricted redirectTo="/phonebook">
          <Signup />
        </PublicRoute>
        <PublicRoute path="/login" restricted redirectTo="/phonebook">
          <Login />
        </PublicRoute>
        <PrivateRoute path="/phonebook" redirectTo="/login">
          <Contacts />
        </PrivateRoute>
      </Switch>
    </>
  );
}
